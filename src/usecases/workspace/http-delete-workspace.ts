import { WorkSpaceModel } from '../../domain/models/workspace-model'
import { HttpClient, HttpStatusCode } from '../../infra/protocols/http-protocols'
import {
  DeleteWorkSpaceUseCase,
  WorkSpaceResults
} from '../protocols/workspace/workspace-contracts'

export class HttpDeleteTaskUseCase implements DeleteWorkSpaceUseCase {
  constructor(
    private url: string,
    private readonly deleteTaskRepository: HttpClient<WorkSpaceResults.successMessage>
  ) {}

  async deleteById(id: string): Promise<WorkSpaceResults.successMessage> {
    const HttpResponse = await this.deleteTaskRepository.request({
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
      case HttpStatusCode.badRequest:
        throw new Error(HttpResponse.body?.message)
      default:
        throw new Error('Unhandled status code')
    }
  }
}
