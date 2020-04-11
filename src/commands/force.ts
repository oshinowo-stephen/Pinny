import { GuildCommand } from 'eris-boiler'

import canPin from '../permissions/canPin'
import Pinny from '../modules/pinny'
import { isEmpty, errorReport } from '../utils/extras'

export default new GuildCommand<Pinny>({
  name: 'force',
  description: 'Force pin a message',
  options: {
    aliases: ['f'],
    permission: canPin,
    subCommands: [
      new GuildCommand<Pinny>({
        name: 'remove',
        description: 'Force removes a pinned message, that was pinned by me',
        options: {
          permission: canPin,
          aliases: ['rm']
        },
        run: async (bot, { msg, params }) => {
          const pinnedMessage = await bot.dbm.newQuery('pins').get(params[0], 'message')

          if ((isEmpty(params) || params.length > 1) && pinnedMessage === undefined) {
            return 'Please provide ***a pinned message, from me*** to remove :rage:'
          }

          try {
            await bot.pinManager.removePin(msg.channel.id, params[0])
          } catch (error) {
            return errorReport(error.toString())
          }

          return `Successfully removed ${params[0]} from my pinned collection...`
        }
      }),
      new GuildCommand<Pinny>({
        name: 'add',
        description: 'Force pins a message',
        options: {
          permission: canPin,
          aliases: ['create', 'new']
        },
        run: async (bot, { msg, params }) => {
          const message = msg.channel.messages.get(params[0])

          if (message === undefined) {
            return 'Invalid message'
          }

          await bot.pinManager.pinMessage(msg.channel, params[0])

          return `Successfully force pinned [ ${message.content} ]`
        }
      })
    ]
  }
})
