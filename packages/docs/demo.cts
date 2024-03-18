import { AssetsConfig, AssetsProducer, CssGenerator, ScssGenerator } from 'core'

const config: AssetsConfig = {
  themes: [
    {
      putAtRoot: true,
      name: 'default',
      tokens: [
        {
          name: 'color',
          variables: [
            { name: 'primary', value: '#3177FF' },
            { name: 'secondary', value: '#31FFAD' },
          ],
          medias: {
            1060: [
              { name: 'primary', value: '#3177FF' },
            ],
            360: [
              { name: 'primary', value: '#3177FF' },
              { name: 'secondary', value: '#3177FF' },
            ],
          },
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
          medias: {
            360: [
              {
                name: 'regular',
                properties: {
                  'font-size': '10px',
                  'font-weight': 'normal',
                },
              },
              {
                name: 'bold',
                properties: {
                  'font-size': '18px',
                  'font-weight': 'bold',
                },
              }
            ]
          }
        },
      ],
    },
    {
      name: 'dark',
      tokens: [
        {
          name: 'color',
          variables: [
            { name: 'primary', value: '#ff6831' },
            { name: 'regular', value: '#FFFFFF' },
          ],
        }
      ],
    }
  ]
}

const producer = new AssetsProducer({
  path: 'dist',
  generators: [CssGenerator, ScssGenerator],
  config,
})

producer.generate()
