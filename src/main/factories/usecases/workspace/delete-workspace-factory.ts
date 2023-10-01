import { AxiosHttpClient } from '../../../../infra/http/http-client'
import { HttpDeleteTaskUseCase } from '../../../../usecases/workspace/http-delete-workspace'
import { makeApiUrl } from '../../http/api-url-factory'

export const makeRemoteDeleteTask = () => {
  const httpClient = new AxiosHttpClient()
  return new HttpDeleteTaskUseCase(makeApiUrl('workspace/task'), httpClient)
}
