import { Pinny } from '../pinny'
import {
  PinManager,
  PinSettings,
} from './index'

import {
  Guild,
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
    const parsed = /<:([a-z]+:[0-9]+)>/.exec(emote)

    if (parsed === null) {
      throw new Error('invalid emote')
    }

    if (msg.reactions[parsed[1]] !== undefined) {
      const reaction = msg.reactions[parsed[1]] as Reaction

      if (reaction.count >= thresh) {
        return true
      } else {
        return false
      }
    }
  }

}
