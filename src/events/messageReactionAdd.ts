import { DiscordEvent } from 'eris-boiler'
import Pinny from '../modules/pinny'

export default new DiscordEvent<Pinny>({
  name: 'messageReactionAdd',
  run: async (bot, message, emoji) => {
    if (message.reactions === undefined) return

    const emoteThresh = await bot.pinManager.getPinSetting(
      message.channel.guild.id,
      'emoteThresh'
    )
    const pinmoji = await bot.pinManager.getPinSetting(
      message.channel.guild.id,
      'pinMoji'
    )

    console.log(pinmoji, emoji.name)

    if (pinmoji === emoji.name) {
      console.log(message.reactions, emoteThresh)
      if (message.reactions[pinmoji].count === emoteThresh) {
        console.log('HELLO')
        try {
          await bot.pinManager.pinMessage(message.channel, message.id)
        } catch (error) {
          console.log(error)

          throw error
        }
      }
    }

    console.log('A pinning message just started...')
  }
})
