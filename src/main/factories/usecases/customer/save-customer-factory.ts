import { AxiosHttpClient } from '../../../../infra/http/http-client'
import { HttpSaveCustomer } from '../../../../usecases/customers/http-save-customer'
import { makeApiUrl } from '../../http/api-url-factory'

export const makeRemoteSaveCustomer = () => {
  const httpClient = new AxiosHttpClient()
  return new HttpSaveCustomer(makeApiUrl('customers'), httpClient)

}
