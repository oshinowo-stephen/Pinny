import { DiscordEvent } from 'eris-boiler'
import Pinny from '../modules/pinny'

export default new DiscordEvent<Pinny>({
  name: 'messageDelete',
  run: async (bot, msg) => {
    if (msg.guildID !== undefined) {
      const guildPinLog = await bot.pinSettings.getSetting(msg.guildID, 'pin_log')

      if (guildPinLog.succeeded && guildPinLog.message !== undefined) {
        const channel: string = msg.channel.id

        await bot.pinUtility.sendToLog(msg.channel.guild, {
          action: 'Pin Removed',
          reason: 'Message deleted',
          actionedAt: Date.now(),
          actionedIn: `<#${channel}>`,
          message: msg.content
        })
      }

      await bot.pinManager.removePin(msg.channel, msg.id)
    }
  }
})
