import { AxiosHttpClient } from '../../../../infra/http/http-client'
import { SaveCaseUseCase } from '../../../../usecases/cases/http-save-case-usecase'
import { makeApiUrl } from '../../http/api-url-factory'

export const makeRemoteSaveCases = () => {
  const httpClient = new AxiosHttpClient()
  return new SaveCaseUseCase(makeApiUrl('create/cases'), httpClient)
}
