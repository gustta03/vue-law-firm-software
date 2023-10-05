import { DocumentModel } from '../../domain/models/documents-model'
import { HttpClient, HttpStatusCode } from '../../infra/protocols/http-protocols'
import { DeleteDocument, Document } from '../protocols/documents/documents-contracts'

export class HttpDeleteByIdDocumentsUseCase implements DeleteDocument {
  constructor(
    private url: string,
    private readonly deleteDocumentRepository: HttpClient<RemoteDeleteDocument.Message>
  ) {}

  async deleteById(id: string): Promise<Document.Message> {
    const HttpResponse = await this.deleteDocumentRepository.request({
      url: `${this.url}/${id}`,
      method: 'delete'
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

export namespace RemoteDeleteDocument {
  export type Message = {
    success: true
    message: string
  }
}

