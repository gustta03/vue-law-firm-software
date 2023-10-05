import { AxiosHttpClient } from '../../../../infra/http/http-client'
import { HttpDeleteCase } from '../../../../usecases/cases/http-delete-case-factory'
import { makeApiUrl } from '../../http/api-url-factory'

export const makeRemoteDeleteCase = () => {
  const httpClient = new AxiosHttpClient()
  return new HttpDeleteCase(makeApiUrl('delete/case'), httpClient)
}
