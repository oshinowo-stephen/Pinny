import { DiscordEvent } from 'eris-boiler'

import Pinny from '../modules/pinny'

export default new DiscordEvent<Pinny>({
  name: 'messageReactionRemove',
  run: async (bot, message, emoji) => {
    if (message?.reactions !== undefined) {
      console.log('herllo')

      const hasPin = await bot.pinManager.getPinMessage(message.id)

      if (hasPin !== undefined || hasPin !== null) {
        console.log('no pin')

        const emoteThresh = await bot.pinManager.getPinSetting(
          message.channel.guild.id,
          'thresh'
        )

        const pinmoji = await bot.pinManager.getPinSetting(
          message.channel.guild.id,
          'pin_emoji'
        )

        if (pinmoji === emoji.name) {
          console.log('no pinnn')
          if (message.reactions[pinmoji].count < emoteThresh) {
            console.log('removing pin...')

            try {
              await bot.pinManager.removePin(message.channel, message.id)
            } catch (error) {
              console.log(error)

              throw error
            }
          }
        }
      }
    }
  }
})
