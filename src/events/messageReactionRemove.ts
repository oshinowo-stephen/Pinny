import { DiscordEvent } from 'eris-boiler'

import Pinny from '../modules/pinny'

export default new DiscordEvent<Pinny>({
  name: 'messageReactionRemove',
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

    console.log(pinmoji, emoji.name)

    if (pinmoji === emoji.name) {
      console.log(message.reactions, emoteThresh)
      if (message.reactions[pinmoji].count < emoteThresh) {
        console.log('removing pin...')
        try {
          await bot.pinManager.removePin(message.channel.id, message.id)
        } catch (error) {
          console.log(error)

          throw error
        }
      }
    }
  }
})
