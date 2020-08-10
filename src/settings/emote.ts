import { SettingCommand } from 'eris-boiler'

import {
  isEmpty,
} from '../utils'

import {
  userError,
} from '../modules/errors'

import {
  Pinny,
  pinVip,
} from '../modules/pinny'

export default new SettingCommand<Pinny>({
  name: 'emote',
  setting: 'Guild Emote',
  description: 'Change\'s Guilds emote',
  displayName: 'Pinny\'s Guild Emote',
  options: {
    aliases: [ 'e', 'ge' ],
    permission: pinVip,
  },
  getValue: async (bot, { msg: { channel } }) => {
    const emote = await bot.pinSettings.getGuildEmote(channel.guild)

    return emote
  },
  run: async (bot, { params, msg: { channel, author } }) => {
    if (!isEmpty(params) || params.length > 1) {
      await bot.pinSettings.setGuildEmote(channel.guild, params[0])

      return `${params[0]} is the new guild emote!`
    }

    return userError(
      author, 'please set ***one*** valid emote for this server!',
    )
  },
})
