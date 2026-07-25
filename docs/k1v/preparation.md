---
title: K1V Assembly Preparation
description: Prepare your printer, printed parts, hardware, and tools before beginning the K1V gantry assembly.

outline: [2, 3]
---

# Printer Preparation <Badge type="warning" text="Under Construction" />

This procedure prepares the stock Creality K1 printer for the K1V gantry's mounting points.

::: warning Warranty information
This mod requires modifying your printer's frame and panels. If your printer is still under warranty and you want to keep it that way, don't proceed with this mod.

Proceed at your own risk.
:::

## Requirements

Power off the printer, disconnect it from mains power, and prepare it for gantry removal before starting this procedure.

Remove the top frame and gantry before you begin this step.<br> [Watch this video](https://www.youtube.com/watch?v=yAbo99uSGoE) if you need a refresher.

## Tools and parts
::: bom
| Part                                                                                          | Item                                  | Qty |
|:---------------------------------------------------------------------------------------------:|---------------------------------------|:---:|
| ![Blind-Joint Drilling Jig](/images/k1v/parts/printed/jigs/top-frame-drill-jig.png)           | Top Frame Drill Jig                   | 1   |
| ![Linear Rail alignment Jig](/images/k1v/parts/printed/jigs/rear-frame-drill-jig.png)         | Rear Frame Drill Jig                  | 1   |
| ![Linear Rail alignment Jig](/images/k1v/parts/printed/jigs/rear-frame-alignment-plug.png)    | Rear Frame Alignment Plug             | 1   |
| ![Linear Rail alignment Jig](/images/k1v/parts/tools/drill-bit.png)                           | 3.5mm Metal Drill Bit                 | 1   |
| ![Linear Rail alignment Jig](/images/k1v/parts/tools/counter-sink-bit.png)                    | Countersink Bit                       | 1   |
:::

## Preparation
1. Remove the top frame and stock gantry according to the printer-disassembly procedure.
2. Loosen the top of the backpanel to access the rear frame.
3. Clear wiring and other components away from the drilling area.
4. Temporarily install the top frame back on the printer (push-fit).

::: danger Disconnect mains power
Don't drill the printer while it's connected to mains power. Metal chips can enter powered electronics and cause electrical shock, short circuits, or permanent hardware damage.
:::

::: warning Protect the electronics
Cover or remove exposed electronics before drilling. Collect all metal chips and inspect the printer carefully before reconnecting power.
:::

## Frame Overview

Here's an overview of the holes you'll be drilling, outlined in blue:

![drill holes](/images/k1v/frame-prep/top-frame-full.png)

## Top Frame

Start with the top frame. Make sure the gantry is removed and the top frame is seated into the printer's vertical frames.

<Steps>

1. ### Left side: rear hole
    Align the `TopFrame-Jig` to the left side of the frame, toward the rear, lining up the jig's left hole with the smallest of the panel's mounting holes. Screw one of the side panel screws into the jig's left hole to hold it in place, then drill the center hole with a 3.5mm bit all the way through the frame.

    ![drill holes](/images/k1v/frame-prep/frame-step-1.png)

    -# Seat the top side of the jig flush against the frame before drilling.

2. ### Left side: front hole

    Repeat toward the front of the printer. Align the jig, hold it with a panel screw through the right hole, and drill through the center hole.

    ![drill holes](/images/k1v/frame-prep/frame-step-2.png)

3. ### Left side: center hole

    Hold the jig by hand and measure both sides until it's centered on the frame. Once it's fully seated, drill.

    ![drill holes](/images/k1v/frame-prep/frame-step-3.png)

    Repeat all three holes on the right side of the printer.

    ::: box-green
    On the front of the printer, drill only the center hole. Skip the rear hole here, it already exists.
    :::

4. ### Countersink the drilled holes

    These screws need to sit flush, so countersink each hole. Take an FHCS M3 screw, countersink the hole, and test-fit it until you can't feel it proud of the surface. Go slow — countersinking too deep weakens the frame.

</Steps>

## Rear Corner Frame

<Steps>

1. ### Side of the printer

    Drill 2 new holes lower than the existing ones at each rear corner. Slide the `Rear Frame Drill Jig` into the frame until it's fully seated, hold it with one of the original side panel screws, and drill where the arrow points. Countersink until flush. Repeat on the other side of the printer.

    ![drill holes](/images/k1v/frame-prep/frame-step-4.png)

2. ### Rear of the printer

    Secure the top hole with a SHCS or BHCS M3×8 and line it up visually until straight. For the back panel, seat the printable 6mm `alignment plug` into the existing 6mm hole, then drill with a 3.5mm bit. Skip the countersink here. If you want it countersunk anyway, enlarge the hole in the plastic rear panel to 6mm first.

    ![drill holes](/images/k1v/frame-prep/frame-step-5.png)

</Steps>

## Backpanel preparation

Under construction.