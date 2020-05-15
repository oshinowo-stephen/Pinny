export const isEmpty = (
  input: string
  | any[]
  | Map<any, any>
): boolean => {
  if (input instanceof Map) {
    return input.size === 0
  } else {
    return input.length === 0
  }
}
