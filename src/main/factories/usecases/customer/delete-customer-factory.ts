import { AxiosHttpClient } from '../../../../infra/http/http-client'
import { HttpDeleteCustomer } from '../../../../usecases/customers/http-delete-customer'
import { makeApiUrl } from '../../http/api-url-factory'

export const makeRemoteDeleteCustomer = () => {
  const httpClient = new AxiosHttpClient()
  return new HttpDeleteCustomer(makeApiUrl('delete/customer'), httpClient)
}
