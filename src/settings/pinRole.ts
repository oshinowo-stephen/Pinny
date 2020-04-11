import { SettingCommand } from 'eris-boiler'
import Pinny, { pinVip } from '../modules/pinny'

import { isEmpty } from '../utils/extras'

export default new SettingCommand<Pinny>({
  name: 'pinrole',
  description: 'Change pin role',
  displayName: 'Pinner Role',
  setting: 'PinRole',
  options: {
    aliases: ['pr'],
    permission: pinVip
  },
  getValue: async (bot, { msg }) => {
    const pinRole: string | null = await bot.pinManager.getPinSetting(
      msg.channel.guild.id,
      'pinRole'
    )

    console.log(pinRole)

    return pinRole === null
      ? 'N/A'
      : `<@&${pinRole}>`
  },
  run: async (bot, { params, msg }) => {
    const role = msg.channel.guild.roles.get(params[0])

    if ((isEmpty(params) || params.length > 1) && role !== undefined) {
      return 'You\'ll need to provide **a valid** role'
    }

    if (role !== undefined) {
      await bot.pinManager.setPinSetting(
        msg.channel.guild.id,
        'pinRole',
        role.id
      )
    } else {
      return `Role : <@#${params[0]}> is invalid`
    }

    return `New ***Pinner Role*** set to <@&${params[0]}>`
  }
})
