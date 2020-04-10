import { GuildCommand } from 'eris-boiler'

import canPin from '../permissions/canPin'
import Pinny from '../modules/pinny'

export default new GuildCommand<Pinny>({
  name: 'forcepin',
  description: 'Force pin a message',
  options: {
    aliases: ['fp'],
    permission: canPin
  },
  run: async (bot, { msg, params }) => {
    if (params.length <= 0) return 'Please refrence a message, using the ID'

    const m = await msg.channel.messages.get(params[0])

    if (m === undefined) return 'This isn\'t a message in this channel'

    await bot.pinManager.pinMessage(msg.channel, m.id)

    return '✅ [ FORCE PIN ] Successful'
  }
})
