import { HttpClient, HttpRequest, HttpStatusCode } from "../../infra/protocols/http-protocols"
import { LoadWorkSpaceUseCase, WorkSpaceResults } from "../protocols/workspace/workspace-contracts"

export class HttpLoadWorkSpaceUseCase implements LoadWorkSpaceUseCase {
  constructor(
    private apiUrl: string,
    private readonly loadWorkSpaceRepository: HttpClient<WorkSpaceResults.Model>
  ) {}
  async load(): Promise<WorkSpaceResults.Model> {
    const HttpResponse = await this.loadWorkSpaceRepository.request({
      url: this.apiUrl,
      method: 'get',
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
