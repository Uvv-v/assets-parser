import { defineConfig } from 'vitepress'
import { en } from './en'

export default defineConfig({
  title: "Themes Assistant",

  themeConfig: {
    search: {
      provider: 'local',
    },
  },

  markdown: {
  },

  locales: {
    root: {
      label: 'English',
      ...en,
    },
  },
})
