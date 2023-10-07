import { makeCacheStorage } from '../../main/factories/cache/local-storage-factory'

const cache = makeCacheStorage()

export function userIsLogged(): boolean {
  const hasToken = cache.get('admin:accessToken')
  return !!hasToken
}
