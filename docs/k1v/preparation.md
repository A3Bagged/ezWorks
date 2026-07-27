---
title: K1V Assembly Preparation
description: Prepare your printer, printed parts, hardware, and tools before beginning the K1V gantry assembly.

# outline: [2, 3]
---

# Printer Preparation <Badge type="warning" text="Under Construction" />

This procedure prepares the stock Creality K1 printer for the K1V gantry's mounting points.

::: info Warranty information
This mod requires modifying your printer's frame and panels. If your printer is still under warranty and you want to keep it that way, don't proceed with this mod.

Proceed at your own risk.
:::

> [!WARNING]
> If you still need to print parts on the printer you're about to mod, print them first.

## Requirements

Power off the printer, disconnect it from mains power, and prepare it for gantry removal before starting this procedure.

Remove the top frame and gantry before you begin this step.<br> [Watch this video](https://www.youtube.com/watch?v=yAbo99uSGoE) if you need a refresher.

## Tools and parts
::: bom-collapsable 4
| Part                                                                                          | Item                                  | Qty |
|:---------------------------------------------------------------------------------------------:|---------------------------------------|:---:|
| ![Blind-Joint Drilling Jig](/images/k1v/parts/printed/jigs/top-frame-drill-jig.png)           | Top Frame Drill Jig                   | 1   |
| ![Linear Rail alignment Jig](/images/k1v/parts/printed/jigs/rear-frame-drill-jig.png)         | Rear Frame Drill Jig                  | 1   |
| ![Linear Rail alignment Jig](/images/k1v/parts/printed/jigs/rear-frame-alignment-plug.png)    | Rear Frame Alignment Plug             | 1   |
| ![Linear Rail alignment Jig](/images/k1v/parts/printed/jigs/backpanel-jig-l.png)              | Backpanel Jig Left                    | 1   |
| ![Linear Rail alignment Jig](/images/k1v/parts/printed/jigs/backpanel-jig-r.png)              | Backpanel Jig Right                   | 1   |
| ![Linear Rail alignment Jig](/images/k1v/parts/tools/drill-bit.png)                           | 3.5mm Metal Drill Bit                 | 1   |
| ![Linear Rail alignment Jig](/images/k1v/parts/heat-insert.png)                               | M3 Heat-set Insert                    | 4   |
| ![Linear Rail alignment Jig](/images/k1v/parts/FHCS.png)                                      | FHCS M3x10                            | 2   |
| ![Linear Rail alignment Jig](/images/k1v/parts/tools/fine-marker.png)                         | Fine Line Marker (white)              | 1   |
| ![Linear Rail alignment Jig](/images/k1v/parts/tools/dremel.png)                              | Dremel Cutting Tool                   | 1   |
| ![Linear Rail alignment Jig](/images/k1v/parts/tools/dremel-cutting.png)                      | Dremel Cutting Disk                   | 1   |
| ![Linear Rail alignment Jig](/images/k1v/parts/tools/dremel-grinding.png)                     | Dremel Grinding Stones                | 1   |
| ![Linear Rail alignment Jig](/images/k1v/parts/tools/ultrasonic-cutter.png)                   | Ultrasonic Knife                      | 1   |
| ![Linear Rail alignment Jig](/images/k1v/parts/printed/rear-z-dustcap.png)                    | Rear Leadscrew Dustcap (optional)     | 1   |
:::

> [!TIP]
> You don't need the Dremel and Ultrasonic knife. An ultrasonic knife does make the job easier but a Dremel with some cutting disks and grinding stones work perfectly fine too.

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

Here's an overview of the holes you'll be drilling, highlighted with green arrows in the 3D-Viewer below. 

<ModelViewer3D
  model="/models/FrameDrilling.glb"
  poster="/models/FrameDrilling-poster.webp"
  default-camera-orbit="-45deg 70deg auto"
  alt="Interactive exploded view of the XY-joint assembly"
/>

::: collapse-warning Click here if the 3D-Viewer doesn't work.
![drill holes](/images/k1v/frame-prep/top-frame-full.png)

To-be drilled holes highlighted in blue
:::

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

## Backpanel Preparation

In order to fit our belts through we need to modify the backpanel.

<Steps>

1. ### Install heat-set inserts into the jigs
    Start by installing heat-set inserts in both `backpanel jigs`.

    ![drill holes](/images/k1v/backpanel-prep/panel-step-1.png)

    -# Make sure the heat-set inserts sit flush with the surface.

2. ### Rear panel cable raceways

    Before we can fit our jigs we need to remove the cable raceway covers and grind away the top part. Remove these completely!
    What worked for me: bend the piece up and down until it snaps. No cutting needed.

    ![drill holes](/images/k1v/backpanel-prep/panel-step-2.png)

3. ### Installing the backpanel jigs

    Seat the jigs into each top corner and secure them using screws from the outside inward. For the bottom, reuse the original screw. For the top, use an `FHCS M3×10`.

    ![drill holes](/images/k1v/backpanel-prep/panel-step-3.png)

4. ### Drill backpanel holes

    Drill the 8 holes shown in the image below with a 3.5mm drill bit, all the way through the plastic backpanel.

    ![drill holes](/images/k1v/backpanel-prep/panel-step-4.png)

5. ### Mark backpanel cutting lines

    Trace the inside of the jig with a fine marker, preferably a color that stands out clearly against the backpanel, like white. Remove the jigs afterward.
    
    ![drill holes](/images/k1v/backpanel-prep/panel-step-5.png)

6. ### Cutting away material for belt holes

    Take your Dremel tool and start cutting the lines you've just traced. The lines should be cut from hole to hole (the inner 4 holes).
    Alternatively, you can use an `ultrasonic knife` to cut through the plastic. When done, remove the piece and deburr any edges.
    
    ![drill holes](/images/k1v/backpanel-prep/panel-step-6.png)

    > [!CAUTION]
    > Don't cut outside the traced areas, the 4 outer holes are mounting holes.

7. ### Remove extra material

    Finally, cut away the highlighted blue part. It helps to loosen the screws at the top of the backpanel first, so you can gently pull it away from the frame and give yourself more room to work without hitting the aluminum.
    
    ![drill holes](/images/k1v/backpanel-prep/panel-step-7.png)

8. ### Rear leadscrew belt clearance

    Before assembling and routing the belts, remove a little more material to make room for them.<br>
    
    Take a Dremel with a cutting disk (or any other tool you prefer) and cut a line level with the bottom of the belt groove in the rear.
    
    ![drill holes](/images/k1v/backpanel-prep/panel-step-9.png)

    -# The blue section needs to be removed.

    Do the same for the middle piece and cut it flush. Try not to damage anything else nearby. Don't worry about the finish, we have a 3D-printable cover that makes it look nicer and doubles as a dust cover for your Z-assembly.
    
    ![drill holes](/images/k1v/backpanel-prep/panel-step-10.png)

    Finally, install the dust cover until it's fully seated.

    ![drill holes](/images/k1v/backpanel-prep/panel-step-11.png)

Once you're done, the result should look like this.

![drill holes](/images/k1v/backpanel-prep/panel-step-8.png)

</Steps>


## Verification

Confirm all of the following before continuing:

- The new hole passes through the intended rear-frame location.
- The backpanel sits flat without being forced into position.
- The mounting hardware passes through the backpanel and enters the drilled location.
- No metal chips remain inside the printer.
- No wiring, connectors, or electronic components were damaged during drilling.
- All cut plastic edges are smooth and deburred.