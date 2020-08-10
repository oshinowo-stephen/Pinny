
exports.up = (knex) => knex.schema.createTable('guild', (t) => {
  t.string('id').primary().notNull()
  t.string('prefix').defaultTo(null)
  t.string('vip').defaultTo(null)
  t.integer('thresh')
    .notNull()
    .defaultTo(3)
  t.string('emoji')
    .defaultTo('📌')
    .notNull()
  t.string('log')
    .defaultTo(null)
  t.boolean('listen')
    .defaultTo(true)
})

exports.down = (knex) => knex.schema.dropTable('guild')
