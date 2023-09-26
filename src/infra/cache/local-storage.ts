import { LocalStorage } from '../contracts/local-storage'

export class LocalStorageAdapter implements LocalStorage {
  set(key: string, value: string): void {
    localStorage.setItem(key, JSON.stringify(value))
  }
  get(key: string) {
    localStorage.getItem(key)
  }
}
