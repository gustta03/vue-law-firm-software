import { HttpStatusCode } from '../infra/contracts/http-protocol'
import { SaveUserRepository } from '../infra/contracts/http-save-user'
import { SaveUserResult, SaveUser } from './contracts/save-customer'

export class SaveUseUseCase implements SaveUser {
  constructor(private readonly loadCustomerRepository: SaveUserRepository) {}

  async save(params: SaveUserResult.Param): Promise<SaveUserResult.Model> {
    const HttpResponse = await this.loadCustomerRepository.save(params)

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
