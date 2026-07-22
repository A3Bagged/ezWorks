<script setup>
const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  columns: {
    type: [Number, String],
    default: 2,
    validator: (value) => [1, 2, '1', '2'].includes(value)
  },
  imageWidth: {
    type: String,
    default: '92px'
  }
})
</script>

<template>
  <div
    class="part-list"
    :style="{
      '--part-list-columns': Number(props.columns),
      '--part-list-image-width': props.imageWidth
    }"
  >
    <article
      v-for="(item, index) in props.items"
      :key="item.id ?? item.title ?? index"
      class="part-list__item"
    >
      <div class="part-list__media">
        <img
          class="part-list__image"
          :src="item.image"
          :alt="item.alt ?? item.title ?? ''"
          loading="lazy"
        >
      </div>

      <div class="part-list__content">
        <h3 class="part-list__title">
          {{ item.title }}
        </h3>

        <p v-if="item.description" class="part-list__description">
          {{ item.description }}
        </p>

        <p v-if="item.spec" class="part-list__spec">
          {{ item.spec }}
        </p>
      </div>
    </article>
  </div>
</template>

<style scoped>
.part-list {
  display: grid;
  grid-template-columns: repeat(
    var(--part-list-columns),
    minmax(0, 1fr)
  );
  column-gap: 32px;
  margin: 24px 0;
}

.part-list__item {
  display: grid;
  grid-template-columns: minmax(64px, var(--part-list-image-width)) minmax(0, 1fr);
  align-items: center;
  gap: 18px;

  min-width: 0;
  padding: 16px 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.part-list__media {
  display: grid;
  place-items: center;

  width: 100%;
  aspect-ratio: 1;
}

.part-list__image {
  display: block;
  width: 100%;
  height: 100%;
  max-width: 100%;
  margin: 0;
  object-fit: contain;
  object-position: center;
}

.part-list__content {
  min-width: 0;
}

.part-list__title {
  margin: 0 0 4px;
  padding: 0;
  border: 0;
  color: var(--vp-c-text-1);
  font-size: 16px;
  font-weight: 700;
  line-height: 1.35;
}

.part-list__description {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 13px;
  line-height: 1.55;
}

.part-list__spec {
  margin: 6px 0 0;
  color: var(--vp-c-text-3);
  font-size: 11px;
  line-height: 1.4;
}

@media (max-width: 760px) {
  .part-list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 420px) {
  .part-list__item {
    grid-template-columns: 72px minmax(0, 1fr);
    gap: 14px;
  }
}
</style>
