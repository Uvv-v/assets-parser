export interface IVariable {
  name: string,
  media?: number,
}

export interface ISingleVariable extends IVariable {
  value: string,
  props?: never,
}

export interface IMultiVariable extends IVariable {
  props: { name: string, value: string }[],
  value?: never,
}

export interface ITheme {
  name: string,
  variables: (ISingleVariable | IMultiVariable)[],
}

export interface IConfiguration {
  themes: ITheme[],
}

const tempTheme: ITheme = {
  name: 'default',
  variables: [
    {
      name: 'color',
      value: '123',
    },
  ],
}
