import { AxiosHttpClient } from '../../../infra/http/http'
import { LoadAllCustomerUseCase } from '../../../usecases/http-load-customers'

export const makeRemoteAddAccount = async () => {
  const httpRepository = new AxiosHttpClient()
  const customerUseCase = new LoadAllCustomerUseCase(httpRepository)

  return customerUseCase
}
