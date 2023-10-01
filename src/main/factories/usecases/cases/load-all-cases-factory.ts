import { AxiosHttpClient } from '../../../../infra/http/http-client'
import { LoadAllCasesUseCase } from '../../../../usecases/cases/cases-usecase'
import { makeApiUrl } from '../../http/api-url-factory'

export const makeRemoteLoadCases = () => {
  const httpClient = new AxiosHttpClient()
  return new LoadAllCasesUseCase(makeApiUrl('cases'), httpClient)
}
