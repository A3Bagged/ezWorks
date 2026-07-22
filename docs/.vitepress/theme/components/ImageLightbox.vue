<script setup>
import {
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref
} from 'vue'

const isMounted = ref(false)
const isOpen = ref(false)
const imageSource = ref('')
const imageAlt = ref('')
const dialog = ref(null)

let previousBodyOverflow = ''
let previousFocus = null

function openLightbox(image) {
  previousFocus = document.activeElement
  previousBodyOverflow = document.body.style.overflow

  imageSource.value = image.currentSrc || image.src
  imageAlt.value = image.alt || ''
  isOpen.value = true

  document.body.style.overflow = 'hidden'

  nextTick(() => {
    dialog.value?.focus()
  })
}

function closeLightbox() {
  isOpen.value = false
  document.body.style.overflow = previousBodyOverflow
  previousFocus?.focus?.()
}

function handleDocumentClick(event) {
  const image = event.target

  if (!(image instanceof HTMLImageElement)) {
    return
  }

  /*
   * Only images rendered inside Markdown content.
   * Layout images such as the logo and hero are outside .vp-doc.
   */
  if (!image.closest('.vp-doc')) {
    return
  }

  /*
   * Add class="no-lightbox" or data-no-lightbox to an image
   * or one of its parents to disable the lightbox.
   */
  if (image.closest('.no-lightbox, [data-no-lightbox]')) {
    return
  }

  event.preventDefault()
  openLightbox(image)
}

function handleKeydown(event) {
  if (event.key === 'Escape' && isOpen.value) {
    closeLightbox()
  }
}

onMounted(() => {
  isMounted.value = true
  document.addEventListener('click', handleDocumentClick)
  document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = previousBodyOverflow
})
</script>

<template>
  <Teleport v-if="isMounted" to="body">
    <Transition name="image-lightbox">
      <div
        v-if="isOpen"
        ref="dialog"
        class="image-lightbox"
        role="dialog"
        aria-modal="true"
        :aria-label="
          imageAlt
            ? `Enlarged image: ${imageAlt}`
            : 'Enlarged image'
        "
        tabindex="-1"
        @click.self="closeLightbox"
      >
        <button
          class="image-lightbox__close"
          type="button"
          aria-label="Close enlarged image"
          @click="closeLightbox"
        >
          &times;
        </button>

        <figure class="image-lightbox__figure">
          <img
            class="image-lightbox__image"
            :src="imageSource"
            :alt="imageAlt"
            @click.stop
          >

          <figcaption
            v-if="imageAlt"
            class="image-lightbox__caption"
          >
            {{ imageAlt }}
          </figcaption>
        </figure>
      </div>
    </Transition>
  </Teleport>
</template>

<style>
/* Only Markdown-content images receive the zoom cursor. */
.vp-doc img:not(.no-lightbox):not([data-no-lightbox]) {
  cursor: zoom-in;
}

.image-lightbox {
  position: fixed;
  inset: 0;
  z-index: 9999;

  display: grid;
  place-items: center;

  padding: clamp(16px, 4vw, 48px);
  background-color: rgb(0 0 0 / 88%);
  backdrop-filter: blur(8px);
  outline: none;
}

.image-lightbox__figure {
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  justify-items: center;
  gap: 12px;

  max-width: 100%;
  max-height: 100%;
  margin: 0;
}

.image-lightbox__image {
  display: block;

  max-width: calc(100vw - clamp(32px, 8vw, 96px));
  max-height: calc(100vh - 110px);

  object-fit: contain;
  cursor: default;

  border-radius: 6px;
  box-shadow: 0 18px 60px rgb(0 0 0 / 45%);
}

.image-lightbox__caption {
  max-width: min(760px, 90vw);
  color: rgb(255 255 255 / 78%);
  font-size: 14px;
  line-height: 1.5;
  text-align: center;
}

.image-lightbox__close {
  position: fixed;
  top: 18px;
  right: 22px;
  z-index: 1;

  display: grid;
  place-items: center;

  width: 42px;
  height: 42px;
  padding: 0;

  border: 1px solid rgb(255 255 255 / 18%);
  border-radius: 50%;

  background-color: rgb(0 0 0 / 45%);
  color: white;

  font-family: inherit;
  font-size: 30px;
  font-weight: 300;
  line-height: 1;

  cursor: pointer;
  transition:
    border-color 0.2s,
    background-color 0.2s;
}

.image-lightbox__close:hover {
  border-color: rgb(255 255 255 / 45%);
  background-color: rgb(255 255 255 / 15%);
}

.image-lightbox-enter-active,
.image-lightbox-leave-active {
  transition: opacity 0.2s ease;
}

.image-lightbox-enter-from,
.image-lightbox-leave-to {
  opacity: 0;
}
</style>