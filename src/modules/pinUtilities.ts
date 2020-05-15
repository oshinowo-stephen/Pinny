import { Channel } from 'eris'

import Pinny, { LogData } from './pinny'

export default class PinUtilityManager {
  client: Pinny

  constructor (client: Pinny) {
    this.client = client
  }

  async sendToLog (guild: string, log: LogData): Promise<void> {
  }

  async pinError (channel: string, message: string): Promise<void> {

  }
}
