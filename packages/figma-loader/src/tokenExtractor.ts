import { Node, NodeTypes } from './types/figma-ast.types'

export interface TokenOptions {
  themeRegex: RegExp
  node: Node
  groupNodes: Node[]
  allNodes: Node[]
  media: number
}

export abstract class TokenExtractor {
  public name: string

  public theme: string

  public media: number

  protected node: Node

  protected constructor(options: TokenOptions) {
    this.node = options.node

    this.name = options.node.name

    this.media = options.media

    this.theme = options.allNodes[0].name.match(options.themeRegex)?.[0] ?? options.allNodes[0].name
  }
}