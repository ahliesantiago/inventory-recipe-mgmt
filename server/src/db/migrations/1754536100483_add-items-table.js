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
  pgm.createTable('items', {
    id: 'id', // shorthand for id: { type: 'bigserial', primaryKey: true }
    item_name: { type: 'text', notNull: true, unique: true },
    plural_name: { type: 'text', notNull: false },
    is_ingredient: { type: 'boolean', notNull: true },
    is_food_equipment: { type: 'boolean', notNull: false },
    created_at: { type: 'timestamp', default: pgm.func('now()') },
    updated_at: { type: 'timestamp', default: pgm.func('now()') },
  })

  pgm.createTable('units', {
    id: 'id',
    unit_name: { type: 'text', notNull: true, unique: true },
    unit_plural_name: { type: 'text', notNull: false, unique: true },
    unit_acronym: { type: 'varchar(12)', notNull: false, unique: true },
    unit_plural_acronym: { type: 'varchar(12)', notNull: false, unique: true },
    created_at: { type: 'timestamp', default: pgm.func('now()') },
    updated_at: { type: 'timestamp', default: pgm.func('now()') },
  })

  pgm.createTable('item_types', {
    id: 'id',
    type_name: { type: 'text', notNull: true, unique: true },
    created_at: { type: 'timestamp', default: pgm.func('now()') },
    updated_at: { type: 'timestamp', default: pgm.func('now()') },
  })
}

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('items')
  pgm.dropTable('units')
  pgm.dropTable('item_types')
}
