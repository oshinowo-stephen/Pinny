import Pinny from './pinny'

import { error } from 'eris-boiler/util/logger'
import { Message } from 'eris'

export default class PinCache {
  client: Pinny
  content: Map<string, Message>
  maxSize: number
  lruStore: string[]

  constructor (client: Pinny) {
    this.lruStore = []
    this.maxSize = 5
    this.client = client
    this.content = new Map()
  }

  set (key: string, val: Message): void {
    if (this.content.size >= this.maxSize) {
      const lruKey = this.lruStore.pop()

      if (lruKey !== undefined) {
        this.content.delete(lruKey)

        this.client.pinManager.reportPinLog(
          this.client.guilds.get(val.guildID ?? ''),
            `Removed ${lruKey} from pin watch-list reason, inactive`
        ).catch((err) => error(err))
      }
    }

    this.replace(key)

    this.content.set(key, val)
  }

  get (key: string): Message | undefined {
    const msg = this.content.get(key)

    if (msg !== undefined) {
      this.replace(key)

      return msg
    }

    return undefined
  }

  replace (key: string): void {
    const rkey = this.lruStore.indexOf(key)

    if (rkey !== -1) {
      this.lruStore.splice(rkey, -1)

      this.lruStore.unshift(key)
    }
  }
}
