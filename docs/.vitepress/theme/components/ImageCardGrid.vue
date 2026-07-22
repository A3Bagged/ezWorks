<script setup>
import { withBase } from 'vitepress'

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  minColumnWidth: {
    type: String,
    default: '190px'
  },
  gap: {
    type: String,
    default: '10px'
  }
})
</script>

<template>
  <div
    class="image-card-grid"
    :style="{
      '--image-card-min-width': props.minColumnWidth,
      '--image-card-gap': props.gap
    }"
  >
    <!-- Theme+-style Markdown cards -->
    <slot v-if="$slots.default" />

    <!-- Original array-based cards -->
    <template v-else>
      <figure
        v-for="(item, index) in props.items"
        :key="item.id ?? item.title ?? index"
        class="image-card"
      >
        <figcaption class="image-card__title">
          {{ item.title }}
        </figcaption>

        <div class="image-card__media">
          <img
            class="image-card__image"
            :src="withBase(item.image)"
            :alt="item.alt ?? item.title ?? ''"
            loading="lazy"
          >
        </div>

        <p
          v-if="item.description"
          class="image-card__description"
        >
          {{ item.description }}
        </p>
      </figure>
    </template>
  </div>
</template>

<style>
.image-card-grid {
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(min(100%, var(--image-card-min-width)), 1fr)
  );
  align-items: stretch;
  gap: var(--image-card-gap);
  margin: 24px 0;
}

.image-card {
  display: grid;
  grid-template-rows: auto auto 1fr;
  gap: 14px;

  min-width: 0;
  margin: 0;
  padding: 8px;

  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background-color: var(--vp-c-bg-soft);
}

/*
 * Borderless and background-free Markdown card variant.
 * A transparent border preserves alignment with standard cards.
 */
.image-card.image-card--empty {
  border-color: transparent;
  background-color: transparent;
  box-shadow: none;
}

.image-card__title {
  margin: 0;
  color: var(--vp-c-text-1);
  font-size: 16px;
  font-weight: 700;
  line-height: 1.35;
  text-align: center;
}

/**
 * Original array-based image
 */
.image-card__media {
  width: 100%;
  min-width: 0;
  overflow: hidden;
}

.image-card__image,
.image-card > img {
  display: block;
  width: 100%;
  height: auto;
  margin: 0 auto;
}

/**
 * Markdown-container content
 */
.image-card__body {
  display: contents;
}

/* The first Markdown paragraph contains the image */
.image-card__body > p:first-child {
  display: block;
  width: 100%;
  margin: 0;
  padding: 0;
}

.image-card__body > p:first-child img {
  display: block;
  width: 100%;
  height: auto;
  margin: 0 auto;
}

/* Remaining Markdown paragraphs become the description */
.image-card__body > p:not(:first-child),
.image-card__description {
  align-self: start;

  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.6;
  text-align: center;
}

@media (max-width: 640px) {
  .image-card-grid {
    --image-card-min-width: 100%;
  }
}
</style>
