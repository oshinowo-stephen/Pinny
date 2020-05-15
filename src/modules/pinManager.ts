import { GuildTextableChannel } from 'eris'

import Pinny, { PinResult } from './pinny'

interface PinnedMessage {
  message: string
  pinnedAt: number
  pinnedIn: string
}

export default class PinManager {
  client: Pinny

  constructor (client: Pinny) {
    this.client = client
  }

  async removePin (channel: GuildTextableChannel, message: string, reason?: string): PinResult<string> {
    const result = {
      succeeded: false,
      message: 'Invalid Error'
    }

    const query = await this.client.dbm.newQuery('pins').get(message)

    if (query !== undefined) {
      const msg = channel.messages.get(message)

      if (msg !== undefined) {
        result.succeeded = true

        reason === undefined
          ? result.message = 'Removed Pin'
          : result.message = `Removed Pin, ${reason}`

        await this.client.unpinMessage(channel.id, message)

        await query.delete()
      }
    }

    return result
  }

  async getPinMessage (message: string): PinResult<PinnedMessage> {
    const query = await this.client.dbm.newQuery('pins').get(message)

    if (query !== undefined) {
      return {
        succeeded: true,
        message: {
          message: query.get('id'),
          pinnedAt: query.get('pinnedAt'),
          pinnedIn: query.get('pinnedIn')
        }
      }
    }

    return {
      succeeded: false,
      message: undefined
    }
  }

  async pinMessage (channel: GuildTextableChannel, message: string): PinResult<PinnedMessage> {
    const newPin = await this.client.dbm.newObject('pins', {
      id: message,
      pinnedIn: channel.id,
      pinnedAt: Date.now()
    })

    await channel.pinMessage(message)

    await newPin.save()

    return {
      succeeded: true,
      message: 'message pinned'
    }
  }
}
