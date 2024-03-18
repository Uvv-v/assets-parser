import * as path from 'node:path'
import * as fs from 'fs'
import { AssetsConfig, ThemeConfig, TokenVariableConfig } from '../types'
import { AssetsGenerator, AssetsGeneratorOptions } from './assetsGenerator'

export class CssGenerator extends AssetsGenerator {
  constructor(options: AssetsGeneratorOptions) {
    super(options)

    this.path = path.join(options.path, 'css')
  }

  generate(config: AssetsConfig) {
    fs.mkdirSync(this.path)

    config.themes.forEach((theme) => {
      this.generateTheme(theme)
    })
  }

  generateTheme(theme: ThemeConfig) {
    let output: string = theme.putAtRoot ? ':root {\n': `.${theme.name} {\n`
    const mediaOutputs: Record<string, string> = {}

    theme.tokens.forEach((token, tokenIndex) => {
      if (tokenIndex > 0) output += '\n'

      output += this.getCssByVariables(token.name, token.variables)
        .replace(/^(.+)/gm, '\t$1')

      output = output.replace(/\n$/, '')

      if (token.medias) {
        output += '\n'

        Object.entries(token.medias).forEach(([mediaName, media], index, array) => {
          if (!mediaOutputs[mediaName]) {
            mediaOutputs[mediaName] = `@media screen and (min-width: ${mediaName}px) {\n`
          }

          mediaOutputs[mediaName] += this.getCssByVariables(token.name, media)
            .replace(/^(.+)/gm, '\t$1')

          if (index < array.length - 1) {
            mediaOutputs[mediaName] += '\n'
          }
        })
      }
    })

    output += '\n' + Object
      .values(mediaOutputs)
      .map((mediaOutput) => mediaOutput.replace(/^(.+)/gm, '\t$1') + '\t}\n')
      .join('\n')

    output += '}\n'

    fs.writeFileSync(path.join(this.path, theme.name) + '.css', output)
  }

  getCssByVariables(tokenName: string, variables: TokenVariableConfig[]) {
    let output = ''

    variables.forEach((variable, variableIndex) => {
      if (variable.value) {
        output += `--${tokenName}-${variable.name}: ${variable.value};\n`
      } else if (variable.properties) {
        if (variableIndex > 0) output += '\n'

        Object.entries(variable.properties).forEach(([propertyName, propertyValue]) => {
          output += `--${tokenName}-${variable.name}-${propertyName}: ${propertyValue};\n`
        })
      }
    })

    return output
  }
}
