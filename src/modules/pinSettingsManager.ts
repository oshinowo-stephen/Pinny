// import Pinny, { PinResult } from './pinny'

// export default class PinSettingManager {
//   client: Pinny

//   constructor (client: Pinny) {
//     this.client = client
//   }

//   async getSetting (guild: string, name: string): PinResult<string> {
//     const query = await this.client.dbm.newQuery('guild').get(guild)

//     const data = query?.get(name)

//     if (data === undefined) {
//       return {
//         succeeded: false,
//         message: undefined
//       }
//     }

//     return {
//       succeeded: true,
//       message: data
//     }
//   }

//   async setSetting (
//     guild: string,
//     name: string,
//     settingData: string | number
//   ): PinResult<string> {
//     const query = await this.client.dbm.newQuery('guild').get(guild)

//     if (query === undefined) {
//       return {
//         succeeded: false,
//         message: 'invalid error'
//       }
//     }

//     await query?.save({ [name]: settingData })

//     return {
//       succeeded: true,
//       message: undefined
//     }
//   }
// }
