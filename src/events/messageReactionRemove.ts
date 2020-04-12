import { DiscordEvent } from 'eris-boiler'

import Pinny from '../modules/pinny'

export default new DiscordEvent<Pinny>({
  name: 'messageReactionRemove',
  run: async (bot, message, emoji) => {
    console.log(message)
    if (message === undefined || message.reactions === undefined) return

    const emoteThresh = await bot.pinManager.getPinSetting(
      message.channel.guild.id,
      'emoteThresh'
    )
    const pinmoji = await bot.pinManager.getPinSetting(
      message.channel.guild.id,
      'pinMoji'
    )

    if (pinmoji === emoji.name) {
      if (message.reactions[pinmoji].count < emoteThresh) {
        try {
          await bot.pinManager.removePin(message.channel, message.id)
        } catch (error) {
          console.log(error)

          throw error
        }
      }
    }
  }
})
