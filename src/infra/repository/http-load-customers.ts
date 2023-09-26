import { CustomerResultModel } from '../../domain/models/customer-model'
import { HttpClient } from '../contracts/http-protocol'
import { Repository } from '../contracts/http-repository'

export class HttpLoadCustomer implements Repository {
  constructor(private readonly httpClient: HttpClient<CustomerResultModel>) {}
  async load() {
    const HttpResponse = await this.httpClient.request({
      url: 'http://localhost:5858/api/customer/all',
      method: 'get'
    })
    return HttpResponse
  }
}
