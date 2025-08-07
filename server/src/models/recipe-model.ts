import db from '../db'
import type { Recipe } from '../types/recipe-types'

export async function getAllRecipes() {
  return await db.any('SELECT * FROM recipes ORDER BY created_at DESC')
}

export async function getRecipeById(id: string) {
  return await db.oneOrNone('SELECT * FROM recipes WHERE id = $1', [id])
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
