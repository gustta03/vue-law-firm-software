import { DocumentModel } from '../../domain/models/documents-model';
import { HttpClient, HttpStatusCode } from '../../infra/protocols/http-protocols';
import {
  SaveDocumentsUseCase,
  DocumentResults,
} from '../contracts/documents/documents-contracts';

export class HttpSaveDocumentsUseCase implements SaveDocumentsUseCase {
  constructor(
    private url: string,
    private readonly loadWorkSpaceRepository: HttpClient<DocumentModel>
  ) {}

  async save(param: DocumentResults.Param): Promise<DocumentModel> {
    const HttpResponse = await this.loadWorkSpaceRepository.request({
      url: this.url,
      method: 'post',
      body: param,
    });

    switch (HttpResponse.statusCode) {
      case HttpStatusCode.created:
        if (HttpResponse.body !== undefined) {
          return HttpResponse.body;
        } else {
          throw new Error('Response body is undefined');
        }
      case HttpStatusCode.serverError:
        throw new Error('Erro interno, tente novamente');
      case HttpStatusCode.badRequest:
        if (
          HttpResponse.body !== undefined &&
          'error' in HttpResponse.body
        ) {
          throw new Error(HttpResponse.body.error as string);
        } else {
          throw new Error('Bad request response body is missing error property');
        }
      default:
        throw new Error('Unhandled status code');
    }
  }
}
