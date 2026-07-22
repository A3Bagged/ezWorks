<script setup>
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { data as githubRelease } from './HeroBadges.data.js'
import { Rocket, Star, MoveRight} from '@lucide/vue';
 
const { frontmatter } = useData()

const badges = computed(() => frontmatter.value.heroBadges)

const fallbackVersion = 'Version 0.1.0'
const fallbackReleaseUrl = 'https://github.com/A3Bagged/K1V/releases'

const displayedVersion = computed(() => {
  const version = githubRelease?.version

  if (!version) {
    return fallbackVersion
  }

  return `Version ${version.replace(/^v/i, '')}`
})

const displayedVersionLink = computed(() => {
  return githubRelease?.releaseUrl || fallbackReleaseUrl
})

function isExternal(link) {
  return typeof link === 'string' && /^https?:\/\//.test(link)
}

function resolveLink(link) {
  if (typeof link !== 'string' || !link) {
    return '#'
  }

  return isExternal(link) ? link : withBase(link)
}
</script>

<template>
  <div v-if="badges" class="hero-badges">
    <span class="hero-badge">
        <Star
            class="hero-badge__icon--featured"
            :size="20"
            aria-hidden="true"
        />

        {{ badges.featuredText }}
    </span>

    <a
      class="hero-badge hero-badge--version"
      :href="resolveLink(displayedVersionLink)"
      :target="isExternal(displayedVersionLink) ? '_blank' : undefined"
      :rel="isExternal(displayedVersionLink)
        ? 'noreferrer noopener'
        : undefined"
    >
    <Rocket
        class="hero-badge__icon--version"
        :size="20"
        aria-hidden="true"
    />
      {{ displayedVersion }}
      <span aria-hidden="true"><MoveRight /></span>
    </a>
  </div>
</template>

<style scoped>
.hero-badges {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 4px 10px;
  border: 1px solid transparent;
  border-radius: 6px;
  background-color: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  font-size: 14px;
  font-weight: 600;
  line-height: 24px;
  text-decoration: none;
  white-space: nowrap;
  transition:
    color 0.25s,
    border-color 0.25s,
    background-color 0.25s;
}

a.hero-badge:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  background-color: var(--vp-c-brand-soft);
}

.hero-badge--version {
  color: var(--nav-status-new-color);
}

a.hero-badge--version:hover {
  border-color: var(--nav-status-new-color);
  color: var(--nav-status-new-color);
  background-color: color-mix(
    in srgb,
    var(--nav-status-new-color) 14%,
    transparent
  );
}

@media (min-width: 960px) {
  .hero-badges {
    justify-content: flex-start;
  }
}
</style>
