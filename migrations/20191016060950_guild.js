
exports.up = (knex) => {
  return knex.schema.createTable('guild', (t) => {
    t.string('id').primary().notNull()
    t.string('prefix').defaultTo(null)
    t.string('vip').defaultTo(null)
    t.string('pinRole')
    t.integer('emoteThresh')
      .notNull()
      .defaultTo(3)
    t.string('pinMoji')
      .defaultTo('📌')
      .notNull()
    t.string('pinLog')
      .defaultTo(null)
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('guild')
}
