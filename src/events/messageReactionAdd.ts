import { DiscordEvent } from 'eris-boiler'

import Pinny from '../modules/pinny'

export default new DiscordEvent<Pinny>({
  name: 'messageReactionAdd',
  run: async (bot, message, emoji): Promise<void> => {
    if (message.guildlID !== undefined) {
      const guildEmoji = await bot.pinSettings.getSetting(message.guidID, 'pin_emoji')
      const guildThresh = await bot.pinSettings.getSetting(message.guidID, 'tresh')

      if (guildEmoji.succeeded && guildThresh.succeeded) {
        // const emojiName = guildEmoji.message
        // const thresh = guildThresh.message
      }
    }
  }
})
