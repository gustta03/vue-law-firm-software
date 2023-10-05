import { AxiosHttpClient } from '../../../../infra/http/http-client'
import { HttpEditCustomer } from '../../../../usecases/customers/http-edit-customer'
import { makeApiUrl } from '../../http/api-url-factory'

export const makeRemoteEditCustomer = () => {
  const httpClient = new AxiosHttpClient()
  return new HttpEditCustomer(makeApiUrl('customer/update'), httpClient)

}
