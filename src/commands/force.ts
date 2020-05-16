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
        run: async (bot, { msg, params }) => {
          if (!isEmpty(params)) {
            const guildPinLog = await bot.pinSettings.getSetting(
              msg.channel.guild.id,
              'pin_log'
            )

            const message = msg.channel.messages.get(params[0])

            if (message !== undefined) {
              await bot.pinManager.pinMessage(msg.channel, message.id)

              if (guildPinLog.succeeded && guildPinLog.message !== undefined) {
                await bot.pinUtility.sendToLog(msg.channel.guild, {
                  action: 'Message FORCE Pinned',
                  actionedAt: Date.now(),
                  actionedIn: msg.channel.id,
                  reason: params.slice(1).join(' '),
                  message: params[0]
                })
              }

              return 'Force Pinned'
            }

            return 'Invalid message from this channel'
          }

          return 'I\'ll need a message to pin!'
        }
      }),
      new GuildCommand<Pinny>({
        name: 'remove',
        description: 'Force remove a pinned message',
        run: async (bot, { msg, params }) => {
          if (!isEmpty(params)) {
            const guildPinLog = await bot.pinSettings.getSetting(
              msg.channel.guild.id,
              'pin_log'
            )

            const message = msg.channel.messages.get(params[0])

            if (message !== undefined) {
              await bot.pinManager.removePin(msg.channel, message.id)

              if (guildPinLog.succeeded && guildPinLog.message !== undefined) {
                await bot.pinUtility.sendToLog(msg.channel.guild, {
                  action: 'Message FORCE Pinned',
                  actionedAt: Date.now(),
                  actionedIn: msg.channel.id,
                  reason: params.slice(1).join(' '),
                  message: params[0]
                })
              }

              return 'Force Removed Pin'
            }

            return 'Invalid message from this channel'
          }

          return 'I\'ll need a message to pin!'
        }
      })
    ]
  }
})
