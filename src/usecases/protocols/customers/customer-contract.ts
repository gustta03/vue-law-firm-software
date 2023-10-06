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

export interface SaveCustomer {
  save: (params: Customer.Param) => Promise<Customer.Model>
}

export declare namespace Customer {
  export type Model = CustomerResultModel

  export type Message = {
    success: boolean
    message: string
  }

  export type Param = {
    _id?: string
    name: string
    phone: string
    email: string
    address: string
    cpfCnpj: string
    dateOfBirth: string
    gender: string
    maritalStatus: string
    profession: string
    nationality: string
    observations: string
  }
}
