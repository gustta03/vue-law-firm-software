import { AxiosHttpClient } from '../../../infra/http/http-client'
import { HttpLoadCustomer } from '../../../infra/repository/http-load-customers'
import { LoadAllCustomerUseCase } from '../../../usecases/http-load-customers'
import { makeApiUrl } from '../http/api-url-factory'

export const makeRemoteAddAccount = () => {
  const httpClient = new AxiosHttpClient()
  const httpRepository = new HttpLoadCustomer(makeApiUrl('customer/all'), httpClient)
  const customerUseCase = new LoadAllCustomerUseCase(httpRepository)
  return customerUseCase
}
