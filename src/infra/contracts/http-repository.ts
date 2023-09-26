import { CustomerResultModel } from '../../domain/models/customer-model'
import { HttpResponse } from './http-protocol'

export interface Repository<R = any> {
  load: () => Promise<HttpResponse<R>>
}

export declare namespace LoadAllCustomerRepository {
  export type Result = CustomerResultModel
}
