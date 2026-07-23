<script setup>
import { withBase } from 'vitepress'
import { House } from '@lucide/vue'

function openSearch() {
  const navbarSearch = document.querySelector(
    '.VPNavBarSearch #local-search .DocSearch-Button'
  )

  if (navbarSearch instanceof HTMLButtonElement) {
    navbarSearch.click()
  }
}
</script>

<template>
  <div class="sidebar-tools">
    <a
      class="sidebar-home"
      :href="withBase('/')"
      aria-label="Go to homepage"
      title="Home"
    >
      <House
        :size="18"
        :stroke-width="2"
        aria-hidden="true"
      />
    </a>

    <div class="sidebar-search">
      <button
        type="button"
        class="DocSearch DocSearch-Button"
        aria-label="Search documentation"
        @click="openSearch"
      >
        <span class="DocSearch-Button-Container">
          <span class="vp-icon DocSearch-Search-Icon"></span>
          <span class="DocSearch-Button-Placeholder">Search</span>
        </span>

        <span class="DocSearch-Button-Keys">
          <kbd class="DocSearch-Button-Key"></kbd>
          <kbd class="DocSearch-Button-Key">K</kbd>
        </span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.sidebar-tools {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding-top: 20px;
  margin-bottom: 6px;
}

.sidebar-search {
  flex: 1;
  min-width: 0;
}

.sidebar-search .DocSearch-Button {
  width: 100%;
  border-color: var(--vp-c-divider);
}

.sidebar-search .DocSearch-Button:hover {
  border-color: var(--vp-c-brand-1);
  background-color: var(--vp-c-bg-soft);
}

.sidebar-home {
  display: none;
}

@media (max-width: 959px) {
  .sidebar-search {
    flex: 0 0 40px;
  }

  .sidebar-search .DocSearch-Button {
    justify-content: center;
    width: 40px;
    height: 40px;
    padding: 0;
    border-color: transparent;
    border-radius: 50%;
    background-color: transparent;
  }

  .sidebar-search .DocSearch-Button-Container {
    justify-content: center;
  }

  .sidebar-search .DocSearch-Button-Placeholder,
  .sidebar-search .DocSearch-Button-Keys {
    display: none;
  }

  .sidebar-home {
    display: inline-flex;
    flex: 0 0 40px;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border: 1px solid transparent;
    border-radius: 50%;
    color: var(--vp-c-text-1);
    background-color: transparent;
    transition:
      color 0.2s,
      border-color 0.2s,
      background-color 0.2s;
  }

  .sidebar-search .DocSearch-Button:hover,
  .sidebar-home:hover {
    color: var(--vp-c-text-1);
    border-color: transparent;
    background-color: var(--vp-c-bg-soft);
  }
}
</style>
