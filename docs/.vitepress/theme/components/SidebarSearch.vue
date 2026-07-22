<script setup>
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
</template>

<style scoped>
.sidebar-search {
  width: 100%;
  padding-top: 20px;
  margin-bottom: 6px;
}

.sidebar-search .DocSearch-Button {
  border-color: var(--vp-c-divider);
}

.sidebar-search .DocSearch-Button:hover {
  border-color: var(--vp-c-brand-1);
  background-color: var(--vp-c-bg-soft);
}
</style>