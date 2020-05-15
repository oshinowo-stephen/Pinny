import { SettingCommand } from 'eris-boiler'
import Pinny, { pinVip } from '../modules/pinny'

import { isEmpty } from '../utils/extras'

export default new SettingCommand<Pinny>({
  name: 'pinthresh',
  description: 'Change pin threshold',
  displayName: 'Pinner Threshold',
  setting: 'PinThresh',
  options: {
    aliases: ['pth', 'thresh', 'pt'],
    permission: pinVip
  },
  getValue: async (bot, { msg }) => {
    const { id: guildID } = msg.channel.guild

    const {
      succeeded,
      message
    } = await bot.pinSettings.getSetting(guildID, 'thresh')

    return succeeded
      ? message !== undefined
        ? message
        : 'N/A'
      : 'N/A'
  },
  run: async (bot, { params, msg }) => {
    const { id: guildID } = msg.channel.guild

    if (!isEmpty(params)) {
      const newThresh = parseInt(params[0])

      if (isNaN(newThresh)) return `Invalid number: ${params[0]}`

      await bot.pinSettings.setSetting(guildID, 'thresh', newThresh)

      return `Set the threshold to: ${params[0]}`
    }

    return 'I\'ll need a number to define at the new threshold'
  }
})
