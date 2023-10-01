import { AxiosHttpClient } from '../../../../infra/http/http-client'
import { HttpLoadWorkSpaceUseCase } from '../../../../usecases/workspace/http-load-workspace'
import { makeApiUrl } from '../../http/api-url-factory'

export const makeRemoteGetWorkSpaces = () => {
  const httpClient = new AxiosHttpClient()
  return new HttpLoadWorkSpaceUseCase(makeApiUrl('workspace/tasks'), httpClient)
}
