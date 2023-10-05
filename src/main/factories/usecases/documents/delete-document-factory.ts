import { AxiosHttpClient } from '../../../../infra/http/http-client'
import { HttpDeleteByIdDocumentsUseCase } from '../../../../usecases/documents/http-delete-document'
import { makeApiUrl } from '../../http/api-url-factory'

export const makeRemoteDeleteDocument = () => {
  const httpClient = new AxiosHttpClient()
  return new HttpDeleteByIdDocumentsUseCase(makeApiUrl('delete/document'), httpClient)
}
