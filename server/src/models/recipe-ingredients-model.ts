import db from '../db'
import { IDatabase, ITask } from 'pg-promise'
import { buildInsert } from '../utils/query-builder'
import { RecipeIngredientsInputType } from '../types/recipe-types'

type DbOrTx = IDatabase<{}, any> | ITask<{}>

export async function storeRecipeIngredients(details: RecipeIngredientsInputType, tOrDb: DbOrTx = db) {
  const { sql, values } = buildInsert('recipe_ingredients', details)

  return await tOrDb.oneOrNone(sql, values)
}
