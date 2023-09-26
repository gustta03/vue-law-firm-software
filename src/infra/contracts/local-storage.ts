export interface LocalStorage {
  set: (key: string, value: string) => void
  get: (key: string) => any
}