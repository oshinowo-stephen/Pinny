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

export const PINNY_TOKEN = process.env.TOKEN ?? 'INVALID_TOKEN'
export const PINNY_DB_URL = process.env.CONN_STRING ?? 'INVALID_CONN_STRING'

export const pinVip = createGeneric<Pinny>(vip)
export const pinOwner = createGeneric<Pinny>(owner)
export const pinAdmin = createGeneric<Pinny>(admin)
