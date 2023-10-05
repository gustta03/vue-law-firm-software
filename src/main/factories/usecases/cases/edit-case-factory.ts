import { AxiosHttpClient } from '../../../../infra/http/http-client'
import { HttpEditCaseUseCase } from '../../../../usecases/cases/http-edit-cases-usecase'
import { makeApiUrl } from '../../http/api-url-factory'

export const makeRemoteEditCase = () => {
  const httpClient = new AxiosHttpClient()
  return new HttpEditCaseUseCase(makeApiUrl('update/case'), httpClient)
}
