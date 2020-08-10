import { SQLManager } from 'eris-boiler'

import { join } from 'path'
import './utils/envLoader'

import {
  PINNY_TOKEN,
  SQLMOpts,
  Pinny,
} from './modules/pinny'
import { error } from 'eris-boiler/util/logger'

const client = new Pinny(PINNY_TOKEN, {
  oratorOptions: {
    defaultPrefix: '~',
  },
  statusManagerOptions: {
    defaultStatus: {
      type: 0,
      name: 'with pushpins...',
    },
  },
  databaseManager: new SQLManager(SQLMOpts),
})

client
  .addEvents(join(__dirname, 'events'))
  .addSettingCommands(join(__dirname, 'settings'))
  .connect().catch((err) => error(err))
