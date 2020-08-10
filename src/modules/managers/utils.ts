import { Pinny } from '../pinny'
import {
  PinManager,
  PinSettings,
} from './index'

import {
  inArray,
} from '../../utils/'

import {
  Guild,
  Member,
  Message,
} from 'eris'

interface Reaction {
  count: number
  me: string
}

export class PinUtils {

  private readonly settings: PinSettings
  private readonly manager: PinManager

  constructor (client: Pinny) {
    this.settings = client.pinSettings
    this.manager = client.pinManager
  }

  public async sendToLog (g: Guild, m: Message): Promise<void> {
    const logChannel = await this.settings.getPinLog(g)

    await logChannel.createMessage(m)
  }

  public async isPinned (msg: Message): Promise<boolean> {
    try {
      await this.manager.fetchPin(msg)
    } catch (error) {
      if (error instanceof Error) {
        switch (error) {
          default:
            return false
        }
      }
    }

    return true
  }

  public checkThresh (
    msg: Message,
    emote: string,
    thresh: number,
  ): boolean | void {
    if (msg.reactions[emote] !== undefined) {
      const reaction = msg.reactions[emote] as Reaction

      if (reaction.count >= thresh) {
        return true
      } else {
        return false
      }
    }

    throw new Error('invalid reaction')
  }

  public async isVip (g: Guild, m: Member): Promise<boolean> {
    const vipRole = await this.settings.getVip(g)

    return inArray<string, Array<string>>(m.roles, vipRole.id)
  }

}
