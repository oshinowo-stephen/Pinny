import {
  vip,
  owner,
  admin,
  createGeneric
} from 'eris-boiler/permissions'

import { DataClient } from 'eris-boiler'

import { PinManager } from './pinManager'
import PinUtilityManager from './pinUtilities'
import PinSettingManager from './pinSettingsManager'

export default class Pinny extends DataClient {
  public readonly pinManager = new PinManager(this)
  public readonly pinUtility = new PinUtilityManager(this)
  public readonly pinSettings = new PinSettingManager(this)
}

console.log('DB USER: ', process.env.DB_USER)
console.log('DB PASS: ', process.env.DB_PASS)
console.log('ADMIN DB USER: ', process.env.ADMIN_DB_USER)
console.log('ADMIN DB PASS: ', process.env.ADMIN_DB_PASS)

const connectionInfo = {
  host: process.env.DB_HOST ?? '127.0.0.1',
  user: (process.env.DB_USER ?? process.env.ADMIN_DB_USER) ?? 'INVALID_DB_USER',
  password: (process.env.DB_PASS ?? process.env.ADMIN_DB_PASS) ?? 'INVALID_DB_PASS',
  database: process.env.DB_NAME ?? 'INVALID_DB_NAME'
}

console.log(connectionInfo)

export const SQLMOpts = {
  client: process.env.DB_CLIENT ?? 'pg',
  connectionInfo
}

export const PINNY_TOKEN = process.env.PINNY_TOKEN ?? 'INVALID_TOKEN'
export const PINNY_DB_URL = process.env.CONN_STRING ?? 'INVALID_CONN_STRING'

export const pinVip = createGeneric<Pinny>(vip)
export const pinOwner = createGeneric<Pinny>(owner)
export const pinAdmin = createGeneric<Pinny>(admin)

interface PinAction<T> {
  succeeded: boolean
  message: T | string | undefined
}

export type PinResult<T> = Promise<PinAction<T>>

export interface PinnedMessage {
  message: string
  pinnedIn: string
  pinnedAt: number
}

export interface LogData {
  actionedIn: string
  actionedAt: number
  message: string
  action: string
  reason: string
}
