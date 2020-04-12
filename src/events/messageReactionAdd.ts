import { DiscordEvent } from 'eris-boiler'
import Pinny from '../modules/pinny'

export default new DiscordEvent<Pinny>({
  name: 'messageReactionAdd',
  run: async (bot, message, emoji) => {
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
      if (message.reactions[pinmoji].count === emoteThresh) {
        try {
          await bot.pinManager.pinMessage(message.channel, message.id)
        } catch (error) {
          console.log(error)

          throw error
        }
      }
    }
  }
})
