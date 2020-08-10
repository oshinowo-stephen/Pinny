import { join } from 'path'
import {
  config,
  DotenvConfigOutput,
} from 'dotenv'
import { load as loadDockerSecrets } from 'docker-secret-env'

const loader = (): DotenvConfigOutput | void => {
  if (process.env.NODE_ENV !== 'production') {
    return config({ path: join(__dirname, '../../.env') })
  } else {
    return loadDockerSecrets()
  }
}

export default loader()
