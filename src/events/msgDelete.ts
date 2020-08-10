import {
  DiscordEvent,
} from 'eris-boiler'

import {
  Pinny,
} from '../modules/pinny'

export default new DiscordEvent<Pinny>({
  name: 'messageDelete',
  run: async (bot, msg): Promise<void> => {
    const isPinned = await bot.pinUtils.isPinned(msg)

    if (isPinned) {
      await bot.pinManager.removePin(msg)
    }
  },
})
