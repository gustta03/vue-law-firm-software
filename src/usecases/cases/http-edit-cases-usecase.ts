import { EditWorkSpaceUseCase, WorkSpaceResults } from '../protocols/workspace/workspace-contracts'
import { HttpClient, HttpStatusCode } from '../../infra/protocols/http-protocols'

export class HttpEditCaseUseCase implements EditWorkSpaceUseCase {
  constructor(
    private apiUrl: string,
    private readonly editCaseRepository: HttpClient<WorkSpaceResults.successMessage>
  ) {}

  async edit(param: WorkSpaceResults.Param): Promise<WorkSpaceResults.successMessage> {
    const HttpResponse = await this.editCaseRepository.request({
      url: `${this.apiUrl}/${param.id}`,
      method: 'put',
      body: param
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
