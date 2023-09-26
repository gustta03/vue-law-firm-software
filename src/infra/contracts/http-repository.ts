import { CustomerResultModel } from '../../domain/models/customer-model'

export interface Repository {
  loadAll: () => Promise<LoadAllCustomerRepository.Result>
}

declare namespace LoadAllCustomerRepository {
  export type Result = CustomerResultModel
}
