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
  },
  run: async (bot, { params, msg }) => {
  }
})
