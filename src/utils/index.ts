export { default as envLoader } from './envLoader'

export function inArray<T, A extends Array<T>> (a: A, e: T): boolean {
  return a.indexOf(e) !== -1
}

export const isEmpty = (e: any): boolean => {
  if (typeof e === 'string' || Array.isArray(e)) {
    return e.length === 0
  } else if (e instanceof Map || e instanceof Set) {
    return e.size === 0
  } else if (e instanceof Object) {
    return Object.keys(e).length === 0
  } else {
    return false
  }
}
