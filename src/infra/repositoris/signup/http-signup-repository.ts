import { AccountModel } from '../../../domain/models/account-model'
import { HttpClient } from '../../contracts/http-protocol'
import { SaveUserRepository, SaveUserResult } from '../../contracts/http-save-user'

export class HttpSaveUserRepository implements SaveUserRepository {
  constructor(private apiUrl: string, private readonly httpClient: HttpClient<AccountModel>) {}
  async save(params: SaveUserResult.Param) {
    const HttpResponse = await this.httpClient.request({
      url: `${this.apiUrl}`,
      method: 'post',
      body: params
    })
    return HttpResponse
  }
}
