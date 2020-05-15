import { Channel } from 'eris'

import Pinny, { LogData } from './pinny'

export default class PinUtilityManager {
  client: Pinny

  constructor (client: Pinny) {
    this.client = client
  }

  getGuildEmote (guild: string, emote: string): string | undefined {
    if (this.client.guilds.get(guild) !== undefined) {
      const g = this.client.guilds.get(guild)

      const emoji = emote.match(/<:[a-z]+:([0-9]+)>/)

      if (emoji !== null && g !== undefined) {
        return g.emojis.some((e) => e.id === emoji[1])
          ? emote
          : undefined
      }
    }

    return undefined
  }

  async sendToLog (guild: string, log: LogData): Promise<void> {
  }

  async pinError (channel: Channel, message: string): Promise<void> {

  }
}
