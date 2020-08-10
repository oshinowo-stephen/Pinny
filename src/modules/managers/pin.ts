import {
  DatabaseQuery,
  DatabaseObject,
} from 'eris-boiler'

import {
  Message,
} from 'eris'

import { Pinny } from '../pinny'
import { PinError } from '../errors'

export class PinManager {

  private readonly pinQuery: DatabaseQuery
  private readonly pinObject: DatabaseObject

  constructor (client: Pinny) {
    this.pinQuery = client.dbm.newQuery('pins')
    this.pinObject = client.dbm.newObject('pins', null, true)
  }

  public async createPin ({
    id,
    content,
    channel,
  }: Message): Promise<void> {
    try {
      await this.pinObject.save({
        id,
        content,
        channel: channel.id,
        createdAt: Date.now(),
      })

      await channel.pinMessage(id)
    } catch (error) {
      if (error instanceof Error) {
        switch (error.message) {
          default:
            throw new PinError('invalid')
        }
      }
    }
  }

  public async fetchPin (msg: Message): Promise<PinnedMessage> {
    const query = await this.pinQuery.get({ id: msg.id })

    if (query !== undefined) {
      const parsedPin = await this.handlePinnedData(query, msg)

      return parsedPin
    }

    throw new PinError('pnf')
  }

  public async removePin ({ id }: Message): Promise<void> {
    const query = await this.pinQuery.get({ id })

    try {
      if (query !== undefined) {
        await query.delete()
      }
    } catch (error) {
      if (error instanceof Error) {
        switch (error) {
          default:
            throw new PinError(error.toString())
        }
      }
    }
  }

  private async handlePinnedData (
    query: DatabaseObject, {
      id,
      channel,
      guildID,
    }: Message,
  ): Promise<PinnedMessage> {
    return {
      inChannel: channel.id,
      pinnedAt: (await query.get('createdAt')) as number,
      messageLink: `https://discordapp.com/channels/${guildID ?? ''}/${channel.id}/${id}`,
    }
  }

}

export interface PinnedMessage {
  pinnedAt: number
  inChannel: string
  messageLink: string
}
