import { WorkSpaceModel } from '../../../domain/models/workspace-model'

export interface LoadWorkSpaceUseCase {
  load: () => Promise<WorkSpaceResults.Model>
}

export interface DeleteWorkSpaceUseCase {
  deleteById: (id: string) => Promise<WorkSpaceResults.successMessage>
}

export interface InsertWorkSpaceUseCase {
  insert: (param: WorkSpaceModel) => Promise<WorkSpaceResults.successMessage>
}

export interface EditWorkSpaceUseCase {
  edit: (param: WorkSpaceResults.Param) => Promise<WorkSpaceResults.successMessage>
}

export declare namespace WorkSpaceResults {
  export type Model = WorkSpaceModel
  export type successMessage = {
    success: boolean
    message: string
  }
  export type Param = {
    id: string
    description: string,
	  owner: string,
	  priority: string
  }
}
