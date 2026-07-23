---
title: Getting Started with K1V
description: Prepare for the K1V build with dimensional checks, recommended print settings, hardware guidance, and printing-support information.

status: new
---

# Getting Started <Badge type="warning" text="Beta" />

Before diving into the frame assembly, there are a few things worth sorting out first: making sure your printer can actually produce accurate parts, knowing the hardware you'll be working with, and understanding how to handle supports on the trickier prints.

## Dimensional accuracy check

3D printers drift out of calibration, and a small error here becomes a real headache once you're fitting bearings and other hardware. Before you print anything else, print the calibration test part included in the repo.

::: tip
Make sure you've run through your usual calibrations first.<br>
Including extruder steps, filament tuning and dimensional accuracy.
:::

The test print checks for:
- 5mm dowel pin hole fit
- M3 heat insert holes
- M3 through-hole clearance
- 0.4mm single-wall accuracy
- Overhangs up to 70°
- F695 bearing seat fit

### Recommended print settings:

| Setting | Value |
|---|---|
| Filament | ABS (recommended) |
| Layer height | 0.2mm |
| Line width | 0.4–0.42mm |
| Wall count | 4 |
| Infill percentage | 40% or more |
| Infill type | Grid, Gyroid, Triangle, or Cubic |
| Top/bottom layers | 5 |
| Supports | Not required unless specified |

-# K1V parts are designed for a 0.2mm tolerance, so make sure your printer can print with these standards.

## Printing supports

Most STL files in this project have built-in support structures or are designed in a way they don't need supports. If you'd rather use your own supports or orientation, detach the built-in support (if present) and use your own.

## Hardware overview

K1V uses a mix of standard 3D-printer fasteners and a few less common parts. You don't need to memorize this list — it's here so that when a step says `LHSCS` or `Dowel Pin` later on, you know what to look for.


### Fasteners
<PartList
  :columns="2"
  :items="[
    {
      title: 'Socket Head Cap Screw (SHCS)',
      image: '/images/k1v/parts/SHCS.png',
      alt: 'socket head cap screw',
      description: 'A high-strength socket screw commonly used in 3D printer assemblies.',
      spec: 'ISO 4762'
    },
    {
      title: 'Button Head Cap Screw (BHCS)',
      image: '/images/k1v/parts/BHCS.png',
      alt: 'Button head cap screw',
      description: 'A low-profile fastener used where clearance is limited.',
      spec: 'ISO 7380-1'
    },
    {
      title: 'Flat Head Cap Screw (FHCS)',
      image: '/images/k1v/parts/FHCS.png',
      alt: 'flat head cap screw',
      description: 'A flat-head screw designed to sit flush in countersunk holes. Used where a smooth or low-clearance surface is required.',
      spec: 'ISO 10642'
    },
    {
      title: 'Low Head Socket Cap Screw (LHSCS)',
      image: '/images/k1v/parts/LHSCS.png',
      alt: 'low head cap screw',
      description: 'A reduced-height hex-socket machine screw used for blind extrusion joints and other assemblies with limited head clearance.',
      spec: 'DIN 7984'
    },
    {
      title: 'Ultra-Low Socket Head Cap Screw (ULSHCS)',
      image: '/images/k1v/parts/ULSHCS.png',
      alt: 'ultra low head cap screw',
      description: 'An ultra-low-profile (simetimes self-tapping) screw used where head clearance is extremely limited.',
      spec: ''
    },
    {
      title: 'Hex Bolt',
      image: '/images/k1v/parts/hex-bolt.png',
      alt: 'hex bolt',
      description: 'A hex-head fastener used for higher torque applications. Common in frame or structural connections.',
      spec: 'DIN 933 -931'
    },
    {
      title: 'Hex Nut',
      image: '/images/k1v/parts/hex-nut.png',
      alt: 'hex nut',
      description: 'A standard hex nut used with bolts or screws. Often captured in printed parts or slots.',
      spec: 'ISO 4032'
    },
    {
      title: 'Square Nut',
      image: '/images/k1v/parts/square-nut.png',
      alt: 'swuare nut',
      description: 'A thin four-sided nut designed to sit captive in a slot or printed pocket. Its flat sides prevent rotation while the screw is tightened.',
      spec: 'DIN 562'
    },
    {
      title: 'MakerBeamXL 15x15 T-nut',
      image: '/images/k1v/parts/makerbeam-tnut.png',
      alt: 'makerbeamxl 15x15 t-nut',
      description: 'A sliding nut for aluminum extrusion slots. Allows components to be mounted anywhere along the frame.',
      spec: ''
    },
    {
      title: 'Heat-Set Insert',
      image: '/images/k1v/parts/heat-insert.png',
      alt: 'Brass heat-set insert',
      description: 'A brass threaded insert installed into a printed part using heat, creating a strong and reusable metal thread.',
      spec: 'M3 heat-set insert'
    }
  ]"
/>

### Frame and Linear Motion

<PartList
  :columns="1"
  :items="[
    {
      title: 'MakerBeamXL 1515 Extrusion',
      image: '/images/k1v/parts/makerbeam-extrusion.png',
      alt: 'makerbeamxl 1515 extrusion',
      description: 'A compact aluminium T-slot extrusion used to construct the gantry frame. Its four slots accept M3 hardware for adjustable component mounting.',
      spec: ''
    },
    {
      title: 'MakerBeamXL L-Bracket',
      image: '/images/k1v/parts/makerbeam-bracket.png',
      alt: 'makerbeamxl L-bracket',
      description: 'A flat right-angle joining plate used to connect and reinforce two MakerBeamXL extrusions arranged as a corner.',
      spec: ''
    },
    {
      title: 'MGN12 Linear rail + MGN12H Block',
      image: '/images/k1v/parts/linear-rail.png',
      alt: 'linear rail',
      description: 'A recirculating-ball linear guide that provides rigid, low-friction and accurately constrained motion.',
      spec: ''
    },
  ]"
/>

### Belt Drive
<PartList
  :columns="1"
  :items="[
    {
      title: 'Nema17 Stepper Motor',
      image: '/images/k1v/parts/stepper.png',
      alt: 'nema17 stepper',
      description: 'A compact stepper motor that drives the CoreXY belts, providing precise and repeatable gantry movement.',
      spec: ''
    },
    {
      title: 'GT2 Timing Pulley',
      image: '/images/k1v/parts/gt2-pulley.png',
      alt: 'GT2 timing pulley',
      description: 'A toothed pulley that transfers motion through the GT2 timing belt for precise, slip-resistant motion.',
      spec: 'GT2 · 20 tooth'
    },
    {
      title: 'GT2 Timing Belt',
      image: '/images/k1v/parts/gt2-belt.png',
      alt: 'GT2 belt',
      description: 'A toothed timing belt used to transmit precise CoreXY motion between the stepper motors and gantry.',
      spec: ''
    },
  ]"
/>

### Idler Components

<PartList
  :columns="1"
  :items="[
    {
      title: 'F695 Bearing',
      image: '/images/k1v/parts/F695.png',
      alt: 'F695 flanged bearing',
      description: 'A flanged bearing used in live-shaft idler assemblies. Two bearings can be arranged face-to-face to guide a 6 mm belt and help keep it centred.',
      spec: 'F695 · 5 × 13 × 4mm'
    },
    {
      title: '5mm Dowel Pin',
      image: '/images/k1v/parts/m5-dowel-pin.png',
      alt: '5mm dowel pin',
      description: 'A precision cylindrical pin used as a smooth, rigid axle for live-shaft idler assemblies.',
      spec: ''
    },
    {
      title: 'M3 Threaded Dowel Pin',
      image: '/images/k1v/parts/m3-threaded-dowel-pin.png',
      alt: 'm3 threaded dowel pin',
      description: 'A precision idler pin with an internal M3 thread, allowing it to be retained with a screw while providing a smooth bearing surface.',
      spec: 'M3 internal thread'
    },
    {
      title: 'Voron pin (threaded)',
      image: '/images/k1v/parts/voron-pin.png',
      alt: 'voron pin',
      description: 'A threaded idler pin with an integral shoulder that sets the spacing within a bearing stack. Commonly used in Voron-style motion assemblies.',
      spec: 'M3 internal thread'
    },
    {
      title: 'Shim',
      image: '/images/k1v/parts/shim.png',
      alt: 'shim',
      description: 'A thin spacer used for alignment or load distribution. Or used in idler bearing stacks.',
      spec: 'DIN 988'
    },
  ]"
/>

## Idler stacks

You'll see three common idler configurations throughout the build — **single bearing stack**, **double bearing stack** and **live shaft idler**, — each covered in detail on the diagrams below.


:::: card-grid

::: card Single Idler Stack
![Exploded view of the single bearing stack](/images/k1v/single-idler-stack.png)

A compact idler configuration for a single belt path.
:::

::: card Live Idler
![Exploded view of the live idler](/images/k1v/live-idler-exploded.png)

The complete idler stack rotates smoothly around its axle.
:::

::: card Double Idler Stack
![Exploded view of the double bearing stack](/images/k1v/double-idler-stack.png)

Two bearing pairs guide parallel belt paths while maintaining alignment.
:::

::::

### Budget vs Recommended Idler Stacks

Because the Voron-Style Pins are quite expensive we have an alternate solution that's a bit cheaper but we recommend the Voron-Style pins.

:::: card-grid

::: card-empty Budget Idler Stack
![Exploded view of the single bearing stack](/images/k1v/budget-idler-stack.png)
:::

::: card-empty Voron-Style Idler Stack
![Exploded view of the live idler](/images/k1v/single-idler-stack.png)
:::

::::

### Dehubbed Pulley (Live Idler)

We use `Dehubbed` Pulleys for the Live-Shaft Idlers, what are these?
Essentially it's what the name says, GT2 Timing Pulleys have a "hub" with set/grub screws.
By removing the hub we make the Timing Pulley smaller in Diameter.<br><br>
the only catch is that you need 2 Timing Pulleys to create 1 Dehubbed Pulley

![Step by step instruction of 'dehubbing' GT2 Pulleys](/images/k1v/Dehubbed.png)

Image by Voron showing how a dehubbed idler is made.

---

### Next up

With calibration confirmed and your hardware kit ready, you're set to start on the [BOM List](./bill-of-materials).
