if (process.env.NODE_ENV === 'production') {
  require('docker-secret-env').load()
} else {
  require('dotenv').config()
}

const baseConfig = {
  client: proecess.env.DB_CLIENT ?? 'INVALID_CLIENT',
  connection: {
    host: DB_HOST,
    database: DB_NAME
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
  },
}

module.exports = {
  production: {
    ...baseConfig,
    connection: {
      ...baseConfig.connection,
      user: ADMIN_DB_USER,
      password: ADMIN_DB_PASS
    },
  },
  development: {
    ...baseConfig,
    connection: {
      ...baseConfig.connection,
      user: DB_USER,
      password: DB_PASS
    },
  },
}
