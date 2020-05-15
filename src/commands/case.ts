import { GuildCommand } from 'eris-boiler'

import Pinny from '../modules/pinny'

export default new GuildCommand<Pinny>({
  name: 'case',
  description: 'Grab a pin case',
  run: (bot, { params }) => {
    return 'A pin case'
  }
})
