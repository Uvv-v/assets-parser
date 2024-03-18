import { Node } from './types/figma-ast.types'
import { FigmaFile } from './types/figma-api.types'
import { COLOR_CODE, writeAny } from 'logger'

const treeWalk = (node: Node, branch: boolean[] = [], last = false) => {
  const prefix: string = last ? '└─ ' : '├─ '

  if (branch.length) {
    let spacesString = ''
    branch.forEach((lv, index) => {
      if (index) spacesString += lv ? '   ' : '│  '
    })
    writeAny(spacesString + prefix, COLOR_CODE.ORANGE)
  }
  const color = branch.length === 1 ? COLOR_CODE.RED : COLOR_CODE.BLUE
  writeAny(node.name + '\n', color)

  if ('children' in node) {
    node.children.map((value, index, array) => {
      treeWalk(value, [...branch, last], index === array.length - 1)
    })
  }
}

export const extractTokens = (file: FigmaFile, themeRegex: RegExp) => {
  const { document } = file

  const pages = document.children
    .filter((page) => page.name.match(themeRegex))

  pages.forEach((page) => treeWalk(page))

  return '{}'
}
