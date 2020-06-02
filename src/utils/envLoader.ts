import { join } from 'path'
import { load as loadDockerSecrets } from 'docker-secret-env'
import { config, DotenvConfigOutput } from 'dotenv'

const loader = (): DotenvConfigOutput | void => {
  if (process.env.NODE_ENV !== 'production') {
    return config({ path: join(__dirname, '../../.env') })
  } else {
    return loadDockerSecrets()
  }
}

export default loader()
