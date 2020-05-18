import { SettingCommand } from 'eris-boiler'
import Pinny, { pinVip } from '../modules/pinny'

import { isEmpty } from '../utils/extras'

export default new SettingCommand<Pinny>({
  name: 'pinemote',
  description: 'Change pin emote',
  displayName: 'Pinner Emote',
  setting: 'PinEmote',
  options: {
    aliases: ['pe', 'emote'],
    permission: pinVip
  },
  getValue: async (bot, { msg }) => {
    const { id: guildID } = msg.channel.guild

    const {
      succeeded,
      message
    } = await bot.pinSettings.getSetting(guildID, 'pin_emoji')

    return succeeded
      ? message !== undefined
        ? message
        : 'N/A'
      : 'N/A'
  },
  run: async (bot, { params, msg }) => {
    if (!isEmpty(params)) {
      const { id: guildID } = msg.channel.guild

      const emote = bot.pinUtility
        .getGuildEmote(guildID, params[0])

      if (emote === undefined) {
        return 'This emote doesn\'t exist on this server'
      }

      await bot.pinSettings.setSetting(
        guildID,
        'pin_emoji',
        emote
      )

      return `Set the pin emote to: ${params[0]}`
    }

    return 'I\'ll need a new emote, to set...'
  }
})
