export type Customer = {
  _id: string
  name: string
  phone: string
  email: string
  address: string
  cpfCnpj: string
  dateOfBirth: string
  gender: 'Masculino' | 'Ferminino' | 'Outro'
  maritalStatus: 'Solteiro' | 'Casada' | 'Dirvociado'
  profession: string
  nationality: string
  observations: string
  documents: any[]
}
