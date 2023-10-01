import { AxiosHttpClient } from '../../../../infra/http/http-client'
import { HttpEditTaskUseCase } from '../../../../usecases/workspace/http-edit-workspace'
import { makeApiUrl } from '../../http/api-url-factory'

export const makeRemoteEditTask = () => {
  const httpClient = new AxiosHttpClient()
  return new HttpEditTaskUseCase(makeApiUrl('edit'), httpClient)
}
