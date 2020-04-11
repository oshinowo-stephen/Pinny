import { SettingCommand } from 'eris-boiler'
import Pinny from '../modules/pinny'
import { isEmpty, errorReport } from '../utils/extras'

export default new SettingCommand<Pinny>({
  name: 'pinlog',
  setting: 'pinLog',
  options: {
    aliases: ['pl', 'log']
  },
  description: 'Sets the pin log for the server',
  displayName: 'Pin Log',
  getValue: async (bot, { msg: { channel: { guild } } }) => {
    const pinLog: string = await bot.pinManager.getPinSetting(guild.id, 'pinLog')

    return pinLog === null || pinLog === undefined
      ? 'N/A'
      : `<#${pinLog}>`
  },
  run: async (bot, { msg, params }) => {
    if (isEmpty(params) || params.length > 1) {
      return 'Please provide ***a text channel*** for me...'
    }

    const channel: string = params[0]

    try {
      await bot.pinManager.setPinSetting(
        msg.channel.guild.id,
        'pinLog',
        channel
      )
    } catch (error) {
      return errorReport(error)
    }

    return `Successfully set [ PIN LOG ] to <#${channel}>`
  }
})
