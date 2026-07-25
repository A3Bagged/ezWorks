<template>
  <div class="docs-steps">
    <slot />
  </div>
</template>

<style>
.docs-steps {
  --steps-accent: var(--vp-sidebar-bg-color);
  --steps-marker-size: 38px;
  --steps-marker-size-mobile: 26px;
  --steps-line-color: var(--vp-c-divider);
  --steps-border-color: var(--vp-c-divider);
  --steps-line-width: 2px;
  --steps-line-gap: 16px;
  --steps-gap: 16px; /* space between marker and text */
  --steps-gutter: calc(var(--steps-marker-size) + var(--steps-gap));
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
  padding: 0 0 56px 0;
  counter-increment: docs-step;
}

/* Pull marker + line out into the gutter on wide viewports only */
@media (min-width: 1280px) {
  .docs-steps > ol {
    margin-left: calc(-1 * var(--steps-gutter));
  }

  .docs-steps > ol > li {
    padding-left: var(--steps-gutter);
  }
}

/* Below that breakpoint, keep the original inline layout — no room in the gutter */
@media (max-width: 1279px) {
  .docs-steps > ol > li {
    padding-left: var(--steps-gutter);
  }
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

  /* color property removed — back to inherited default */
  font-size: 14px;
  font-weight: 700;
  line-height: 1;
}

/* Align an H2, H3, or H4 with the number marker */
.docs-steps > ol > li > h2:first-child,
.docs-steps > ol > li > h3:first-child,
.docs-steps > ol > li > h4:first-child {
  display: flex;
  align-items: center;

  height: var(--steps-marker-size);
  line-height: var(--steps-marker-size);
  margin: 0 0 16px;
  padding: 0;

  border: 0;
}

/* Move the H2 divider below the heading */
.docs-steps > ol > li > h2:first-child {
  height: auto;
  min-height: var(--steps-marker-size);
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

/* ── Mobile: collapse to an inline marker, no gutter, no line ────────── */
@media (max-width: 640px) {
  .docs-steps > ol > li {
    padding-left: 0;
    padding-bottom: 32px;
  }

  /* Kill the floated circle and the connecting line entirely */
  .docs-steps > ol > li::before,
  .docs-steps > ol > li::after {
    content: none;
  }

  .docs-steps > ol > li > h2:first-child,
  .docs-steps > ol > li > h3:first-child,
  .docs-steps > ol > li > h4:first-child {
    height: auto;
    line-height: 1.3;
    margin-bottom: 12px;
    padding-left: 0;
  }

  /* New marker: inline, sitting right before the heading text */
  .docs-steps > ol > li > h2:first-child::before,
  .docs-steps > ol > li > h3:first-child::before,
  .docs-steps > ol > li > h4:first-child::before {
    content: counter(docs-step);
    display: inline-grid;
    flex-shrink: 0;
    place-items: center;

    width: var(--steps-marker-size-mobile);
    height: var(--steps-marker-size-mobile);
    margin-right: 8px;

    border: 1px solid var(--steps-border-color);
    border-radius: 50%;
    background-color: var(--steps-accent);

    font-size: 12px;
    font-weight: 700;
    line-height: 1;
  }

  /* h2 keeps its divider, just without the gutter math */
  .docs-steps > ol > li > h2:first-child {
    padding-bottom: 12px;
  }
}
</style>