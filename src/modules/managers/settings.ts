import {
  Role,
  Guild,
  TextableChannel,
} from 'eris'

import { DatabaseQuery } from 'eris-boiler'
import { GuildError } from '../errors'
import { Pinny } from '../pinny'

export class PinSettings {

  private readonly guildQuery: DatabaseQuery

  constructor (client: Pinny) {
    this.guildQuery = client.dbm.newQuery('guild')
  }

  public async setGuildEmote (
    { id }: Guild,
    emote: string,
  ): Promise<void> {
    const settings = await this.guildQuery.get(id)

    if (settings !== undefined) {
      await settings.save({
        emoji: emote,
      })
    }

    throw new GuildError('not found')
  }

  public async getGuildEmote (
    { id }: Guild,
  ): Promise<string> {
    const settings = await this.guildQuery.get(id)

    if (settings !== undefined) {
      const emote = (await settings.get('emoji') as string | undefined)

      if (emote === undefined) {
        throw new GuildError('emote not found')
      }

      return emote
    }

    throw new GuildError('not found')
  }

  public async setGuildThresh (
    { id }: Guild,
    thresh: number,
  ): Promise<void> {
    const settings = await this.guildQuery.get(id)

    if (settings !== undefined) {
      await settings.save({ thresh })
    }

    throw new GuildError('not found')
  }

  public async getGuildThresh (
    { id }: Guild,
  ): Promise<number> {
    const settings = await this.guildQuery.get(id)

    if (settings !== undefined) {
      const guildThresh = (await settings.get('thresh') as number | undefined)

      if (guildThresh === undefined) {
        throw new GuildError('no thresh set')
      }

      return guildThresh
    }

    throw new GuildError('not found')
  }

  public async setPinLog (
    { id, channels }: Guild,
    channel: string,
  ): Promise<void> {
    const settings = await this.guildQuery.get(id)

    if (settings !== undefined) {
      try {
        if (channels.has(channel)) {
          await settings.save({ log: channel })
        } else {
          throw new GuildError(`no channel: <#${channel}>`)
        }
      } catch (error) {
        if (error instanceof Error) {
          switch (error) {
            default:
              throw new GuildError('cannot set log')
          }
        }
      }
    }

    throw new GuildError('invalid')
  }

  public async getPinLog ({
    id,
    channels,
  }: Guild): Promise<TextableChannel> {
    const settings = await this.guildQuery.get(id)

    if (settings !== undefined) {
      const channelID = (await settings.get('log') as string | undefined)

      if (channelID !== undefined) {
        if (!channels.has(channelID)) {
          throw new GuildError('invalid textchannel')
        }

        return channels.get(channelID) as TextableChannel
      }
    }

    throw new GuildError('invalid')
  }

  public async setVip (
    vip: string,
    g: Guild,
  ): Promise<void> {
    const settings = await this.guildQuery.get(g.id)

    if (settings !== undefined) {
      if (g.roles.has(vip) !== undefined) {
        await settings.save({ vip })
      } else {
        throw new GuildError('invalid role')
      }
    }

    throw new GuildError('invalid')
  }

  public async getVip (
    { id, roles }: Guild,
  ): Promise<Role> {
    const settings = await this.guildQuery.get(id)

    if (settings !== undefined) {
      const roleID = (await settings.get('vip') as string | undefined)

      if (roleID !== undefined) {
        return roles.get(roleID) as Role
      }

      throw new GuildError('vip not set')
    }

    throw new GuildError('invalid')
  }

  public async isDisabled ({
    id,
  }: Guild): Promise<boolean> {
    const settings = await this.guildQuery.get(id)

    if (settings !== undefined) {
      const disabled = (await settings.get('listen') as boolean | undefined)

      return disabled === undefined ? false : disabled
    }

    throw new GuildError('invalid')
  }

}
