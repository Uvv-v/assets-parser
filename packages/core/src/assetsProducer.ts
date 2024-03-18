import * as fs from 'fs'
import { AssetsConfig } from './types.js'
import { AssetsGenerator } from './generators'

export type AssetsProducerOptions = {
  path: string
  config: AssetsConfig
  generators: (typeof AssetsGenerator)[]
}

export class AssetsProducer {
  private readonly path: string
  private readonly config: AssetsConfig
  private readonly generators: AssetsGenerator[]

  public constructor(options: AssetsProducerOptions) {
    this.path = options.path
    this.config = options.config
    this.generators = options.generators
      .map((generator) => Reflect.construct(generator, [{ path: options.path }]))
  }

  public generate() {
    this.clearDist()

    this.generators.forEach((generator) => {
      generator.generate(this.config)
    })
  }

  private clearDist() {
    fs.rmSync(this.path, { recursive: true, force: true })
    fs.mkdirSync(this.path)
  }
}
