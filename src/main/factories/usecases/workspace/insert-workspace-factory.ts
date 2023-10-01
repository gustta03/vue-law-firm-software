import { AxiosHttpClient } from '../../../../infra/http/http-client'
import { HttpInsertWorkSpaceTask } from '../../../../usecases/workspace/http-insert-workspace'
import { makeApiUrl } from '../../http/api-url-factory'

export const makeRemoteInsertTask = () => {
  const httpClient = new AxiosHttpClient()
  return new HttpInsertWorkSpaceTask(makeApiUrl('/tasks'), httpClient)
}
