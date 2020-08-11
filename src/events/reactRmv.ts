import {
  DiscordEvent,
} from 'eris-boiler'

import {
  Message,
  TextChannel,
} from 'eris'

import { Pinny } from '../modules/pinny'

export default new DiscordEvent<Pinny>({
  name: 'messageReactionRemove',
  run: async (bot, msg): Promise<void> => {
    if ((msg as Message).guildID !== undefined) {
      const channel = (msg as Message).channel as TextChannel

      const gThresh = await bot.pinSettings
        .getGuildThresh(channel.guild)
      const gEmote = await bot.pinSettings
        .getGuildEmote(channel.guild)

      if (bot.pinUtils.checkThresh(msg, gEmote, gThresh)) {
        await bot.unpinMessage(
          (msg as Message).channel.id,
          (msg as Message).id,
        )
      }
    }
  },
})
