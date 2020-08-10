import {
  vip,
  owner,
  admin,
  createGeneric,
} from 'eris-boiler/permissions'

import { DataClient } from 'eris-boiler'

import {
  PinSettings,
  PinManager,
  PinUtils,
} from './managers'

export class Pinny extends DataClient {

  public readonly pinUtils = new PinUtils(this)
  public readonly pinManager = new PinManager(this)
  public readonly pinSettings = new PinSettings(this)

}

const connectionInfo = {
  host: process.env.DB_HOST ?? '127.0.0.1',
  database: process.env.DB_NAME ?? 'INVALID_DB_NAME',
  user: (
    process.env.DB_USER ?? process.env.ADMIN_DB_USER
  ) ?? 'INVALID_DB_USER',
  password: (
    process.env.DB_PASS ?? process.env.ADMIN_DB_PASS
  ) ?? 'INVALID_DB_PASS',
}

export const SQLMOpts = {
  connectionInfo,
  client: process.env.DB_CLIENT ?? 'pg',
}

export const PINNY_TOKEN = process.env.PINNY_TOKEN ?? 'INVALID_TOKEN'
export const PINNY_DB_URL = process.env.CONN_STRING ?? 'INVALID_CONN_STRING'

export const pinVip = createGeneric<Pinny>(vip)
export const pinOwner = createGeneric<Pinny>(owner)
export const pinAdmin = createGeneric<Pinny>(admin)
