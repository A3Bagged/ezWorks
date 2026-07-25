<script setup>
import { ref, onMounted, computed } from 'vue'

const props = defineProps({
  visibleRows: { type: Number, default: 6 }
})

const scrollEl = ref(null)
const expanded = ref(false)
const isOverflowing = ref(false)
const hiddenCount = ref(0)
const collapsedHeight = ref(null)

onMounted(() => {
  const rows = scrollEl.value.querySelectorAll('tbody tr')
  if (rows.length > props.visibleRows) {
    isOverflowing.value = true
    hiddenCount.value = rows.length - props.visibleRows
    const cutoffRow = rows[props.visibleRows - 1]
    collapsedHeight.value = cutoffRow.offsetTop + cutoffRow.offsetHeight
  }
})

const scrollStyle = computed(() => ({
  maxHeight: expanded.value || !isOverflowing.value ? 'none' : `${collapsedHeight.value}px`
}))

const buttonLabel = computed(() =>
  expanded.value ? 'Show less' : `Show ${hiddenCount.value} more item${hiddenCount.value === 1 ? '' : 's'}`
)
</script>

<template>
  <div class="bom-table bom-collapsable">
    <div ref="scrollEl" class="bom-table-scroll" :class="{ expanded }" :style="scrollStyle">
      <slot />
    </div>
    <button v-if="isOverflowing" class="bom-toggle-btn" type="button" @click="expanded = !expanded">
      {{ buttonLabel }}
    </button>
  </div>
</template>