import { GuildCommand } from 'eris-boiler'

import Pinny, { pinVip } from '../modules/pinny'

import { isEmpty } from '../utils/extras'

export default new GuildCommand<Pinny>({
  name: 'force',
  description: 'Force remove/add a pin message',
  options: {
    permission: pinVip,
    subCommands: [
      new GuildCommand<Pinny>({
        name: 'add',
        description: 'Force add a pin message',
        run: (bot, { params }) => {
          if (!isEmpty(params)) {
            console.log('add the pin!')
          }

          return 'I\'ll need a message to pin!'
        }
      }),
      new GuildCommand<Pinny>({
        name: 'remove',
        description: 'Force remove a pinned message',
        run: (bot, { params }) => {
          if (!isEmpty(params)) {
            console.log('remove the pin!')
          }

          return 'I\'ll need a pinned message to remove!'
        }
      })
    ]
  }
})
