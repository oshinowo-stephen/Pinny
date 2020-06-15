
exports.up = (knex) => {
  return knex.schema.createTable('pins', (table) => {
    table.string('id')
      .primary()
      .notNull()
    table.string('pinnedIn')
      .notNull()
    table.bigInteger('pinnedAt')
      .notNull()
  })
}

exports.down = (knex) => knex.schema.dropTable('pins')
