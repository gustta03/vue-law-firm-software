import { CustomerResultModel } from '../../../domain/models/customer-model'

export interface LoadCustomerUseCase {
  load: () => Promise<Customer.Model>
}

export interface EditCustomer {
  edit: (params: Customer.Param) => Promise<Customer.Message>
}

export interface DeleteCustomer {
  deleteById: (id: string) => Promise<Customer.Message>
}

export declare namespace Customer {
  export type Model = CustomerResultModel

  export type Message = {
    success: boolean
    message: string
  }
  export type Param = {
    id?: string
    description: string
    owner: string
    priority: string
  }
}
