import {
  vip,
  owner,
  admin,
  createGeneric
} from 'eris-boiler/permissions'

import { DataClient } from 'eris-boiler'

import PinManager from './pinManager'

export default class Pinny extends DataClient {
  public readonly pinManager = new PinManager(this)
}

const connectionInfo = {
  user: process.env.DB_USER ?? 'INVALID_DB_USER',
  host: process.env.DB_HOST ?? '127.0.0.1',
  password: process.env.DB_PASS ?? 'INVALID_DB_PASS',
  database: process.env.DB_NAME ?? 'INVALID_DB_NAME'
}

export const SQLMOpts = {
  client: process.env.DB_CLIENT ?? 'pg',
  connectionInfo
}

export const PINNY_TOKEN = process.env.TOKEN ?? 'INVALID_TOKEN'
export const PINNY_DB_URL = process.env.CONN_STRING ?? 'INVALID_CONN_STRING'

export const pinVip = createGeneric<Pinny>(vip)
export const pinOwner = createGeneric<Pinny>(owner)
export const pinAdmin = createGeneric<Pinny>(admin)
