import { HttpClient, HttpStatusCode } from '../../infra/protocols/http-protocols'
import { Customer, DeleteCustomer } from '../protocols/customers/customer-contract'

export class HttpDeleteCustomer implements DeleteCustomer {
  constructor(
    private apiUrl: string,
    private readonly deleteCustomerRepository: HttpClient<RemoteEdit.Message>
  ) {}

  async deleteById(id: string): Promise<Customer.Message> {
    const HttpResponse = await this.deleteCustomerRepository.request({
      url: `${this.apiUrl}/${id}`,
      method: 'delete',
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
