import { IDatabase } from 'pg-promise'

export async function up(db: IDatabase<unknown>) {
  const items = [
    { item_name: 'Egg', plural_name: 'Eggs', is_ingredient: true },
    { item_name: 'Carrot', plural_name: 'Carrots', is_ingredient: true },
    { item_name: 'Milk', plural_name: 'Milk', is_ingredient: true },
    { item_name: 'Bread', plural_name: 'Bread', is_ingredient: true },
    { item_name: 'Broccoli', plural_name: 'Broccoli', is_ingredient: true },
    { item_name: 'Chicken', plural_name: 'Chickens', is_ingredient: true },
    { item_name: 'Pasta', plural_name: 'Pasta', is_ingredient: true },
  ]

  const cs = new db.$config.pgp.helpers.ColumnSet(
    ['item_name', 'plural_name', 'is_ingredient'],
    { table: 'items' }
  )

  const insert = db.$config.pgp.helpers.insert(items, cs) +
    ' ON CONFLICT (item_name) DO NOTHING'

  await db.none(insert)
}

export async function down(db: IDatabase<unknown>) {
  await db.none(
    `DELETE FROM items WHERE item_name IN ($1:list)`,
    [['Egg', 'Carrot', 'Milk', 'Bread', 'Broccoli', 'Chicken', 'Pasta']]
  )
}
