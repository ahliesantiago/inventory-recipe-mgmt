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
      COALESCE(
        json_agg(c.category_name)
        FILTER (WHERE c.id IS NOT NULL), '[]'::json
      ) AS categories
    FROM recipes r
    LEFT JOIN recipe_categories rc ON r.id = rc.recipe_id
    LEFT JOIN categories c ON rc.category_id = c.id
    GROUP BY r.id
    ORDER BY r.created_at DESC;
  `)

  return recipes.map((recipe) => ({
    ...recipe,
    total_time: getTotalTime(recipe.prep_time, recipe.cook_time),
  }))
}

export async function getRecipeById(id: string) {
  const recipe = await db.oneOrNone(`
    SELECT
      r.*,
      COALESCE(
        json_agg(c.category_name)
        FILTER (WHERE c.id IS NOT NULL), '[]'::json
      ) AS categories
    FROM recipes r
    LEFT JOIN recipe_categories rc ON r.id = rc.recipe_id
    LEFT JOIN categories c ON rc.category_id = c.id
    WHERE r.id = $1
    GROUP BY r.id
  `, [id])

  if (!recipe) return null

  return {
    ...recipe,
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
