import { DiscordEvent } from 'eris-boiler'
import Pinny from '../modules/pinny'

export default new DiscordEvent<Pinny>({
  name: 'messageDelete',
  run: async (bot, msg) => {
  }
})
