export type HttpMethod = 'post' | 'get' | 'put' | 'delete'

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode
  body?: T
}

export type HttpRequest = {
  url: string
  method: HttpMethod
  body?: any
  headers?: any
}

export enum HttpStatusCode {
  ok = 200,
  created = 201,
  badRequest = 400,
  serverError = 500
}

export interface HttpClient<R = any> {
  request(data: HttpRequest): Promise<HttpResponse<R>>
}
