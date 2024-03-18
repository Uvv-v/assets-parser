# Usage

```ts
const config: AssetsConfig = {
  themes: [{
    name: 'default',
    tokens: [
      {
        name: 'color',
        variables: [
          { name: 'primary', value: '#3177ff' },
          { name: 'secondary', value: '#31ffad' },
        ],
      },
      {
        name: 'text',
        variables: [
          {
            name: 'regular',
            properties: {
              'font-size': '14px',
              'font-weight': 'normal',
            },
          },
          {
            name: 'bold',
            properties: {
              'font-size': '18px',
              'font-weight': 'bold',
            },
          },
        ],
      },
    ],
  }],
}

const producer = new AssetsProducer({
  path: 'dist',
  generators: [CssGenerator, ScssGenerator],
  config,
})

producer.generate()
```

