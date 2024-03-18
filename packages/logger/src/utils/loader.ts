import { COLOR_CODE, LogColor } from './colors';
import { writeAny } from './log'

export let loaderInterval: NodeJS.Timeout
export const setLoader = (text: string, color: LogColor = COLOR_CODE.RESET, ms = 100) => {
  const postfixVariants = ["⠙", "⠘", "⠰", "⠴", "⠤", "⠦", "⠆", "⠃", "⠋", "⠉"]
  let postfixVariant = 0

  clearInterval(loaderInterval)
  loaderInterval = setInterval(() => {
    writeAny(`\r${text} ${postfixVariants[postfixVariant]}`, color)
    postfixVariant = (postfixVariant + 1) % postfixVariants.length
  }, ms)

  return loaderInterval
}

export const clearLoader = () => {
  process.stdout.clearLine(0)
  process.stdout.write('\r')
  clearInterval(loaderInterval)
}
