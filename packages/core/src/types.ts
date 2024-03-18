export type TokenVariableConfig = {
  name: string
} & (
  | {
  value: string
  properties?: never
}
  | {
  value?: never
  properties: Record<string, string>
}
  )

export type TokenConfig = {
  name: string
  variables: TokenVariableConfig[]
  medias?: Record<string, TokenVariableConfig[]>
}

export type ThemeConfig = {
  name: string
  tokens: TokenConfig[]
  putAtRoot?: boolean
}

export type AssetsConfig = {
  themes: ThemeConfig[]
}
