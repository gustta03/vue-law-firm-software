import { CustomerResultModel } from '../../domain/models/customer-model'
import { HttpClient, HttpStatusCode } from '../../infra/protocols/http-protocols'
import { SaveCustomer, Customer } from '../protocols/customers/customer-contract'

export class HttpSaveCustomer implements SaveCustomer {
  constructor(
    private apiUrl: string,
    private readonly saveCustomerRepository: HttpClient<RemoteSave.Response>
  ) {}

  async save(params: Customer.Param): Promise<Customer.Model> {
    const HttpResponse = await this.saveCustomerRepository.request({
      url: this.apiUrl,
      method: 'post',
      body: params
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

export namespace RemoteSave {
  export type Response = CustomerResultModel
}
