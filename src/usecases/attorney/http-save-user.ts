import { AccountModel } from '../../domain/models/account-model'
import { HttpStatusCode } from '../../infra/protocols/http-protocols'
import { Attorney, AttorneyUseCase } from '../protocols/attorney/attorney-protocols'
import { HttpClient } from '../../infra/protocols/http-protocols'

export class SaveUserUseCase implements AttorneyUseCase {
  constructor(
    private apiUrl: string,
    private readonly saveUserRepository: HttpClient<RemoteSave.Response>
  ) {}

  async save(params: Attorney.Param): Promise<Attorney.Model> {
    const HttpResponse = await this.saveUserRepository.request({
      url: this.apiUrl,
      method: 'post',
      body: params
    })
    switch (HttpResponse.statusCode) {
      case HttpStatusCode.ok:
        if (HttpResponse.body !== undefined) {
          return HttpResponse.body
        } else {
          throw new Error('Response body is undefined')
        }
      case HttpStatusCode.badRequest:
        throw new Error('Algo inesperado aconteceu, tente novamente')
      default:
        throw new Error('Unhandled status code')
    }
  }
}

export namespace RemoteSave {
  export type Response = {
    accessToken: string
  }
}
