<script setup>
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  watch
} from 'vue'
import { useData, useRoute, withBase } from 'vitepress'
import { data as pageStatuses } from './NavStatusIndicators.data.mjs'

const { theme } = useData()
const route = useRoute()

let observer
let animationFrame

function collectStatuses(items, statuses) {
  if (!Array.isArray(items)) return

  for (const item of items) {
    if (
      item?.status === 'new' &&
      typeof item.link === 'string' &&
      !/^https?:\/\//.test(item.link)
    ) {
      statuses.set(normalizePath(withBase(item.link)), 'new')
    }

    collectStatuses(item?.items, statuses)
  }
}

function normalizePath(value) {
  const url = new URL(value, window.location.origin)
  let path = url.pathname

  path = path.replace(/\/index\.html$/, '/')
  path = path.replace(/\.html$/, '')

  if (path.length > 1) {
    path = path.replace(/\/$/, '')
  }

  return path
}

const statusesByPath = computed(() => {
  const statuses = new Map()
  const config = theme.value

  for (const page of pageStatuses) {
    statuses.set(normalizePath(withBase(page.url)), page.status)
  }

  collectStatuses(config.nav, statuses)

  if (Array.isArray(config.sidebar)) {
    collectStatuses(config.sidebar, statuses)
  } else if (config.sidebar && typeof config.sidebar === 'object') {
    Object.values(config.sidebar).forEach((items) => {
      collectStatuses(items, statuses)
    })
  }

  return statuses
})

function decorateNavigation() {
  const statuses = statusesByPath.value
  const links = document.querySelectorAll(
    '.VPNavBarMenu a[href], .VPNavScreenMenu a[href], .VPSidebar a[href]'
  )

  for (const link of links) {
    const linkUrl = new URL(link.href, window.location.origin)

    if (linkUrl.origin !== window.location.origin) continue

    const status = statuses.get(normalizePath(linkUrl.href))

    if (status) {
      if (!Object.hasOwn(link.dataset, 'navStatusOriginalLabel')) {
        link.dataset.navStatusOriginalLabel =
          link.getAttribute('aria-label') ?? ''
      }

      link.dataset.navStatus = status
      link.setAttribute('aria-label', `${link.textContent.trim()} — New`)
    } else {
      if (Object.hasOwn(link.dataset, 'navStatusOriginalLabel')) {
        const originalLabel = link.dataset.navStatusOriginalLabel

        if (originalLabel) {
          link.setAttribute('aria-label', originalLabel)
        } else {
          link.removeAttribute('aria-label')
        }

        delete link.dataset.navStatusOriginalLabel
      }

      delete link.dataset.navStatus
    }
  }
}

function scheduleDecoration() {
  cancelAnimationFrame(animationFrame)

  nextTick(() => {
    animationFrame = requestAnimationFrame(decorateNavigation)
  })
}

onMounted(() => {
  scheduleDecoration()

  observer = new MutationObserver(scheduleDecoration)
  observer.observe(document.body, {
    childList: true,
    subtree: true
  })
})

watch(() => route.path, scheduleDecoration)

onBeforeUnmount(() => {
  observer?.disconnect()
  cancelAnimationFrame(animationFrame)
})
</script>

<template>
  <span class="nav-status-indicators" aria-hidden="true" />
</template>

<style>
:root {
  --nav-status-new-color: #1a7f37;
}

.dark {
  --nav-status-new-color: #3fb950;
}

.nav-status-indicators {
  display: none;
}

:where(.VPNavBarMenu, .VPNavScreenMenu)
  a[data-nav-status='new']::after,
.VPSidebar a[data-nav-status='new'] > .text::after {
  content: '';
  display: inline-block;
  width: 1em;
  height: 1em;
  margin-left: 10px;
  background-color: var(--nav-status-new-color);
  vertical-align: -0.15em;

  --nav-status-icon: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22black%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M14%209.536V7a4%204%200%200%201%204-4h1.5a.5.5%200%200%201%20.5.5V5a4%204%200%200%201-4%204%204%204%200%200%200-4%204c0%202%201%203%201%205a5%205%200%200%201-1%203%22%2F%3E%3Cpath%20d%3D%22M4%209a5%205%200%200%201%208%204%205%205%200%200%201-8-4%22%2F%3E%3Cpath%20d%3D%22M5%2021h14%22%2F%3E%3C%2Fsvg%3E");

  -webkit-mask: var(--nav-status-icon) center / contain no-repeat;
  mask: var(--nav-status-icon) center / contain no-repeat;
}
</style>
