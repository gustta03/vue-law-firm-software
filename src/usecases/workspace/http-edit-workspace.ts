import { EditWorkSpaceUseCase, WorkSpaceResults } from '../protocols/workspace/workspace-contracts'
import { HttpClient, HttpStatusCode } from '../../infra/protocols/http-protocols'

export class HttpEditTaskUseCase implements EditWorkSpaceUseCase {
  constructor(
    private apiUrl: string,
    private readonly editTaskRepository: HttpClient<WorkSpaceResults.successMessage>
  ) {}

  async edit(param: WorkSpaceResults.Param): Promise<WorkSpaceResults.successMessage> {
    const HttpResponse = await this.editTaskRepository.request({
      url: `${this.apiUrl}/${param.id}`,
      method: 'put',
      body: {
        description: param.description,
        priority: param.priority,
        owner: param.owner
      }
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
