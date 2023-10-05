import { HttpClient, HttpStatusCode } from '../../infra/protocols/http-protocols'
import { EditCustomer, Customer } from '../protocols/customers/customer-contract'

export class HttpEditCustomer implements EditCustomer {
  constructor(
    private apiUrl: string,
    private readonly editCustomerRepository: HttpClient<RemoteEdit.Message>
  ) {}

  async edit(params: Customer.Param): Promise<Customer.Message> {
    const HttpResponse = await this.editCustomerRepository.request({
      url: `${this.apiUrl}/${params.id}`,
      method: 'put',
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
      default:
        throw new Error('Unhandled status code')
    }
  }
}

export namespace RemoteEdit {
  export type Message = {
    success: true | false
    message: string
  }
}
