import { HttpClient, HttpStatusCode } from '../infra/contracts/http-protocol'
import { LoadCustomer, LoadAllCustomer } from './contracts/load-customer'

export class LoadAllCustomerUseCase implements LoadCustomer {
  constructor(private readonly loadCustomerRepository: HttpClient<LoadAllCustomer.Model>) {}

  async load(): Promise<LoadAllCustomer.Model> {
    const HttpResponse = await this.loadCustomerRepository.request({
      url: 'http://localhost:5858/api/customer/all',
      method: 'get'
    })

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
