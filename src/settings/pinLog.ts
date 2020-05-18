import { SettingCommand } from 'eris-boiler'

import Pinny from '../modules/pinny'

import { isEmpty } from '../utils/extras'

export default new SettingCommand<Pinny>({
  name: 'pinlog',
  setting: 'pinLog',
  options: {
    aliases: ['pl', 'log']
  },
  description: 'Sets the pin log for the server',
  displayName: 'Pin Log',
  getValue: async (bot, { msg }) => {
    const { id: guildID } = msg.channel.guild

    const {
      succeeded,
      message
    } = await bot.pinSettings.getSetting(guildID, 'pin_log')

    return succeeded
      ? message !== null && message !== undefined
        ? `<#${message}>`
        : 'N/A'
      : 'N/A'
  },
  run: async (bot, { msg, params }) => {
    const { id: guildID } = msg.channel.guild

    if (!isEmpty(params)) {
      const channel = msg.channel.guild.channels.get(params[0])

      if (channel !== undefined) {
        await bot.pinSettings.setSetting(
          guildID,
          'pin_log',
          channel.id
        )

        return `Set pin-logs to channel: <#${params[0]}>`
      }

      return `No such channel: <#${params[0]}>`
    }

    return 'I\'ll need a channel in order to set a new pinLog channel!'
  }
})
