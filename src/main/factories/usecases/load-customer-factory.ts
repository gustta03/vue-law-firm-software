export const makeRemoteAddAccount = (): AddAccount =>
  new RemoteAddAccount(m makeAxiosHttpClient())
