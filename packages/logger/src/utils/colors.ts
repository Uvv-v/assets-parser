export const COLOR_CODE = {
  BLACK: '\x1b[30m',
  RED: '\x1b[31m',
  GREEN: '\x1b[32m',
  ORANGE: '\x1b[33m',
  BLUE: '\x1b[34m',
  PURPLE: '\x1b[35m',
  CYAN: '\x1b[36m',
  WHITE: '\x1b[37m',
  RESET: '\x1b[39m',
} as const

export type LogColor = typeof COLOR_CODE[keyof typeof COLOR_CODE]
