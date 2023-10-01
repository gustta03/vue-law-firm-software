type InvolvedParty = {
  name: string
}

type Event = {
  title: string
  owner: string
  start_date: string
  end_date: string
  createdAt: string
}

export type CaseModel = {
  title: string
  customer: string
  customerId: string
  awarded_amount: number
  involved_parties: InvolvedParty[]
  status: string
  owner: string
  protocol: string
  casedata: string
  event: Event[]
  documents: any[]
}

