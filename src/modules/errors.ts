import { User } from 'eris'

class BaseError extends Error {

  public code: number
  public message: string

  constructor (code: number, message: string) {
    super(message)
    this.code = code
    this.message = message
  }

}

export class PinError extends BaseError {

  constructor (message: string) {
    super(100, message)
    this.name = 'pin'
  }

}

export class GuildError extends BaseError {

  constructor (message: string) {
    super(200, message)
    this.name = 'guild'
  }

}

export class InputError extends BaseError {

  constructor (message: string) {
    super(300, message)
    this.name = 'input'
  }

}

export class CommandError extends BaseError {

  constructor (message: string) {
    super(400, message)
    this.name = 'command'
  }

}

export const userError = ({ id }: User, m: string): string => {
  return `<@${id}>, ERROR EXECUTING COMMAND, reason: ${m}.` +
    '\nIf you think this is a problem report it here: https://discord.com/invite/eqwAFJW'
}

export function errorMessage<E extends BaseError> (error: E): string {
  return `${error.code} | ${error.name} error: ${error.message}`
}
