import { CustomerResultModel } from '../../domain/models/customer-model'
import { HttpClient, HttpStatusCode } from '../../infra/protocols/http-protocols'
import { LoadCustomerUseCase, CustomerResult } from '../contracts/customers/customer-contract'

export class LoadAllCustomerUseCase implements LoadCustomerUseCase {
  constructor(
    private apiUrl: string,
    private readonly loadCustomerRepository: HttpClient<CustomerResultModel>
  ) {}

  async load(): Promise<CustomerResult.Model> {
    const HttpResponse = await this.loadCustomerRepository.request({
      url: this.apiUrl,
      method: 'get'
    })

    switch (HttpResponse.statusCode) {
      case HttpStatusCode.ok:
        if (HttpResponse.body !== undefined) {
          return HttpResponse.body as CustomerResult.Model
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