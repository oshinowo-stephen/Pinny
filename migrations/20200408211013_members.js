
exports.up = (knex) => {
  return knex.schema.createTable('members', (table) => {
    table.string('id').primary().notNull()
    table.boolean('canPin').defaultTo(true)
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('members')
}
