import { HttpClient, HttpStatusCode } from '../../infra/protocols/http-protocols'
import { DeleteCase, CaseResult } from '../protocols/Cases/cases-protocols'

export class HttpDeleteCase implements DeleteCase {
  constructor(
    private url: string,
    private readonly deleteCaseRepository: HttpClient<RemoteDeleteCase.Message>
  ) {}

  async deleteById(id: string): Promise<CaseResult.DeleteMessage> {
    const HttpResponse = await this.deleteCaseRepository.request({
      url: `${this.url}/${id}`,
      method: 'delete'
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

export namespace RemoteDeleteCase {
  export type Message = {
    success: true | false
    message: string
  }
}

