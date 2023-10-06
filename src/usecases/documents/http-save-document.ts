import { DocumentModel } from '../../domain/models/documents-model'
import { HttpClient, HttpStatusCode } from '../../infra/protocols/http-protocols'
import { SaveDocumentsUseCase, Document } from '../protocols/documents/documents-contracts'

export class HttpSaveDocumentsUseCase implements SaveDocumentsUseCase {
  constructor(
    private url: string,
    private readonly saveDocumentRepository: HttpClient<DocumentModel>
  ) {}

  async save(param: Document.Param): Promise<any> {
    const HttpResponse = await this.saveDocumentRepository.request({
      url: this.url,
      method: 'post',
      body: param
    })

    switch (HttpResponse.statusCode) {
      case HttpStatusCode.created:
        if (HttpResponse.body !== undefined) {
          return HttpResponse.body
        } else {
          throw new Error('Response body is undefined')
        }
      case HttpStatusCode.badRequest:
        throw new Error('Verifique todos os campos')
      default:
        throw new Error('Unhandled status code')
    }
  }
}
