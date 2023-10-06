import { CustomerResultModel } from '../../domain/models/customer-model'
import { HttpClient, HttpStatusCode } from '../../infra/protocols/http-protocols'
import { LoadCustomerUseCase, Customer } from '../protocols/customers/customer-contract'

export class LoadAllCustomerUseCase implements LoadCustomerUseCase {
  constructor(
    private apiUrl: string,
    private readonly loadCustomerRepostory: HttpClient<CustomerResultModel>
  ) {}

  async load(): Promise<Customer.Model> {
    const HttpResponse = await this.loadCustomerRepostory.request({
      url: this.apiUrl,
      method: 'get'
    })

    switch (HttpResponse.statusCode) {
      case HttpStatusCode.ok:
        if (HttpResponse.body !== undefined) {
          return HttpResponse.body as Customer.Model
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