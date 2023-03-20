export interface IPreserver {
  prepare(text: string): string

  restore(text: string): string
}
