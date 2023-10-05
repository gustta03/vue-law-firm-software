import { CustomerResultModel } from '../../domain/models/customer-model'

export interface LoadCustomer {
  load: () => Promise<LoadAllCustomer.Model>
}

export declare namespace LoadAllCustomer {
  export type Model = CustomerResultModel
}
