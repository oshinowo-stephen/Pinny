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
  getValue: async (bot, { msg: { channel: { guild } } }) => {
  },
  run: async (bot, { msg, params }) => {
  }
})
