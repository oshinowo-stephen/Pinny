import { Permission } from 'eris-boiler'

import Pinny from '../modules/pinny'

export default new Permission<Pinny>({
  level: 5000,
  run: async (bot, { msg }): Promise<boolean> => {
    const pinnerRole = await bot.pinManager.getPinSetting(
      msg.guildID ?? '',
      'pinRole'
    )

    if (msg.member?.roles.includes(pinnerRole) !== undefined) {
      return true
    }

    return false
  }
})
