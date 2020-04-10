import { config } from 'dotenv'
import { join } from 'path'

export default config({ path: join(__dirname, '../../.env') })
