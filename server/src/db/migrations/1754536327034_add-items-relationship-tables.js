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
  pgm.createTable('item_units', {
    item_id: {
      type: 'bigint',
      references: '"items"',
      onDelete: 'cascade',
    },
    unit_id: {
      type: 'bigint',
      references: '"units"',
      onDelete: 'cascade',
    },
    created_at: { type: 'timestamp', default: pgm.func('now()') },
    updated_at: { type: 'timestamp', default: pgm.func('now()') },
  })

  pgm.addConstraint('item_units', 'pk_item_units', {
    primaryKey: ['item_id', 'unit_id'],
  })

  pgm.createTable('item_type_types', {
    item_id: {
      type: 'bigint',
      references: '"items"',
      onDelete: 'cascade',
    },
    type_id: {
      type: 'bigint',
      references: '"item_types"',
      onDelete: 'cascade',
    },
    created_at: { type: 'timestamp', default: pgm.func('now()') },
    updated_at: { type: 'timestamp', default: pgm.func('now()') },
  })

  pgm.addConstraint('item_type_types', 'pk_item_type_types', {
    primaryKey: ['item_id', 'type_id'],
  })
}

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('item_units')
  pgm.dropTable('item_type_types')
}
