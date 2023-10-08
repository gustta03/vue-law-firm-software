export type InvolvedParty = {
  name: string
  _id: string
}

export type Case = {
  _id: string
  title: string
  customer: string
  customerId: string
  awarded_amount: number
  involved_parties: InvolvedParty[]
  status: string
  owner: string
  protocol: string
  casedata: string
  event: any[]
  documents: any[]
  __v: number
}
