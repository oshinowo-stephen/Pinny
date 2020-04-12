import { DatabaseManager } from 'eris-boiler'
import { GuildTextableChannel, Message } from 'eris'

import Pinny from './pinny'

export interface PinManagerResult {
  pinned: boolean
  reason: string
}

export default class PinManager {
  dbm: DatabaseManager
  bot: Pinny

  constructor (bot: Pinny) {
    this.bot = bot
    this.dbm = bot.dbm
  }

  private async sendToLog (guild: string, message: Message, action: string): Promise<void> {
    const pinLog = await this.getPinSetting(guild, 'pinLog')

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

    const msg = channel.messages.get(message)

    try {
      if (msg !== undefined) {
        await this.sendToLog(channel.guild.id, msg, 'removed')
      }

      await this.bot.unpinMessage(channel.id, message)
    } catch (error) {
      console.log(error)
    }

    await query?.delete()
  }

  async pinMessage (channel: GuildTextableChannel, messageId: string): Promise<void> {
    const query = await this.dbm.newQuery('pins').get(channel.guild.id)

    await this.bot.pinMessage(channel.id, messageId)

    const message = channel.messages.get(messageId)

    if (message !== undefined) {
      await this.sendToLog(channel.guild.id, message, 'pinned')
    }

    await query?.save({
      id: this.generatePinId(),
      message: messageId,
      pinnedIn: channel.id,
      pinnedAt: Date.now()
    })
  }

  async getPinSetting (guild: string, setting: string): Promise<any> {
    const query = await this.dbm.newQuery('guild').get(guild)

    const pinSetting = await query?.get(setting)

    return pinSetting
  }

  async setPinSetting (guild: string, setting: string, value: string | number): Promise<any> {
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
      case 'pinMoji':
        await query?.save({ pinMoji: value })
        break
      case 'pinLog':
        await query?.save({ pinLog: value })
        break
      case 'emoteThresh':
        await query?.save({ emoteThresh: value })
        break
    }

    return `:white_check_mark: New ${setting} successfully set!`
  }

  private generatePinId (): string {
    return Math.random().toString(36).substring(5)
  }
}
