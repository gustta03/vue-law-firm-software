import { AxiosHttpClient } from '../../../../infra/http/http-client'
import { LoadAllCustomerUseCase } from '../../../../usecases/customers/http-load-customers'
import { makeApiUrl } from '../../http/api-url-factory'

export const makeRemoteLoadCustomer = () => {
  const httpClient = new AxiosHttpClient()
  return new LoadAllCustomerUseCase(makeApiUrl('customer/all'), httpClient)
}
