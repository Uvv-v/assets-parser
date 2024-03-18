import * as util from 'util'
import { COLOR_CODE, LogColor } from './colors'
import { loaderInterval, setLoader, clearLoader } from './loader'

export const writeAny = (data: any, color: LogColor) => {
  process.stdout.write(color)
  process.stdout.write(util.format(data))
  process.stdout.write(COLOR_CODE.RESET)
}

export const writeNumber = (num: number, color: LogColor, floatingLength: number = 2) => {
  const floating = 10 ** floatingLength
  const data = Math.round(num * floating) / floating
  writeAny(data, color)
}

export const log = (data: any, color: LogColor = COLOR_CODE.RESET) => {
  if (loaderInterval) {
    process.stdout.clearLine(0)
    process.stdout.write('\r')
  }
  writeAny(data, color)
  process.stdout.write('\n')
}

export const logPerform = async <T>(
  message: string,
  callback: () => Promise<T>,
  options?: {
    donePostfix?: string,
    color?: LogColor,
  },
): Promise<T> => {
  setLoader(message, COLOR_CODE.PURPLE)

  const startTime = performance.now()
  const res = await callback()
  const execTimeMs = performance.now() - startTime

  let execTimeUnit = 'ms'
  let execTime = execTimeMs

  if (execTimeMs > 60000) {
    execTimeUnit = 'm'
    execTime = execTimeMs / 60000
  } else if (execTimeMs > 1000) {
    execTimeUnit = 's'
    execTime = execTimeMs / 1000
  }

  clearLoader()

  const color = options?.color ?? COLOR_CODE.GREEN
  writeAny(message + (options?.donePostfix ?? ': COMPLETED in '), color)
  writeNumber(execTime, color)
  writeAny(execTimeUnit + '\n', color)

  return res
}
