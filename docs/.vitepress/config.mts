import { defineConfig } from '@lando/vitepress-theme-default-plus/config'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "EZ-Works",
  description: "3D printing documentation",
  lang: 'en-US',
  base: '/',

  contributors: false,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
