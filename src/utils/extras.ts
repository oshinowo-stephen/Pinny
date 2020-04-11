export const isEmpty = (input: string | any[]): boolean => input.length === 0

export const errorReport = (message: string): string => {
  return `
**[ ERR ALERT ]**, This isn't supposed to happen...

\`\`\`
${message}
\`\`\`

Please report this back here: https://discordapp.com/invite/eqwAFJW
    `
}
