import { CaseModel } from '../../domain/models/proccess-cases-model'
import { HttpClient, HttpStatusCode } from '../../infra/protocols/http-protocols'
import { CaseResult, LoadAllCases, SaveCases } from '../contracts/Cases/cases-protocols'

export class SaveCaseUseCase implements SaveCases {
  constructor(
    private apiUrl: string,
    private readonly loadCustomerRepository: HttpClient<CaseModel>
  ) {}

  async save(param: CaseResult.Param): Promise<CaseResult.Model> {
    const HttpResponse = await this.loadCustomerRepository.request({
      url: this.apiUrl,
      method: 'post',
      body: param
    })

    switch (HttpResponse.statusCode) {
      case HttpStatusCode.created:
        if (HttpResponse.body !== undefined) {
          return HttpResponse.body as CaseResult.Model
        } else {
          throw new Error('Response body is undefined')
        }
      case HttpStatusCode.serverError:
        throw new Error('Erro interno tente novamente')
      case HttpStatusCode.badRequest:
        if (HttpResponse.body !== undefined && 'error' in HttpResponse.body) {
          throw new Error(HttpResponse.body.error as string)
        } else {
          throw new Error('Bad request response body is missing error property')
        }
      default:
        throw new Error('Unhandled status code')
    }
  }
}
