import { CaseModel } from '../../../domain/models/proccess-cases-model'

export interface LoadAllCases {
  load: () => Promise<CaseResult.Model>
}

export interface SaveCases {
  save: (param: CaseResult.Param) => Promise<CaseResult.Model>
}


export declare namespace CaseResult {
  export type Model = CaseModel

  export type Param = {
    title: string,
    customer: string,
    action_type: string,
    awarded_amount: number,
    involved_parties: Array<{ name: string }>,
    status: string,
    owner: string,
    protocol: string,
    casedata: string
  }
}
