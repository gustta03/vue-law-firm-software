import { AxiosHttpClient } from '../../../../infra/http/http-client'
import { HttpLoadDocumentsUseCase } from '../../../../usecases/documents/http-documents'
import { makeApiUrl } from '../../http/api-url-factory'

export const makeRemoteDocument = () => {
  const httpClient = new AxiosHttpClient()
  return new HttpLoadDocumentsUseCase(makeApiUrl('find/all/documents'), httpClient)
}
