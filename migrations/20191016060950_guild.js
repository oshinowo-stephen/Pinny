
exports.up = (knex) => {
  return knex.schema.createTable('guild', (t) => {
    t.string('id').primary().notNull()
    t.string('prefix').defaultTo(null)
    t.string('vip').defaultTo(null)
    t.string('pinRole')
    t.integer('thresh')
      .notNull()
      .defaultTo(3)
    t.string('pin_emoji')
      .defaultTo('📌')
      .notNull()
    t.string('pin_log')
      .defaultTo(null)
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('guild')
}
