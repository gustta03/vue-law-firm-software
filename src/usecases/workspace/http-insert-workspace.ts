import { HttpClient, HttpStatusCode } from '../../infra/protocols/http-protocols'
import { InsertWorkSpaceUseCase, WorkSpaceResults } from '../contracts/workspace/workspace-contracts'

export class HttpInsertWorkSpaceTask implements InsertWorkSpaceUseCase {
  constructor(
    private url: string,
    private readonly loadWorkSpaceRepository: HttpClient<WorkSpaceResults.successMessage>
  ) {}

  async insert(param: WorkSpaceResults.Param): Promise<WorkSpaceResults.successMessage> {
    const HttpResponse = await this.loadWorkSpaceRepository.request({
      url: this.url,
      method: 'post',
      body: param
    })

    switch (HttpResponse.statusCode) {
      case HttpStatusCode.created:
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
