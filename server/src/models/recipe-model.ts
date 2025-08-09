import db from '../db'
import type { Recipe } from '../types/recipe-types'

function timeStringToMinutes(timeStr: string): number {
  const [hours, minutes, seconds] = timeStr.split(':').map(Number)
  return hours * 60 + minutes + Math.floor(seconds / 60)
}

function getTotalTime(prepTime: string, cookTime: string): number {
  return timeStringToMinutes(prepTime) + timeStringToMinutes(cookTime)
}

export async function getAllRecipes() {
  const recipes = await db.any(`
    SELECT
        r.*,
        COALESCE(cats.categories, '[]'::json) AS categories,
        COALESCE(ings.ingredients, '[]'::json) AS ingredients
    FROM recipes r
    LEFT JOIN (
        SELECT
            rc.recipe_id,
            json_agg(c.category_name ORDER BY c.category_name) AS categories
        FROM recipe_categories rc
        JOIN categories c ON rc.category_id = c.id
        GROUP BY rc.recipe_id
    ) cats ON cats.recipe_id = r.id
    LEFT JOIN (
        SELECT
            ri.recipe_id,
            json_agg(
                json_build_object(
                    'ingredient', itm.item_name,
                    'unit', unt.unit_name,
                    'unit_plural', unt.unit_plural_name,
                    'unit_acronym', unt.unit_acronym,
                    'unit_plural_acronym', unt.unit_plural_acronym,
                    'qty', ri.quantity
                )
                ORDER BY itm.item_name
            ) AS ingredients
        FROM recipe_ingredients ri
        JOIN items itm ON ri.item_id = itm.id
        JOIN units unt ON ri.unit_id = unt.id
        GROUP BY ri.recipe_id
    ) ings ON ings.recipe_id = r.id
    ORDER BY r.created_at DESC;
  `)

  return recipes.map((recipe) => ({
    ...recipe,
    prep_time: timeStringToMinutes(recipe.prep_time),
    cook_time: timeStringToMinutes(recipe.cook_time),
    total_time: getTotalTime(recipe.prep_time, recipe.cook_time),
  }))
}

export async function getRecipeById(id: string) {
  const recipe = await db.oneOrNone(`
    SELECT
        r.*,
        COALESCE(cats.categories, '[]'::json) AS categories,
        COALESCE(ings.ingredients, '[]'::json) AS ingredients
    FROM recipes r
    LEFT JOIN (
        SELECT
            rc.recipe_id,
            json_agg(c.category_name ORDER BY c.category_name) AS categories
        FROM recipe_categories rc
        JOIN categories c ON rc.category_id = c.id
        GROUP BY rc.recipe_id
    ) cats ON cats.recipe_id = r.id
    LEFT JOIN (
        SELECT
            ri.recipe_id,
            json_agg(
                json_build_object(
                    'ingredient', itm.item_name,
                    'unit', unt.unit_name,
                    'unit_plural', unt.unit_plural_name,
                    'unit_acronym', unt.unit_acronym,
                    'unit_plural_acronym', unt.unit_plural_acronym,
                    'qty', ri.quantity
                )
                ORDER BY itm.item_name
            ) AS ingredients
        FROM recipe_ingredients ri
        JOIN items itm ON ri.item_id = itm.id
        JOIN units unt ON ri.unit_id = unt.id
        GROUP BY ri.recipe_id
    ) ings ON ings.recipe_id = r.id
    WHERE r.id = 1;
  `, [id])

  if (!recipe) return null

  return {
    ...recipe,
    prep_time: timeStringToMinutes(recipe.prep_time),
    cook_time: timeStringToMinutes(recipe.cook_time),
    total_time: recipe.prep_time + recipe.cook_time,
  }
}

export async function createRecipe(details: Recipe) {
  const { recipe_name, description, image, source, steps, prep_time, cook_time, user_rating, created_at, updated_at } = details
  return await db.one(
    `INSERT INTO recipes(
      recipe_name, description, image, source, steps, prep_time, cook_time, user_rating, created_at, updated_at
    ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id, recipe_name, created_at`,
    [recipe_name, description, image, source, steps, prep_time, cook_time, user_rating, created_at, updated_at]
  )
}

export async function getRecipeCategories(recipeId: string) {
  return await db.any(
    `SELECT c.id, c.name FROM categories c
      JOIN recipe_categories rc ON c.id = rc.category_id
      WHERE rc.recipe_id = $1`,
    [recipeId]
  )
}
