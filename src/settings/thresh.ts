import {
  SettingCommand,
} from 'eris-boiler'

import {
  isEmpty,
} from '../utils'

import {
  userError,
  errorMessage,
} from '../modules/errors'

import {
  Pinny,
  pinVip,
} from '../modules/pinny'

const validateThresh = (t: string): number | undefined => {
  const parseThresh = parseInt(t)

  if (!isNaN(parseThresh)) {
    return parseThresh
  }

  return undefined
}

export default new SettingCommand<Pinny>({
  name: 'thresh',
  displayName: 'Guild Threshold',
  setting: 'Pinny\'s Guild Threshold',
  description: 'Sets the threshold, for pinny',
  options: {
    aliases: [ 't', 'gt', 'threshold' ],
    permission: pinVip,
  },
  getValue: async (bot, { msg }) => {
    const { channel } = msg

    const gThrsh = await bot.pinSettings.getGuildThresh(channel.guild)

    return gThrsh.toString()
  },
  run: async (bot, { msg, params }) => {
    if (!isEmpty(params)) {
      const pinThresh = validateThresh(params[0])

      if (pinThresh !== undefined) {
        try {
          await bot.pinSettings.setGuildThresh(msg.channel.guild, pinThresh)

          return `Guild Threshold is now at: ${pinThresh}`
        } catch (error) {
          return errorMessage(error)
        }
      }

      return userError(msg.author, 'invalid number')
    }

    return userError(msg.author, 'requires a new number as a threshold')
  },
})
