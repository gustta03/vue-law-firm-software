import { AxiosHttpClient } from '../../../../infra/http/http-client'
import { HttpSaveDocumentsUseCase } from '../../../../usecases/documents/http-save-document'
import { makeApiUrl } from '../../http/api-url-factory'

export const makeRemoteSaveDocument = () => {
  const httpClient = new AxiosHttpClient()
  return new HttpSaveDocumentsUseCase(makeApiUrl('/create/documents'), httpClient)
}
