import { AccountModel } from '../../domain/models/account-model'

export interface SaveUser {
  save: (params: SaveUserResult.Param) => Promise<SaveUserResult.Model>
}

export declare namespace SaveUserResult {
  export type Param = {
    name: string
    email: string
    password: string
  }
  export type Model = AccountModel
}
