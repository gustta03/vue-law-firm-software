import { AxiosHttpClient } from '../../../infra/http/http-client'
import { HttpLoadWorkSpace } from '../../../infra/repositoris/workspace/http-load-workspace'
import { HttpLoadWorkSpaceUseCase } from '../../../usecases/http-load-workspace'
import { makeApiUrl } from '../http/api-url-factory'

export const makeRemoteGetWorkSpaces = () => {
  const httpClient = new AxiosHttpClient()
  const httpRepository = new HttpLoadWorkSpace(makeApiUrl('workspace/tasks'), httpClient)
  return new HttpLoadWorkSpaceUseCase(httpRepository)

}
