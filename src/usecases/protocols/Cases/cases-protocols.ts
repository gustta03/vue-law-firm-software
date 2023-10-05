import { CaseModel } from '../../../domain/models/proccess-cases-model'

export interface LoadAllCases {
  load: () => Promise<CaseResult.Model>
}

export interface SaveCases {
  save: (param: CaseResult.Param) => Promise<CaseResult.Model>
}

export interface EditCase {
  edit: (param: CaseResult.Param) => Promise<string>
}

export interface DeleteCase {
  deleteById: (id: string) => Promise<CaseResult.DeleteMessage>
}

export declare namespace CaseResult {
  export type Model = CaseModel

  export type Param = {
    id?: string
    title: string
    customer: string
    customerId: string
    action_type: string
    awarded_amount: number
    involved_parties: Array<{ name: string }>
    status: string
    owner: string
    protocol: string
    casedata: string
  }

  export type DeleteMessage = {
    success: true | false,
    message: string
  }
}
