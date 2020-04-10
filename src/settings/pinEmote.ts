import { SettingCommand } from 'eris-boiler'
import Pinny, { pinVip } from '../modules/pinny'

import { isEmpty } from '../utils/extras'

export default new SettingCommand<Pinny>({
  name: 'pinemote',
  description: 'Change pin emote',
  displayName: 'Pinner Emote',
  setting: 'PinEmote',
  options: {
    aliases: ['pe'],
    permission: pinVip
  },
  getValue: async (bot, { msg }) => {
    const pinEmote = await bot.pinManager.getPinSetting(
      msg.channel.guild.id,
      'pinMoji'
    )

    console.log(pinEmote)

    return pinEmote
  },
  run: async (bot, { params, msg }) => {
    if (isEmpty(params) || params.length > 1) {
      return 'You\'ll need to provide **a** emote'
    }

    await bot.pinManager.setPinSetting(
      msg.channel.guild.id,
      'pinMoji',
      params[0]
    )

    return `New ***Pinner Emote*** set to ${params[0]}`
  }
})
