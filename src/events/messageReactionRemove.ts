import { DiscordEvent } from 'eris-boiler'

import Pinny from '../modules/pinny'

export default new DiscordEvent<Pinny>({
  name: 'messageReactionRemove',
  run: async (bot, message, emoji) => {
  }
})
