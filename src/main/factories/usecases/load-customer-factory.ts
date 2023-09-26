import { AxiosHttpClient } from '../../../infra/http/http-client'
import { HttpLoadCustomer } from '../../../infra/repository/http-load-customers'
import { LoadAllCustomerUseCase } from '../../../usecases/http-load-customers'

export const makeRemoteAddAccount = () => {
  const httpClient = new AxiosHttpClient()
  const httpRepository = new HttpLoadCustomer(httpClient)
  const customerUseCase = new LoadAllCustomerUseCase(httpRepository)
  return customerUseCase
}
