import { HttpStatusCode } from '../infra/contracts/http-protocol'
import { LoadAllCustomerRepository, Repository } from '../infra/contracts/http-repository'
import { LoadCustomer, LoadAllCustomer } from './contracts/load-customer'

export class LoadAllCustomerUseCase implements LoadCustomer {
  constructor(
    private readonly loadCustomerRepository: Repository<LoadAllCustomerRepository.Result>
  ) {}

  async load(): Promise<LoadAllCustomer.Model> {
    const HttpResponse = await this.loadCustomerRepository.load()

    switch (HttpResponse.statusCode) {
      case HttpStatusCode.ok:
        if (HttpResponse.body !== undefined) {
          return HttpResponse.body as LoadAllCustomer.Model
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
