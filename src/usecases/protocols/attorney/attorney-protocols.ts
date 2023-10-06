import { AccountModel } from '../../../domain/models/account-model'

export interface AttorneyUseCase {
  save: (param: Attorney.Param) => Promise<Attorney.Model>
}

export interface AttorneySignUpUseCase {
  load: (param: Attorney.Param) => Promise<Attorney.Model>
}

export declare namespace Attorney {
  export type Model = {
    accessToken: string
  }

  export type Param = {
    name: string
    email: string
    password: string
  }
}
