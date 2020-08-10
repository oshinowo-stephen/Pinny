
exports.up = (knex) => knex.schema.createTable('pins', (t) => {
  t.string('id').primary().notNull()
  t.integer('createdAt').notNull()
  t.string('content').notNull()
  t.string('channel').notNull()
})

exports.down = (knex) => knex.schema.dropTable('pins')
