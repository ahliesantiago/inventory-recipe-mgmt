/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable('recipes', {
    id: 'id',
    recipe_name: { type: 'text', notNull: true },
    description: { type: 'text', notNull: false },
    image: { type: 'text', notNull: false },
    source: { type: 'text', notNull: false },
    steps: { type: 'text[]', notNull: false },
    prep_time: { type: 'time', notNull: false },
    cook_time: { type: 'time', notNull: false },
    user_rating: { type: 'numeric(5,2)', notNull: false, default: 0 },
    created_at: { type: 'timestamp', notNull: true, default: pgm.func('now()') },
    updated_at: { type: 'timestamp', notNull: true, default: pgm.func('now()') },
  })

  pgm.createTable('recipe_categories', {
    recipe_id: {
      type: 'bigint',
      references: 'recipes(id)',
      onDelete: 'cascade',
    },
    category_id: {
      type: 'bigint',
      references: 'categories(id)',
      onDelete: 'cascade',
    },
    created_at: { type: 'timestamp', default: pgm.func('now()') },
    updated_at: { type: 'timestamp', default: pgm.func('now()') },
  })

  pgm.addConstraint('recipe_categories', 'pk_recipe_categories', {
    primaryKey: ['recipe_id', 'category_id'],
  })

  pgm.createTable('recipe_ingredients', {
    recipe_id: {
      type: 'bigint',
      notNull: true,
      references: 'recipes(id)',
      onDelete: 'cascade',
    },
    item_id: {
      type: 'bigint',
      notNull: true,
      references: 'items(id)',
      onDelete: 'restrict',
    },
    quantity: { type: 'numeric(10,2)', notNull: true },
    unit_id: {
      type: 'bigint',
      notNull: true,
      references: 'units(id)',
    },
    created_at: { type: 'timestamp', default: pgm.func('now()') },
    updated_at: { type: 'timestamp', default: pgm.func('now()') },
  })

  pgm.addConstraint('recipe_ingredients', 'pk_recipe_ingredients', {
    primaryKey: ['recipe_id', 'item_id'],
  })
}

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('recipes')
  pgm.dropTable('recipe_categories')
  pgm.dropTable('recipe_ingredients')
}
