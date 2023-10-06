import { AxiosHttpClient } from '../../../../infra/http/http-client'
import { SignupAttorneyUseCase } from '../../../../usecases/attorney/http-signup-user'
import { makeApiUrl } from '../../http/api-url-factory'

export const makeRemoteSignupAttorney = () => {
  const httpClient = new AxiosHttpClient()
  return new SignupAttorneyUseCase(makeApiUrl('signup'),httpClient)
}
