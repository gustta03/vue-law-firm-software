import { LocalStorageAdapter } from '../../../infra/cache/local-storage'

export const makeCacheStorage = () => new LocalStorageAdapter()
