import { SQLManager } from 'eris-boiler'

import { join } from 'path'
import './utils/envLoader'

import Pinny, { PINNY_TOKEN, PINNY_DB_URL } from './modules/pinny'
import { error } from 'eris-boiler/util/logger'

console.log(PINNY_TOKEN)

const client = new Pinny(PINNY_TOKEN, {
  oratorOptions: {
    defaultPrefix: 'p!'
  },
  statusManagerOptions: {
    defaultStatus: {
      type: 0,
      name: 'with pushpins...'
    }
  },
  databaseManager: new SQLManager({
    client: 'postgres',
    connectionInfo: PINNY_DB_URL
  })
})

client
  .addCommands(join(__dirname, 'commands'))
  .addEvents(join(__dirname, 'events'))
  .addSettingCommands(join(__dirname, 'settings'))
  .addPermissions(join(__dirname, 'permissions'))
  .connect().catch((err) => error(err))
