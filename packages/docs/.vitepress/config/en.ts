import { defineConfig, type DefaultTheme } from 'vitepress'

export const en = defineConfig({
  lang: 'en-EN',

  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/installation', activeMatch: '/guide/' },
      { text: 'API', link: '/api/assets-producer', activeMatch: '/api/' },
      { text: 'Examples', link: '/examples/default' },
    ],

    sidebar: {
      '/guide/': { base: '/guide/', items: getGuideSidebarItems() },
      '/api/': { base: '/api/', items: getApiSidebarItems() },
      '/examples/': { base: '/examples/', items: getExamplesSidebarItems() },
    },
  },
})

function getGuideSidebarItems(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Introduction',
      collapsed: false,
      items: [
        { text: 'Installation', link: 'installation' },
        { text: 'Usage', link: 'usage' },
      ],
    },
  ]
}

function getApiSidebarItems(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'API',
      collapsed: false,
      items: [
        { text: 'AssetsProducer', link: 'assets-producer' },
      ],
    },
  ]
}

function getExamplesSidebarItems(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Examples',
      collapsed: false,
      items: [
        { text: 'Default', link: 'default' },
      ],
    },
  ]
}
