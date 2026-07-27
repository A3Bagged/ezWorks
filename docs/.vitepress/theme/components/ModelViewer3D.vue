<template>
  <ClientOnly>
    <div ref="viewerWrapper" class="viewer">
      <div v-if="!viewerReady" class="viewer-loading">
        Loading 3D viewer…
      </div>

    <model-viewer
      v-else
      ref="viewerElement"
      :src="withBase(model)"
      :alt="alt"
      animation-name="Explode"
      camera-controls
      disable-tap
      touch-action="pan-y"
      reveal="manual"
      loading="lazy"
      :zoom-sensitivity="0.15"
      :environment-image="withBase('/models/environments/HDRI.jpg')"
      tone-mapping="commerce"
      shadow-intensity="0"
      :exposure="1.45"
      :camera-target="defaultCameraTarget"
      :camera-orbit="defaultCameraOrbit"
      :field-of-view="defaultFieldOfView"
      min-camera-orbit="auto auto 60%"
      max-camera-orbit="auto auto 700%"
      min-field-of-view="10deg"
      max-field-of-view="55deg"
      interpolation-decay="120"
      @load="handleLoad"
    >
        <div
          slot="poster"
          class="poster"
          :style="posterStyle"
        >
          <button
            type="button"
            class="load-button"
            @click="loadModel"
          >
            Load 3D model
          </button>
        </div>
      </model-viewer>

      <div v-if="modelLoaded && animationReady" class="viewer-toolbar viewer-toolbar--left">
        <button
          type="button"
          class="toolbar-button"
          :aria-label="isPlaying ? 'Pause animation' : 'Play animation'"
          :title="isPlaying ? 'Pause animation' : 'Play animation'"
          @click="togglePlayback"
        >
          <svg v-if="!isPlaying" aria-hidden="true" viewBox="0 0 24 24">
            <path fill="currentColor" d="M8 5v14l11-7L8 5Z" />
          </svg>

          <svg v-else aria-hidden="true" viewBox="0 0 24 24">
            <path fill="currentColor" d="M7 5h4v14H7V5Zm6 0h4v14h-4V5Z" />
          </svg>

          <span>{{ isPlaying ? 'Pause' : 'Play' }}</span>
        </button>

        <button
          type="button"
          class="toolbar-button"
          title="Reset animation"
          @click="resetAnimation"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M19 20 9 12l10-8v16Z" />
            <path d="M5 19V5" />
          </svg>
          <span>Reset</span>
        </button>
      </div>

      <div v-if="modelLoaded && animationReady" class="viewer-toolbar viewer-toolbar--right">
        <button
          type="button"
          class="toolbar-button toolbar-button--icon"
          aria-label="Reset camera"
          title="Reset camera"
          @click="resetCamera"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 5a7 7 0 1 1-6.32 4H3l3.5-3.5L10 9H7.74A5 5 0 1 0 12 7V5Z"
            />
          </svg>
        </button>

        <button
          type="button"
          class="toolbar-button toolbar-button--icon"
          :aria-label="isFullscreen ? 'Exit fullscreen' : 'Fullscreen'"
          :title="isFullscreen ? 'Exit fullscreen' : 'Fullscreen'"
          @click="toggleFullscreen"
        >
          <svg v-if="!isFullscreen" aria-hidden="true" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M4 4h6v2H6v4H4V4Zm10 0h6v6h-2V6h-4V4ZM4 14h2v4h4v2H4v-6Zm14 0h2v6h-6v-2h4v-4Z"
            />
          </svg>

          <svg v-else aria-hidden="true" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M8 4h2v6H4V8h4V4Zm6 0h2v4h4v2h-6V4ZM4 14h6v6H8v-4H4v-2Zm10 0h6v2h-4v4h-2v-6Z"
            />
          </svg>
        </button>

        <button
          type="button"
          class="toolbar-button toolbar-button--icon"
          aria-label="3D viewer controls"
          title="3D viewer controls"
          :aria-expanded="isHelpOpen"
          aria-controls="viewer-help"
          @click="isHelpOpen = !isHelpOpen"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M11 18h2v2h-2v-2Zm1-16a7 7 0 1 0 0 14A7 7 0 0 0 12 2Zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10Zm0-8a3 3 0 0 0-3 3h2a1 1 0 1 1 1.7.7c-.9.55-1.7 1.2-1.7 2.8V13h2v-.4c0-.75.25-1 .95-1.45A3 3 0 0 0 12 6Z"
            />
          </svg>
        </button>
      </div>

      <div
        v-if="modelLoaded && animationReady && isHelpOpen"
        id="viewer-help"
        class="viewer-help"
        role="dialog"
        aria-label="3D viewer controls"
      >
        <div class="viewer-help__header">
          <div class="viewer-help__title">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>

            <span>Viewer Controls</span>
          </div>

          <button
            class="viewer-help__close"
            @click="isHelpOpen = false"
            title="Close"
          >
            ×
          </button>
        </div>

        <dl class="viewer-help__list">
          <div>
            <dt>Rotate</dt>
            <dd>Left-drag or drag with one finger</dd>
          </div>

          <div>
            <dt>Pan</dt>
            <dd>Right-drag or drag with two fingers</dd>
          </div>

          <div>
            <dt>Zoom</dt>
            <dd>Mouse wheel or pinch</dd>
          </div>
        </dl>
      </div>

      <div v-if="modelLoaded && animationReady" class="explosion-control">
        <span class="explosion-label">Assembled</span>

        <input
          v-model.number="explosion"
          class="explosion-slider"
          type="range"
          min="0"
          max="100"
          step="0.1"
          aria-label="Explosion amount"
          :style="sliderStyle"
          @input="handleSliderInput"
        >

        <span class="explosion-label">Exploded</span>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref
} from 'vue'

import { withBase } from 'vitepress'

const props = defineProps({
  model: {
    type: String,
    required: true
  },

  poster: {
    type: String,
    default: ''
  },

  alt: {
    type: String,
    default: 'Interactive 3D model'
  },

  defaultCameraOrbit: {
    type: String,
    default: '45deg 70deg auto'
  },

  defaultCameraTarget: {
    type: String,
    default: 'auto auto auto'
  },

  defaultFieldOfView: {
    type: String,
    default: '30deg'
  }
})

const viewerReady = ref(false)
const modelLoaded = ref(false)
const animationReady = ref(false)
const viewerElement = ref(null)
const viewerWrapper = ref(null)

const explosion = ref(0)
const isPlaying = ref(false)
const isFullscreen = ref(false)
const isHelpOpen = ref(false)

let direction = 1
let animationFrameId = null
let lastFrameTime = null

let waitTimerId = null
let isWaiting = false
let waitStartedAt = 0
let waitRemaining = 2000

const posterStyle = computed(() => {
  if (!props.poster) return {}

  return {
    backgroundImage: `url("${withBase(props.poster)}")`
  }
})

const sliderStyle = computed(() => ({
  '--slider-progress': `${explosion.value}%`
}))

onMounted(async () => {
  try {
    await import('@google/model-viewer')
    viewerReady.value = true
    document.addEventListener('fullscreenchange', handleFullscreenChange)
  } catch (error) {
    console.error('Failed to load model-viewer:', error)
  }
})

onBeforeUnmount(() => {
  stopPlayback()
  document.removeEventListener('fullscreenchange', handleFullscreenChange)
})

function loadModel() {
  viewerElement.value?.dismissPoster()
}

function handleLoad() {
  const viewer = viewerElement.value
  if (!viewer) return

  modelLoaded.value = true

  stopPlayback()

  viewer.pause()
  viewer.currentTime = 0
  explosion.value = 0
  direction = 1

  animationReady.value =
    Array.isArray(viewer.availableAnimations) &&
    viewer.availableAnimations.length > 0
}

function seekToSliderPosition() {
  const viewer = viewerElement.value
  if (!viewer || !viewer.duration) return

  viewer.pause()

  const safeDuration = Math.max(viewer.duration - 0.001, 0)
  viewer.currentTime = safeDuration * (explosion.value / 100)
}

function handleSliderInput() {
  pausePlayback()
  seekToSliderPosition()

  if (explosion.value >= 99.9) {
    direction = -1
  } else if (explosion.value <= 0.1) {
    direction = 1
  }
}

function togglePlayback() {
  if (isPlaying.value) {
    pausePlayback()
  } else {
    startPlayback()
  }
}

function startPlayback() {
  const viewer = viewerElement.value
  if (!viewer || !viewer.duration || !animationReady.value) return

  if (explosion.value >= 99.9) {
    direction = -1
  } else if (explosion.value <= 0.1) {
    direction = 1
  }

  isPlaying.value = true

  if (isWaiting && waitRemaining > 0) {
    beginEndpointWait(waitRemaining)
    return
  }

  lastFrameTime = null
  animationFrameId = requestAnimationFrame(animationStep)
}

function pausePlayback() {
  if (!isPlaying.value) return

  isPlaying.value = false

  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }

  if (isWaiting && waitTimerId !== null) {
    const elapsed = performance.now() - waitStartedAt
    waitRemaining = Math.max(waitRemaining - elapsed, 0)

    clearTimeout(waitTimerId)
    waitTimerId = null
  }

  viewerElement.value?.pause()
}

function stopPlayback() {
  isPlaying.value = false

  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }

  if (waitTimerId !== null) {
    clearTimeout(waitTimerId)
    waitTimerId = null
  }

  isWaiting = false
  waitRemaining = 2000
  lastFrameTime = null
}

function animationStep(timestamp) {
  if (!isPlaying.value) return

  const viewer = viewerElement.value
  if (!viewer || !viewer.duration) {
    pausePlayback()
    return
  }

  if (lastFrameTime === null) {
    lastFrameTime = timestamp
  }

  const elapsedSeconds = (timestamp - lastFrameTime) / 1000
  lastFrameTime = timestamp

  const progressPerSecond = 100 / viewer.duration
  let nextProgress =
    explosion.value +
    elapsedSeconds * progressPerSecond * direction

  if (direction > 0 && nextProgress >= 100) {
    explosion.value = 100
    seekToSliderPosition()

    direction = -1
    beginEndpointWait(2000)
    return
  }

  if (direction < 0 && nextProgress <= 0) {
    explosion.value = 0
    seekToSliderPosition()

    direction = 1
    beginEndpointWait(2000)
    return
  }

  explosion.value = nextProgress
  seekToSliderPosition()

  animationFrameId = requestAnimationFrame(animationStep)
}

function beginEndpointWait(milliseconds) {
  if (!isPlaying.value) return

  isWaiting = true
  waitRemaining = milliseconds
  waitStartedAt = performance.now()
  lastFrameTime = null

  waitTimerId = window.setTimeout(() => {
    waitTimerId = null
    isWaiting = false
    waitRemaining = 2000

    if (!isPlaying.value) return

    animationFrameId = requestAnimationFrame(animationStep)
  }, milliseconds)
}

function resetAnimation() {
  const viewer = viewerElement.value
  if (!viewer) return

  stopPlayback()

  viewer.pause()
  viewer.currentTime = 0

  explosion.value = 0
  direction = 1
  isWaiting = false
  waitRemaining = 2000
}

function resetCamera() {
  const viewer = viewerElement.value
  if (!viewer) return

  viewer.cameraOrbit = props.defaultCameraOrbit
  viewer.cameraTarget = props.defaultCameraTarget
  viewer.fieldOfView = props.defaultFieldOfView
  viewer.resetTurntableRotation?.()
}

async function toggleFullscreen() {
  const wrapper = viewerWrapper.value
  if (!wrapper) return

  try {
    if (!document.fullscreenElement) {
      await wrapper.requestFullscreen()
    } else {
      await document.exitFullscreen()
    }
  } catch (error) {
    console.error('Fullscreen request failed:', error)
  }
}

function handleFullscreenChange() {
  isFullscreen.value =
    document.fullscreenElement === viewerWrapper.value

  isHelpOpen.value = false
}
</script>

<style scoped>
.viewer {
  position: relative;
  width: 100%;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  margin-block: 1.75rem;}

model-viewer {
  display: block;
  width: 100%;
  height: 520px;
}

.viewer-loading {
  display: grid;
  min-height: 520px;
  place-items: center;
  color: var(--vp-c-text-2);
}


/* Poster shown before the GLB is downloaded */

.poster {
  position: absolute;
  inset: 0;

  display: grid;
  place-items: center;

  background-color: var(--vp-c-bg-soft);
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}

.load-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 10px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;

  background: color-mix(
    in srgb,
    var(--vp-c-bg) 92%,
    transparent
  );

  color: var(--vp-c-text-1);
  font: inherit;
  font-size: 14px;
  font-weight: 600;

  cursor: pointer;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 14px rgb(0 0 0 / 25%);
}

.load-button:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.load-button:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 3px;
}

/* Top-right viewer controls */

.viewer-toolbar {
  position: absolute;
  top: 14px;

  display: flex;
  flex-wrap: wrap;
  gap: 6px;

  z-index: 5;
}

.viewer-toolbar--left {
  left: 14px;
  justify-content: flex-start;
}

.viewer-toolbar--right {
  right: 14px;
  justify-content: flex-end;
}

.toolbar-button {
  display: inline-flex;
  min-height: 36px;
  align-items: center;
  justify-content: center;
  gap: 7px;

  padding: 7px 11px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;

  background: color-mix(
    in srgb,
    var(--vp-c-bg) 90%,
    transparent
  );

  color: var(--vp-c-text-1);
  font: inherit;
  font-size: 13px;
  font-weight: 500;

  cursor: pointer;
  backdrop-filter: blur(8px);
}

.toolbar-button svg {
  width: 17px;
  height: 17px;
  flex: 0 0 auto;
}

.toolbar-button--icon {
  width: 36px;
  padding: 0;
}

.toolbar-button:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.toolbar-button:focus-visible,
.explosion-slider:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}


.viewer-help {
  position: absolute;
  top: 58px;
  right: 14px;
  z-index: 6;

  width: min(420px, calc(100% - 28px));
  padding: 16px;

  border: 1px solid rgb(255 255 255 / 8%);
  border-radius: 10px;

  background: rgb(24 24 28 / 60%);
  color: var(--vp-c-text-1);

  box-shadow: 0 10px 30px rgb(0 0 0 / 25%);
  backdrop-filter: blur(8px);
}

.viewer-help__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  margin-bottom: 10px;
}

.viewer-help__title {
  display: flex;
  align-items: center;
  gap: 10px;

  font-size: 1.05rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.viewer-help__title svg {
  width: 20px;
  height: 20px;
  color: var(--vp-c-brand-1);
  flex-shrink: 0;
}

.viewer-help__close {
  display: grid;
  place-items: center;

  width: 30px;
  height: 30px;
  padding: 0;

  border: 1px solid transparent;
  border-radius: 8px;

  background: transparent;
  color: var(--vp-c-text-2);

  font: inherit;
  font-size: 18px;
  font-weight: 600;
  line-height: 1;

  cursor: pointer;
  transition: .2s;
}

.viewer-help__close:hover {
  border-color: var(--vp-c-divider);
  background: color-mix(
    in srgb,
    var(--vp-c-bg) 90%,
    transparent
  );
  color: var(--vp-c-text-1);
}

.viewer-help__close:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.viewer-help__close:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.viewer-help__close:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.viewer-help__list {
  display: grid;
  gap: 10px;
  margin: 0;
}

.viewer-help__list > div {
  display: grid;
  grid-template-columns: 72px 1fr;
  gap: 14px;
}

.viewer-help__list dt {
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.viewer-help__list dd {
  margin: 0;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

/* Explosion slider — intentionally no surrounding panel */

.explosion-control {
  position: absolute;
  right: 24px;
  bottom: 20px;
  left: 24px;

  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 16px;

  z-index: 5;
}

.explosion-label {
  color: var(--vp-c-text-1);
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
}

.explosion-slider {
  width: 100%;
  height: 32px;
  margin: 0;
  cursor: pointer;

  appearance: none;
  -webkit-appearance: none;

  background: transparent;
}

/* Chrome, Edge and Safari */

.explosion-slider::-webkit-slider-runnable-track {
  height: 5px;
  border-radius: 999px;
  background: linear-gradient(
    to right,
    var(--vp-c-brand-1) 0%,
    var(--vp-c-brand-1) var(--slider-progress),
    var(--vp-c-divider) var(--slider-progress),
    var(--vp-c-divider) 100%
  );
}

.explosion-slider::-webkit-slider-thumb {
  width: 24px;
  height: 24px;
  margin-top: -9.5px;

  appearance: none;
  -webkit-appearance: none;

  border: 4px solid var(--vp-c-brand-1);
  border-radius: 50%;

  background: var(--vp-c-bg);
  box-shadow: 0 1px 4px rgb(0 0 0 / 25%);
}

/* Firefox */

.explosion-slider::-moz-range-track {
  height: 5px;
  border-radius: 999px;
  background: var(--vp-c-divider);
}

.explosion-slider::-moz-range-progress {
  height: 5px;
  border-radius: 999px;
  background: var(--vp-c-brand-1);
}

.explosion-slider::-moz-range-thumb {
  width: 18px;
  height: 18px;

  border: 4px solid var(--vp-c-brand-1);
  border-radius: 50%;

  background: var(--vp-c-bg);
  box-shadow: 0 1px 4px rgb(0 0 0 / 25%);
}

/* Fullscreen layout */

.viewer:fullscreen {
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: 0;
}

.viewer:fullscreen model-viewer {
  height: 100vh;
}

@media (max-width: 640px) {
  model-viewer,
  .viewer-loading {
    height: 420px;
    min-height: 420px;
  }

  .viewer-toolbar {
    top: 10px;
  }

  .viewer-toolbar--left {
    left: 10px;
  }

  .viewer-toolbar--right {
    right: 10px;
  }

  .toolbar-button {
    padding: 7px 9px;
  }

  .toolbar-button span {
    display: none;
  }

  .viewer-help {
    top: 54px;
    right: 10px;
    width: min(300px, calc(100% - 20px));
  }

  .explosion-control {
    right: 14px;
    bottom: 14px;
    left: 14px;
    gap: 10px;
  }

  .explosion-label {
    font-size: 12px;
  }

  .explosion-slider::-webkit-slider-thumb {
    width: 22px;
    height: 22px;
    margin-top: -8.5px;
  }
}
</style>
