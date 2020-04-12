import { join } from 'path'
import { load } from 'docker-secret-env'
import { config, DotenvConfigOutput } from 'dotenv'

const loader = (): DotenvConfigOutput | void => {
  if (process.env.NODE_ENV === 'production') {
    return load()
  } else {
    return config({ path: join(__dirname, '../../.env') })
  }
}

export default loader()
