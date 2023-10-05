import { DocumentModel } from '../../../domain/models/documents-model'

export interface LoadDocumentsUseCase {
  load: () => Promise<Document.Model>
}

export interface DeleteDocument {
  deleteById: (id: string) => Promise<Document.Message>
}

export interface SaveDocumentsUseCase {
  save: (param: Document.Param) => Promise<Document.Model>
}


export declare namespace Document {
  export type Model = DocumentModel

  export type Param = {
    description: string
    customerId: string
    title: string
    owner: string
    url: string
  }

  export type Message = {
    success: true
    message: string
  }
}
