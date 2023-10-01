import { DocumentModel } from '../../domain/models/documents-model'
import { HttpClient, HttpStatusCode } from '../../infra/protocols/http-protocols'
import {
 LoadDocumentsUseCase
} from '../contracts/documents/documents-contracts'

export class HttpLoadDocumentsUseCase implements LoadDocumentsUseCase {
  constructor(
    private url: string,
    private readonly loadWorkSpaceRepository: HttpClient<DocumentModel>
  ) {}

  async load(): Promise<DocumentModel> {
    const HttpResponse = await this.loadWorkSpaceRepository.request({
      url: this.url,
      method: 'get'
    })

    switch (HttpResponse.statusCode) {
      case HttpStatusCode.ok:
        if (HttpResponse.body !== undefined) {
          return HttpResponse.body
        } else {
          throw new Error('Response body is undefined')
        }
      case HttpStatusCode.forbidden:
        throw new Error('Forbidden')
      default:
        throw new Error('Unhandled status code')
    }
  }
}
