import { CaseModel } from '../../domain/models/proccess-cases-model'
import { HttpClient, HttpStatusCode } from '../../infra/protocols/http-protocols'
import { CaseResult, LoadAllCases } from '../contracts/Cases/cases-protocols'

export class LoadAllCasesUseCase implements LoadAllCases {
  constructor(
    private apiUrl: string,
    private readonly loadCustomerRepository: HttpClient<CaseModel>
  ) {}

  async load(): Promise<CaseResult.Model> {
    const HttpResponse = await this.loadCustomerRepository.request({
      url: this.apiUrl,
      method: 'get'
    })

    switch (HttpResponse.statusCode) {
      case HttpStatusCode.ok:
        if (HttpResponse.body !== undefined) {
          return HttpResponse.body as CaseResult.Model
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