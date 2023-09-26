import { AccountModel } from '../../domain/models/account-model'
import { HttpResponse } from './http-protocol'

export interface SaveUserRepository<R = any> {
  save: (param: SaveUserResult.Param) => Promise<HttpResponse<R>>
}

export declare namespace SaveUserResult {
  export type Param = {
    name: string
    email: string
    password: string
  }
  export type Result = AccountModel
}
