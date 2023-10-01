import { AxiosHttpClient } from '../../../../infra/http/http-client'
import { SaveUserUseCase } from '../../../../usecases/http-save-user'
import { makeApiUrl } from '../../http/api-url-factory'

export const makeRemoteSaveUser = () => {
  const httpClient = new AxiosHttpClient()
  return new SaveUserUseCase(makeApiUrl('signup'),httpClient)
}
