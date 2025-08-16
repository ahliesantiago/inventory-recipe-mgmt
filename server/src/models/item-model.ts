import db from '../db'
import { IDatabase, ITask } from 'pg-promise'
import { buildInsert } from '../utils/query-builder'
import type { ItemInputType } from '../types/item-types'

type DbOrTx = IDatabase<{}, any> | ITask<{}>

export async function getItemById(id: string) {
  const item = await db.oneOrNone(`
    SELECT * FROM items WHERE id = $1
  `, [id])

  return item
}

export async function findItemByName(name: string) {
  const item = await db.oneOrNone(`
    SELECT * FROM items
      WHERE LOWER(item_name) = LOWER($1)
      OR LOWER(plural_name) = LOWER($1)
  `, [name])

  return item
}

export async function getAllItems() {
  return await db.any(`
    SELECT * FROM items ORDER BY item_name
  `)
}

export async function getAllIngredients() {
  return await db.any(`
    SELECT * FROM items WHERE is_ingredient = true ORDER BY item_name
  `)
}

export async function storeItem(details: ItemInputType, tOrDb: DbOrTx = db) {
  const exists = await findItemByName(details.item_name)

  if (exists) return exists

  const { sql, values } = buildInsert(
    'items', details, {
      onConflict: { columns: 'item_name', action: 'NOTHING' },
      returning: 'id, item_name'
    }
  )

  return await tOrDb.oneOrNone(sql, values)
}
