import { GuildCommand } from 'eris-boiler'

import Pinny, { pinVip } from '../modules/pinny'
import { isEmpty, errorReport } from '../utils/extras'

export default new GuildCommand<Pinny>({
  name: 'pinners',
  description: 'Removes / Gives member the FORCE pinner role [ Pinner Role ]',
  options: {
    aliases: ['p'],
    permission: pinVip,
    subCommands: [
      new GuildCommand<Pinny>({
        name: 'remove',
        description: 'Removes member from the FORCE pinner role [ Pinner Role ]',
        options: {
          aliases: ['rm', 'del']
        },
        run: async (bot, { msg, params }) => {
          if (isEmpty(params[0]) || params.length > 1) {
            return 'Please provide a member...'
          }

          const pinnerRole = await bot.pinManager.getPinSetting(
            msg.channel.guild.id,
            'pinRole'
          )
          const member = msg.channel.guild.members.get(params[0])

          if (member === undefined) {
            return 'Invalid member... is this member in the server?..'
          }

          if (pinnerRole === null || pinnerRole === undefined) {
            return 'The [ Pinner Role ] isn\'t even a thing...'
          }

          try {
            await member.removeRole(pinnerRole)
          } catch (error) {
            return errorReport(error)
          }

          return `<@${member.id}> Removed from Pinner Role`
        }
      }),
      new GuildCommand<Pinny>({
        name: 'add',
        description: 'Gives member the FORCE pin role [ Pinner Role ]',
        options: {
          aliases: ['allow', 'grant']
        },
        run: async (bot, { msg, params }) => {
          if (isEmpty(params[0]) || params.length > 1) {
            return 'Please provide a member...'
          }

          const pinnerRole = await bot.pinManager.getPinSetting(
            msg.channel.guild.id,
            'pinRole'
          )
          const member = msg.channel.guild.members.get(params[0])

          if (member === undefined) {
            return 'Invalid member... is this member in the server?..'
          }

          if (pinnerRole === null || pinnerRole === undefined) {
            return 'The [ Pinner Role ] isn\'t even a thing...'
          }

          try {
            await member.addRole(pinnerRole)
          } catch (error) {
            console.log(error)

            return errorReport(error)
          }

          return `<@${member.id}> Added to Pinner Role`
        }
      })
    ]
  }
})
