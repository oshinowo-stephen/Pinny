import { DiscordEvent } from 'eris-boiler'

import Pinny from '../modules/pinny'

export default new DiscordEvent<Pinny>({
  name: 'messageReactionAdd',
  run: async (bot, message, emoji) => {
    if (message?.reactions !== undefined) {
      const emoteThresh = await bot.pinManager.getPinSetting(
        message.channel.guild.id,
        'thresh'
      )

      const pinmoji = await bot.pinManager.getPinSetting(
        message.channel.guild.id,
        'pin_emoji'
      )

      console.log(emoteThresh, pinmoji)

      if (pinmoji === emoji.name) {
        if (message.reactions[pinmoji].count === emoteThresh) {
          try {
            console.log('pinning mesage')
            await bot.pinManager.pinMessage(message.channel, message.id)
          } catch (error) {
            console.log(error)

            throw error
          }
        }
      }
    }
  }
})
