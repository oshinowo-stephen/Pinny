import { SettingCommand } from 'eris-boiler'

import {
  Pinny,
  pinVip,
} from '../modules/pinny'

import {
  isEmpty,
} from '../utils/'

import {
  userError,
} from '../modules/errors'

export default new SettingCommand<Pinny>({
  name: 'log',
  setting: 'Guild Log',
  displayName: 'Pinny\'s Guild Log',
  description: 'Change\'s guilds log',
  options: {
    aliases: [],
    permission: pinVip,
  },
  getValue: async (bot, { msg: { channel } }) => {
    const log = await bot.pinSettings.getPinLog(channel.guild)

    return `<#${log.id}>`
  },
  run: async (bot, { msg: { channel, author }, params }) => {
    if (!isEmpty(params) || params.length > 1) {
      await bot.pinSettings.setPinLog(channel.guild, params[0])

      return `<#${params[0]}>`
    }

    return userError(
      author,
      'I\'ll need ***one*** valid channel from this guild',
    )
  },
})
