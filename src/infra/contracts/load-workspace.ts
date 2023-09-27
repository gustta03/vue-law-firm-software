import { WorkSpaceModel } from '../../domain/models/workspace-model'
import { HttpResponse } from './http-protocol'

export interface loadWorkSpaceRepository<R = any> {
  loadAll: () => Promise<HttpResponse<R>>
}

export declare namespace LoadWorkSpace {
  export type Result = WorkSpaceModel
}
