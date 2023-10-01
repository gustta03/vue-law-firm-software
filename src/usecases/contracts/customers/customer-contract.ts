import { CustomerResultModel } from '../../../domain/models/customer-model'

export interface LoadCustomerUseCase {
  load: () => Promise<CustomerResult.Model>
}


export declare namespace CustomerResult {
  export type Model = CustomerResultModel
  export type successMessage = {
    success: boolean
    message: string
  }
  export type Param = {
    id: string
    description: string,
	  owner: string,
	  priority: string
  }
}
