import { AssetsConfig } from '../types'

export type AssetsGeneratorOptions = {
  path: string
}

export abstract class AssetsGenerator {
  protected path: string

  protected constructor(options: AssetsGeneratorOptions) {
    this.path = options.path
  }

  public abstract generate(config: AssetsConfig): void
}
