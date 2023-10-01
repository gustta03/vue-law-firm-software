import { AccountModel } from '../domain/models/account-model'
import { HttpStatusCode } from '../infra/protocols/http-protocols'
import { SaveUserResult, SaveUser } from './contracts/save-customer'
import { HttpClient } from '../infra/protocols/http-protocols'

export class SaveUserUseCase implements SaveUser {
  constructor(
    private apiUrl: string,
    private readonly httpRequestRepository: HttpClient<AccountModel>
  ) {}

  async save(params: SaveUserResult.Param): Promise<SaveUserResult.Model> {
    const HttpResponse = await this.httpRequestRepository.request({
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
      case HttpStatusCode.forbidden:
        throw new Error('Forbidden')
      case HttpStatusCode.badRequest:
        throw new Error('Algo inesperado aconteceu, tente novamente')
      default:
        throw new Error('Unhandled status code')
    }
  }
}
