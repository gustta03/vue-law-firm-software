import { HttpStatusCode } from '../infra/contracts/http-protocol'
import { LoadWorkSpaceUseCase } from '../usecases/contracts/load-workspace'
import { LoadWorkSpace } from '../infra/contracts/load-workspace'
import {  loadWorkSpaceRepository } from '../infra/contracts/load-workspace'

export class HttpLoadWorkSpaceUseCase implements LoadWorkSpaceUseCase {
  constructor(
    private readonly loadWorkSpaceRepository: loadWorkSpaceRepository<LoadWorkSpace.Result>
  ) {}
  async load(): Promise<LoadWorkSpace.Result> {
    const HttpResponse = await this.loadWorkSpaceRepository.loadAll()

    switch (HttpResponse.statusCode) {
      case HttpStatusCode.ok:
        if (HttpResponse.body !== undefined) {
          return HttpResponse.body as LoadWorkSpace.Result
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
