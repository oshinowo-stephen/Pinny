import { DatabaseManager } from 'eris-boiler'
import { GuildTextableChannel, Guild, TextChannel } from 'eris'

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

  async pinMessage (channel: GuildTextableChannel, messageId: string): Promise<void> {
    const query = await this.dbm.newQuery('pins').get(channel.guild.id)

    await this.bot.pinMessage(channel.id, messageId)

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

  async reportPinLog (guild: Guild | undefined, message: string): Promise<void> {
    if (guild === undefined) return

    const pinLog = await this.getPinSetting(
      guild.id,
      'pinLog'
    )

    if (pinLog !== undefined) {
      const channel = guild.channels.get(pinLog)
      if (channel !== undefined && channel instanceof TextChannel) {
        await channel.createMessage(message)
      }
    }
  }

  private generatePinId (): string {
    return Math.random().toString(36).substring(5)
  }
}
