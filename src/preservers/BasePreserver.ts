import { IPreserver } from './IPreserver'

export abstract class BasePreserver implements IPreserver {
  protected preserves: string[] = []

  public abstract prepare(text: string): string

  public abstract restore(text: string): string
}
