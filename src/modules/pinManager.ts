import { DatabaseManager } from 'eris-boiler'
import { GuildTextableChannel, Message } from 'eris'

import Pinny from './pinny'
import { errorReport } from '../utils/extras'

export interface PinnedMessage {
  message: boolean
  pinnedIn: string
  pinnedAt: number
}

export default class PinManager {
  dbm: DatabaseManager
  bot: Pinny

  constructor (bot: Pinny) {
    this.bot = bot
    this.dbm = bot.dbm
  }

  private async sendToLog (guild: string, message: Message, action: string): Promise<void> {
    const pinLog = await this.getPinSetting(guild, 'pin_log')

    if (pinLog !== undefined && pinLog !== null) {
      try {
        const g = this.bot.guilds.get(guild)

        if (g !== undefined) {
          const plog = g.channels.get(pinLog)

          if (plog !== undefined && plog.type === 0) {
            await plog.createMessage({
              embed: {
                title: '📌📃 Pin Log',
                fields: [{
                  name: 'Message',
                  value: message.content,
                  inline: true
                }, {
                  name: 'Pin Action',
                  value: action,
                  inline: true
                }]
              }
            })
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  async removePin (channel: GuildTextableChannel, message: string): Promise<void> {
    const query = await this.dbm.newQuery('pins').get(message)

    console.log(query)

    if (query !== undefined) {
      console.log('actually removing a pin')

      const msg = channel.messages.get(message)

      try {
        if (msg !== undefined) {
          await this.sendToLog(channel.guild.id, msg, 'removed')
        }

        await this.bot.unpinMessage(channel.id, message)
      } catch (error) {
        console.log(error)
      }

      await query.delete()
    }
  }

  async getPinMessage (message: string): Promise<PinnedMessage | void> {
    const query = await this.dbm.newQuery('pins').get(message)

    if (query !== undefined) {
      return {
        message: query.get('id'),
        pinnedAt: query.get('pinnedAt'),
        pinnedIn: query.get('pinnedIn')
      }
    }
  }

  async pinMessage (channel: GuildTextableChannel, message: string): Promise<void> {
    console.log('wow')
    const newPin = await this.dbm.newObject('pins', {
      id: message,
      pinnedIn: channel.id,
      pinnedAt: Date.now()
    }).save()

    console.log(newPin)

    try {
      await channel.pinMessage(message)
    } catch (error) {
      await newPin.delete()

      errorReport(error)
    }
  }

  async getPinSetting (guild: string, setting: string): Promise<string> {
    const query = await this.dbm.newQuery('guild').get(guild)

    const pinSetting: string = await query?.get(setting)

    return pinSetting
  }

  async setPinSetting (guild: string, setting: string, value: string | number): Promise<string> {
    const query = await this.dbm.newQuery('guild').get(guild)

    const currSetting: string | number = await this.getPinSetting(
      guild,
      setting
    )

    if (currSetting === value) {
      return `:x: This ${typeof value} is already set as the ${setting}`
    }

    switch (setting) {
      case 'pinRole':
        await query?.save({ pinRole: value })
        break
      case 'pin_emoji':
        await query?.save({ pin_emoji: value })
        break
      case 'pin_log':
        await query?.save({ pin_log: value })
        break
      case 'thresh':
        await query?.save({ thresh: value })
        break
    }

    return `:white_check_mark: New ${setting} successfully set!`
  }
}
