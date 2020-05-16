import { Guild, TextChannel } from 'eris'
import moment from 'moment'

import Pinny, { LogData } from './pinny'
import { isEmpty } from '../utils/extras'

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

  async sendToLog (guild: Guild, data: LogData): Promise<void> {
    const {
      succeeded,
      message
    } = await this.client.pinSettings.getSetting(guild.id, 'pin_log')

    if (succeeded && message !== undefined) {
      const pinLog = guild.channels.get(message)

      if (pinLog instanceof TextChannel) {
        await pinLog.createMessage({
          embed: {
            title: '📜 Pinny Logs 📜',
            fields: [
              {
                name: '🎬 Pin Action',
                value: data.action
              },
              {
                name: '⌚ Action At',
                value: moment(data.actionedAt)
                  .format('MMMM Do YYYY, h:mm:ss a')
              },
              {
                name: '❓ Action In',
                value: data.actionedIn
              },
              {
                name: '✉️ Pin Message',
                value: data.message
              }
            ],
            description: isEmpty(data.reason)
              ? 'No reason provided'
              : data.reason
          }
        })
      }
    } else {
      throw new Error('Issue reporting to Pin Log!')
    }
  }
}
