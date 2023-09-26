import { AxiosHttpClient } from '../../../infra/http/http-client'
import { HttpSaveUserRepository } from '../../../infra/repositoris/signup/http-signup-repository'
import { SaveUseUseCase } from '../../../usecases/http-save-user'
import { makeApiUrl } from '../http/api-url-factory'

export const makeRemoteSaveUser = () => {
  const httpClient = new AxiosHttpClient()
  const httpRepository = new HttpSaveUserRepository(makeApiUrl('signup'), httpClient)
  const saveUserUseCase = new SaveUseUseCase(httpRepository)
  return saveUserUseCase
}
