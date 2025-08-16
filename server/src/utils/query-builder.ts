interface InsertOptions {
  onConflict? :{
    columns: string
    action: string
  }
  returning?: string
}

export function buildInsert(
  table: string,
  data: Record<string, any>,
  options: InsertOptions = {}
) {
  const fields = Object.keys(data)
  const values = Object.values(data)

  const placeholders = fields.map((_, i) => `$${i + 1}`).join(', ')
  const columns = fields.join(', ')

  let sql = `
    INSERT INTO ${table} (${columns}, created_at, updated_at)
    VALUES (${placeholders}, NOW(), NOW())
  `

  if (options.onConflict?.columns) {
    const cols = options.onConflict.columns
    const action = options.onConflict.action
    sql += `ON CONFLICT (${cols}) DO ${action}`
  }

  sql += ` RETURNING ${options.returning ?? '*'}`

  return { sql, values }
}
