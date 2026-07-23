import { defineConfig } from 'vitepress'
import discordSmallText from './discord-small-text.mjs'
import container from 'markdown-it-container'

const boxTypes = [
  'box',
  'box-blue',
  'box-brand',
  'box-green',
  'box-red',
  'box-yellow'
]

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'ezWorks',
  description: '3D printing documentation',
  lang: 'en-US',
  // Keep local development at `/`, while GitHub Pages builds at `/ezWorks/`.
  base: process.env.DOCS_BASE || '/',
  // Use each Markdown file's most recent Git commit for its page timestamp.
  lastUpdated: true,
  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: `${process.env.DOCS_BASE || '/'}favicon.svg`
      }
    ]
  ],

  markdown: {
    config(md) {
      // Discord-style small text
      md.use(discordSmallText)

      // Titleless colored boxes
      for (const type of boxTypes) {
        md.use(container, type, {
          render(tokens, index) {
            if (tokens[index].nesting === 1) {
              return `<div class="docs-box docs-${type}">\n`
            }

            return '</div>\n'
          }
        })
      }

      // Responsive image-card grid rendered by ImageCardGrid.vue
      md.use(container, 'card-grid', {
        render(tokens, index) {
          return tokens[index].nesting === 1
            ? '<ImageCardGrid>\n'
            : '</ImageCardGrid>\n'
        }
      })

      // Individual image card with its title supplied after `::: card`
      md.use(container, 'card', {
        render(tokens, index) {
          if (tokens[index].nesting === 1) {
            const title = tokens[index].info
              .trim()
              .replace(/^card\s*/, '')

            const renderedTitle = title
              ? `<figcaption class="image-card__title">${md.utils.escapeHtml(title)}</figcaption>\n`
              : ''

            return [
              '<figure class="image-card">\n',
              renderedTitle,
              '<div class="image-card__body">\n'
            ].join('')
          }

          return '</div>\n</figure>\n'
        }
      })

      // Image card without a visible background or border
      md.use(container, 'card-empty', {
        render(tokens, index) {
          if (tokens[index].nesting === 1) {
            const title = tokens[index].info
              .trim()
              .replace(/^card-empty\s*/, '')

            const renderedTitle = title
              ? `<figcaption class="image-card__title">${md.utils.escapeHtml(title)}</figcaption>\n`
              : ''

            return [
              '<figure class="image-card image-card--empty">\n',
              renderedTitle,
              '<div class="image-card__body">\n'
            ].join('')
          }

          return '</div>\n</figure>\n'
        }
      })

      // Full-width Bill of Materials table wrapper
      md.use(container, 'bom', {
        render(tokens, index) {
          return tokens[index].nesting === 1
            ? '<div class="bom-table">\n'
            : '</div>\n'
        }
      })

    }
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Markdown', link: '/examples/markdown-examples' },
      { text: 'K1V', link: '/k1v/' }
    ],

    sidebar: {
      '/examples/': [
        {
          text: 'Examples',
          items: [
            {
              text: 'Markdown Examples',
              link: '/examples/markdown-examples'
            },
            {
              text: 'Custom Markdown',
              link: '/examples/custom-markdown'
            }
          ]
        }
      ],

      '/k1v/': [
        {
          text: 'K1V Gantry',
          items: [
            {
              text: 'Overview',
              link: '/k1v/'
            },
            {
              text: 'Getting Started',
              link: '/k1v/getting-started'
            },
            {
              text: 'Bill of Materials',
              link: '/k1v/bill-of-materials'
            },
            {
              text: 'Preparation',
              link: '/k1v/preparation'
            },
            {
              text: 'Printing',
              link: '/k1v/printing'
            }
          ]
        },
        {
          text: 'Assembly',
          items: [
            {
              text: 'Extrusion Frame',
              link: '/k1v/assembly/extrusion-frame'
            },
            {
              text: 'Front Idlers',
              link: '/k1v/assembly/front-idlers'
            },
            {
              text: 'XY-Joints',
              link: '/k1v/assembly/xy-joints'
            }
          ]
        }
      ]
    },

    footer: {
      message: 'Released under the <a href="https://github.com/vuejs/vitepress/blob/main/LICENSE">MIT License</a>.',
      copyright: 'Copyright © 2019-present <a href="https://github.com/a3bagged">A3 Bagged</a>'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/A3Bagged/ezWorks' },
      { icon: 'discord', link: 'https://discord.gg/cUgSp74aAp' }
    ],

    editLink: {
      pattern: 'https://github.com/A3Bagged/ezWorks/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

    lastUpdated: {
      text: 'Last updated',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short'
      }
    },

    alert: {
      content: 'This documentation is under active development and may change.',
      dismissible: true,
      id: 'ezworks-development-preview-1'
    },

    logo: {
      src: '/vectorlab-mark.svg',
      alt: 'VectorLab logo'
    },

    search: {
      provider: 'local',
      options: {
        disableDetailedView: true
      }
    }
  }
})
