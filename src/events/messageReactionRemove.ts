import { DiscordEvent } from 'eris-boiler'

import Pinny from '../modules/pinny'

export default new DiscordEvent<Pinny>({
  name: 'messageReactionRemove',
  run: async (bot, message, emoji) => {
    if (message.guildID !== undefined) {
      const guildEmoji = await bot.pinSettings.getSetting(message.guildID, 'pin_emoji')
      const guildThresh = await bot.pinSettings.getSetting(message.guildID, 'thresh')
      const guildPinLog = await bot.pinSettings.getSetting(message.guildID, 'pin_log')

      if (guildEmoji.succeeded && guildThresh.succeeded) {
        const emojiName = guildEmoji.message
        const thresh = guildThresh.message

        if (emojiName !== undefined && thresh !== undefined) {
          const { name: emote } = emoji

          if (emote === emojiName && message.reactions[emote].count < thresh) {
            await bot.pinManager.removePin(message.channel, message.id)

            if (guildPinLog.succeeded && guildPinLog.message !== undefined) {
              const channel: string = message.channel.id

              await bot.pinUtility.sendToLog(message.channel.guild, {
                action: 'Pin Removed',
                reason: 'Doesn\'t reach threshold',
                actionedAt: Date.now(),
                actionedIn: `<#${channel}>`,
                message: message.content
              })
            }
          }
        }
      }
    }
  }
})
