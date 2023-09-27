import { WorkSpaceModel } from '../../../domain/models/workspace-model'
import { HttpClient } from '../../contracts/http-protocol'
import { loadWorkSpaceRepository } from '../../contracts/load-workspace'

export class HttpLoadWorkSpace implements loadWorkSpaceRepository {
  constructor(
    private apiUrl: string,
    private readonly httpClient: HttpClient<WorkSpaceModel>
  ) {}
  async loadAll() {
    const HttpResponse = await this.httpClient.request({
      url: `${this.apiUrl}`,
      method: 'get'
    })
    return HttpResponse
  }
}
