<script setup>
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch
} from 'vue'
import { useData, withBase } from 'vitepress'
import { X } from '@lucide/vue'

const { frontmatter, theme } = useData()

const alertElement = ref(null)
const dismissed = ref(false)

let resizeObserver

const alertConfig = computed(() => {
  const pageAlert = frontmatter.value.alert

  if (pageAlert === false) {
    return null
  }

  if (pageAlert === true || pageAlert == null) {
    return theme.value.alert ?? null
  }

  return pageAlert
})

const normalizedAlert = computed(() => {
  if (!alertConfig.value) {
    return null
  }

  if (typeof alertConfig.value === 'string') {
    return {
      content: alertConfig.value,
      dismissible: true,
      id: alertConfig.value
    }
  }

  return {
    content: alertConfig.value.content ?? '',
    dismissible: alertConfig.value.dismissible !== false,
    id: alertConfig.value.id ?? alertConfig.value.content ?? 'site-alert',
    link: alertConfig.value.link,
    linkText: alertConfig.value.linkText
  }
})

const isVisible = computed(() => {
  return Boolean(normalizedAlert.value?.content) && !dismissed.value
})

const resolvedLink = computed(() => {
  const link = normalizedAlert.value?.link

  if (!link) {
    return null
  }

  return /^https?:\/\//.test(link) ? link : withBase(link)
})

const isExternalLink = computed(() => {
  return Boolean(normalizedAlert.value?.link) &&
    /^https?:\/\//.test(normalizedAlert.value.link)
})

function storageKey() {
  return `ezworks-alert-dismissed:${normalizedAlert.value?.id}`
}

function restoreDismissedState() {
  if (!normalizedAlert.value) {
    dismissed.value = false
    return
  }

  try {
    dismissed.value = localStorage.getItem(storageKey()) === 'true'
  } catch {
    dismissed.value = false
  }
}

function dismissAlert() {
  dismissed.value = true

  try {
    localStorage.setItem(storageKey(), 'true')
  } catch {
    // The banner can still be dismissed for this visit if storage is blocked.
  }
}

function updateLayoutHeight() {
  const height = isVisible.value && alertElement.value
    ? alertElement.value.offsetHeight
    : 0

  document.documentElement.style.setProperty(
    '--vp-layout-top-height',
    `${height}px`
  )
}

onMounted(() => {
  restoreDismissedState()

  resizeObserver = new ResizeObserver(updateLayoutHeight)

  if (alertElement.value) {
    resizeObserver.observe(alertElement.value)
  }

  nextTick(updateLayoutHeight)
})

watch(
  () => normalizedAlert.value?.id,
  async () => {
    restoreDismissedState()
    await nextTick()
    updateLayoutHeight()
  }
)

watch(isVisible, async () => {
  await nextTick()
  updateLayoutHeight()
})

watch(alertElement, (element, previousElement) => {
  if (!resizeObserver) {
    return
  }

  if (previousElement) {
    resizeObserver.unobserve(previousElement)
  }

  if (element) {
    resizeObserver.observe(element)
  }
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  document.documentElement.style.removeProperty('--vp-layout-top-height')
})
</script>

<template>
  <aside
    v-if="isVisible"
    ref="alertElement"
    class="site-alert"
    role="status"
    aria-live="polite"
  >
    <div class="site-alert__content">
      <span>{{ normalizedAlert.content }}</span>

      <a
        v-if="resolvedLink && normalizedAlert.linkText"
        class="site-alert__link"
        :href="resolvedLink"
        :target="isExternalLink ? '_blank' : undefined"
        :rel="isExternalLink ? 'noreferrer noopener' : undefined"
      >
        {{ normalizedAlert.linkText }}
      </a>
    </div>

    <button
      v-if="normalizedAlert.dismissible"
      class="site-alert__close"
      type="button"
      aria-label="Dismiss announcement"
      @click="dismissAlert"
    >
      <X :size="18" :stroke-width="2.25" aria-hidden="true" />
    </button>
  </aside>
</template>

<style scoped>
.site-alert {
  position: fixed;
  inset: 0 0 auto;
  z-index: var(--vp-z-index-layout-top);

  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 16px;

  min-height: 44px;
  padding: 10px max(16px, env(safe-area-inset-right)) 10px
    max(16px, env(safe-area-inset-left));

  background: linear-gradient(
    120deg,
    #ffca28 0%,
    #ffb300 55%,
    #ff8f00 100%
  );
  color: #2f3137;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.16);
}

.site-alert__content {
  justify-self: center;
  min-width: 0;
  font-size: 14px;
  font-weight: 650;
  line-height: 1.5;
  text-align: center;
}

.site-alert__link {
  margin-left: 8px;
  color: inherit;
  font-weight: 750;
  text-decoration: underline;
  text-decoration-thickness: 1.5px;
  text-underline-offset: 3px;
}

.site-alert__link:hover {
  color: #111216;
}

.site-alert__close {
  display: grid;
  place-items: center;

  width: 30px;
  height: 30px;
  padding: 0;
  border: 0;
  border-radius: 7px;

  background: transparent;
  color: #2f3137;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.site-alert__close:hover {
  background-color: rgba(17, 18, 22, 0.14);
  color: #111216;
}

.site-alert__close:focus-visible {
  outline: 2px solid #2f3137;
  outline-offset: 2px;
}

@media (max-width: 640px) {
  .site-alert {
    gap: 8px;
    padding-block: 8px;
  }

  .site-alert__content {
    justify-self: start;
    font-size: 13px;
    text-align: left;
  }

  .site-alert__link {
    display: inline-block;
  }
}
</style>
