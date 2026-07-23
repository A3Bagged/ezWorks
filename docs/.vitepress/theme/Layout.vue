<script setup>
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import HeroBadges from './components/HeroBadges.vue'
import NavStatusIndicators from './components/NavStatusIndicators.vue'
import SidebarSearch from './components/SidebarSearch.vue'
import ImageLightbox from './components/ImageLightbox.vue'
import SiteAlert from './components/SiteAlert.vue'

const { frontmatter } = useData()
</script>

<template>
  <DefaultTheme.Layout>
    <template #layout-top>
      <NavStatusIndicators />
      <SiteAlert />
    </template>

    <template #home-hero-info-before>
      <HeroBadges v-if="frontmatter.heroBadges" />
    </template>

    <template #sidebar-nav-before>
      <SidebarSearch />
    </template>
  </DefaultTheme.Layout>

  <ImageLightbox />
</template>
