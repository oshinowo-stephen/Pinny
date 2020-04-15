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
    const pinThresh = await bot.pinManager.getPinSetting(
      msg.channel.guild.id,
      'thresh'
    )

    console.log(pinThresh)

    return pinThresh
  },
  run: async (bot, { params, msg }) => {
    const thresh = parseInt(params[0])

    if ((isEmpty(params) || params.length > 1) && !isNaN(thresh)) {
      return 'You\'ll need to provide **a valid** number'
    }

    await bot.pinManager.setPinSetting(
      msg.channel.guild.id,
      'thresh',
      thresh
    )

    return `New ***Pinner Threshold*** set to ${params[0]}`
  }
})
