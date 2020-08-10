if (process.env.NODE_ENV === 'production') {
  require('docker-secret-env').load()
} else {
  require('dotenv').config()
}

const {
  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PASS,
  DB_CLIENT,
  ADMIN_DB_PASS,
  ADMIN_DB_USER,
} = process.env

const baseConfig = {
  client: DB_CLIENT ?? 'INVALID_CLIENT',
  connection: {
    host: DB_HOST ?? 'localhost',
    database: DB_NAME ?? 'INVALID_DB_NAME'
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
      user: ADMIN_DB_USER ?? 'INVALID_USER',
      password: ADMIN_DB_PASS ?? 'INVALID_PASS'
    },
  },
  development: {
    ...baseConfig,
    connection: {
      ...baseConfig.connection,
      user: DB_USER ?? 'INVALID_USER',
      password: DB_PASS ?? 'INVALID_PASS'
    },
  },
}
