import { DiscordEvent } from 'eris-boiler'
import Pinny from '../modules/pinny'

export default new DiscordEvent<Pinny>({
  name: 'messageDelete',
  run: async (bot, msg) => {
    const query = await bot.dbm.newQuery('pins').get(msg.id, 'message')

    if (query !== undefined) {
      console.log('deleting pin entry...')

      await query.delete()
    }
  }
})
