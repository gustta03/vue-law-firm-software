import { DocumentModel } from '../../../domain/models/documents-model'
import { WorkSpaceModel } from '../../../domain/models/workspace-model'

export interface LoadDocumentsUseCase {
  load: () => Promise<DocumentResults.Model>
}

// export interface DeleteWorkSpaceUseCase {
//   deleteById: (id: string) => Promise<DocumentResults.successMessage>
// }

export interface SaveDocumentsUseCase {
  save: (param: DocumentResults.Param) => Promise<DocumentResults.Model>
}

// export interface EditWorkSpaceUseCase {
//   edit: (param: DocumentResults.Param) => Promise<DocumentResults.successMessage>
// }

export declare namespace DocumentResults {
  export type Model = DocumentModel
  
    export type Param = {
      description: string
      customerId: string
      title: string
      owner: string
      url: string
    }
  
}
