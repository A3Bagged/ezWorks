<script setup>
defineProps({
  color: {
    type: String,
    default: 'blue'
  },
  label: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <span class="status-tag" :class="`status-tag--${color}`">
    <slot>{{ label }}</slot>
  </span>
</template>

<style>
.status-tag {
  --status-tag-color: #0969da;
  --status-tag-background: rgba(9, 105, 218, 0.12);
  --status-tag-border: rgba(9, 105, 218, 0.3);

  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-inline-start: 0.2rem;
  padding: 0.2em 0.65em;
  border: 1px solid var(--status-tag-border);
  border-radius: 0.35em;
  background-color: var(--status-tag-background);
  color: var(--status-tag-color);
  font-size: clamp(0.6875rem, 0.42em, 0.875rem);
  font-weight: 650;
  line-height: 1.35;
  letter-spacing: 0;
  vertical-align: middle;
  white-space: nowrap;
}

/* Give tags in headings clearer separation from the heading text. */
.vp-doc :is(h1, h2, h3, h4, h5, h6) .status-tag {
  margin-inline-start: 0.5rem;
  transform: translateY(-2px);
  vertical-align: middle;
}

.status-tag--green {
  --status-tag-color: #1a7f37;
  --status-tag-background: rgba(26, 127, 55, 0.12);
  --status-tag-border: rgba(26, 127, 55, 0.3);
}

.status-tag--purple {
  --status-tag-color: #8250df;
  --status-tag-background: rgba(130, 80, 223, 0.12);
  --status-tag-border: rgba(130, 80, 223, 0.3);
}

.status-tag--yellow,
.status-tag--amber {
  --status-tag-color: #7a4d00;
  --status-tag-background: rgba(255, 202, 40, 0.22);
  --status-tag-border: rgba(154, 103, 0, 0.35);
}

.status-tag--orange {
  --status-tag-color: #bc4c00;
  --status-tag-background: rgba(255, 143, 0, 0.16);
  --status-tag-border: rgba(188, 76, 0, 0.32);
}

.status-tag--red {
  --status-tag-color: #cf222e;
  --status-tag-background: rgba(207, 34, 46, 0.12);
  --status-tag-border: rgba(207, 34, 46, 0.3);
}

.status-tag--gray {
  --status-tag-color: #57606a;
  --status-tag-background: rgba(87, 96, 106, 0.12);
  --status-tag-border: rgba(87, 96, 106, 0.3);
}

.dark .status-tag {
  --status-tag-color: #4493f8;
  --status-tag-background: rgba(68, 147, 248, 0.14);
  --status-tag-border: rgba(68, 147, 248, 0.34);
}

.dark .status-tag--green {
  --status-tag-color: #3fb950;
  --status-tag-background: rgba(63, 185, 80, 0.14);
  --status-tag-border: rgba(63, 185, 80, 0.34);
}

.dark .status-tag--purple {
  --status-tag-color: #ab7df8;
  --status-tag-background: rgba(171, 125, 248, 0.14);
  --status-tag-border: rgba(171, 125, 248, 0.34);
}

.dark .status-tag--yellow {
  --status-tag-color: #ffca28;
  --status-tag-background: rgba(255, 202, 40, 0.14);
  --status-tag-border: rgba(255, 202, 40, 0.34);
}

.dark .status-tag--orange {
  --status-tag-color: #ff8f00;
  --status-tag-background: rgba(255, 143, 0, 0.14);
  --status-tag-border: rgba(255, 143, 0, 0.34);
}

.dark .status-tag--red {
  --status-tag-color: #f85149;
  --status-tag-background: rgba(248, 81, 73, 0.14);
  --status-tag-border: rgba(248, 81, 73, 0.34);
}

.dark .status-tag--gray {
  --status-tag-color: #8c959f;
  --status-tag-background: rgba(140, 149, 159, 0.14);
  --status-tag-border: rgba(140, 149, 159, 0.34);
}
</style>
