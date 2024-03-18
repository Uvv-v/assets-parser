import * as path from 'node:path'
import * as fs from 'node:fs'
import { AssetsConfig } from '../types'
import { AssetsGenerator, AssetsGeneratorOptions } from './assetsGenerator'

type GetUniqueVariablesResult = Record<string, {
  list: string[]
  maps: Record<string, string[]>
}>

export class ScssGenerator extends AssetsGenerator {
  constructor(options: AssetsGeneratorOptions) {
    super(options)

    this.path = path.join(options.path, 'scss')
  }

  generate(config: AssetsConfig) {
    fs.mkdirSync(this.path)

    const tokens = this.getUniqueVariables(config)
    Object.entries(tokens).forEach(([name, value]) => {
      this.generateScss(name, value)
    })
  }

  generateScss(name: string, input: GetUniqueVariablesResult[string]){
    let result = ''

    input.list.forEach((value) => {
      result += `$${name}-${value}: var(--${name}-${value});\n`
    })

    const mapEntries = Object.entries(input.maps)

    if (mapEntries.length) {
      result += `\n$${name}: (\n`
      mapEntries.forEach(([mapName, mapValue]) => {
        result += `\t${mapName}: (\n`
        mapValue.forEach((value) => {
          result += `\t\t${value}: var(${name}-${mapName}-${value}),\n`
        })
        result += '\t),\n'
      })
      result += ');\n'
    }

    fs.writeFileSync(path.join(this.path, name) + '.scss', result)
  }

  private getUniqueVariables(config: AssetsConfig) {
    const result: GetUniqueVariablesResult = {}

    config.themes.forEach((theme) => {
      theme.tokens.forEach((token) => {
        if (!result[token.name]) result[token.name] = {
          list: [],
          maps: {},
        }

        token.variables.forEach((variable) => {
          if (variable.value) {
            const value = variable.name
            if (!result[token.name].list.includes(value)) result[token.name].list.push(value)
            return
          }

          if (variable.properties) {
            Object.keys(variable.properties).forEach((propKey) => {
              const value = variable.name + '-' + propKey
              if (!result[token.name].list.includes(value)) result[token.name].list.push(value)
              if (!result[token.name].maps[variable.name]) result[token.name].maps[variable.name] = []
              if (!result[token.name].maps[variable.name].includes(propKey)) {
                result[token.name].maps[variable.name].push(propKey)
              }
            })
          }
        })
      })
    })

    return result
  }
}
