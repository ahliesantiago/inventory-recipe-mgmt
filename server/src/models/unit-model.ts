import db from '../db'
import { IDatabase, ITask } from 'pg-promise'
import { buildInsert } from '../utils/query-builder'
import { UnitInputType } from '../types/item-types'

type DbOrTx = IDatabase<{}, any> | ITask<{}>

export async function findUnitByName(unitName: string, tOrDb: DbOrTx = db) {
  return tOrDb.oneOrNone(`
    SELECT * FROM units
      WHERE LOWER(unit_name) = LOWER($1)
      OR LOWER(unit_plural_name) = LOWER($1)
      OR LOWER(unit_acronym) = LOWER($1)
      OR LOWER(unit_plural_acronym) = LOWER($1)
  `, [unitName])
}

export async function storeUnit(unitDetails: UnitInputType, tOrDb: DbOrTx = db) {
  const { sql, values } = buildInsert(
    'units', unitDetails, { onConflict: { columns: 'unit_name', action: 'NOTHING' } }
  )

  return await tOrDb.oneOrNone(sql, values)
}
