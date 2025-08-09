import { IDatabase } from 'pg-promise'

const categories = [
  'Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert',
  'Meals', 'Sides', 'Beverages', 'Appetizers', 'Soups', 'Salads'
]

export async function up(db: IDatabase<unknown>) {
  const queries = categories.map(category =>
    db.none(
      `INSERT INTO categories (category_name)
        VALUES ($1)
        ON CONFLICT (category_name) DO NOTHING`,
      [category]
    )
  )

  await Promise.all(queries)
}

export async function down(db: IDatabase<unknown>) {
  await db.none(
    `DELETE FROM categories WHERE category_name IN ($1:list)`,
    [categories]
  )
}
