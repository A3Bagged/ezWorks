<template>
  <div class="docs-steps">
    <slot />
  </div>
</template>

<style>
.docs-steps {
  --steps-accent: var(--vp-sidebar-bg-color);
  --steps-marker-size: 38px;
  --steps-line-color: var(--vp-c-divider);
  --steps-border-color: var(--vp-c-divider);
  --steps-line-width: 2px;
  --steps-line-gap: 16px;
  --steps-gap: 12px;
}

.docs-steps > ol {
  margin: 24px 0;
  padding: 0;
  list-style: none;
  counter-reset: docs-step;
}

.docs-steps > ol > li {
  position: relative;
  min-height: var(--steps-marker-size);
  padding:
    0
    0
    56px
    calc(var(--steps-marker-size) + var(--steps-gap));

  counter-increment: docs-step;
}

.docs-steps > ol > li > h4 {
  transform: translateY(6px);
}

/* Remove VitePress's default spacing between list items */
.docs-steps > ol > li + li {
  margin-top: 0;
}

/* Number marker */
.docs-steps > ol > li::before {
  content: counter(docs-step);
  position: absolute;
  top: 0;
  left: 0;

  display: grid;
  place-items: center;

  width: var(--steps-marker-size);
  height: var(--steps-marker-size);

  border: 1px solid var(--steps-border-color);
  border-radius: 50%;
  background-color: var(--steps-accent);

  font-size: 14px;
  font-weight: 700;
  line-height: 1;
}

/* Align an H2 or H3 with the number marker */
.docs-steps > ol > li > h2:first-child,
.docs-steps > ol > li > h3:first-child {
  display: flex;
  align-items: center;

  min-height: var(--steps-marker-size);
  margin: 0 0 16px;
  padding: 0;

  border: 0;
  line-height: 1.3;
}

/* Move the H2 divider below the heading */
.docs-steps > ol > li > h2:first-child {
  margin-bottom: 24px;
  padding-bottom: 16px;

  border-top: 0;
  border-bottom: 1px solid var(--steps-line-color);
}

/* Connecting line, including the final step */
.docs-steps > ol > li::after {
  content: "";
  position: absolute;

  top: calc(
    var(--steps-marker-size) + var(--steps-line-gap)
  );
  bottom: var(--steps-line-gap);

  left: calc(
    (var(--steps-marker-size) - var(--steps-line-width)) / 2
  );

  width: var(--steps-line-width);
  background-color: var(--steps-line-color);
}

/* Extend the final line to the bottom of the final step */
.docs-steps > ol > li:last-child {
  padding-bottom: 0;
}

.docs-steps > ol > li:last-child::after {
  bottom: 0;
}

.docs-steps > ol > li > p:first-child {
  margin-top: 0;
}

.docs-steps > ol > li > p:last-child {
  margin-bottom: 0;
}
</style>