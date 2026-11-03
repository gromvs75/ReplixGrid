# Your first ReplixGrid organizer

[Open ReplixGrid in English](https://grid.replixcast.com/?lang=en) · [User Guide — full feature reference](REFERENCE.md)

Start with a three-compartment organizer for your desk. The example below is 180 × 90 mm, with a low front for easy access and a taller back. All you need to design it is a browser. To prepare the file for your printer, open it in your usual slicer.

[Watch the Quick Start video in English (1:03)](https://grid.replixcast.com/guides/quick-start-en.mp4) to see how to split a compartment, bevel the top edges, add a two-tone lid and export a 3MF.

## Build the example

1. **Open** [grid.replixcast.com](https://grid.replixcast.com/?lang=en). Use the language menu in the top bar to change languages. If you already have a design you want to keep, click **Save project** to download an editable copy before starting.
2. **Create the body.** Open **Shape**, choose **Capsule** under **Base** and **Sloped** under **Height profile**, then click **Create from template**. The preview should show two dividers and three numbered compartments. The rim rises from 22 to 70 mm. Creating a template replaces the current design; the curved undo arrow restores it.
3. **Fit it to your space.** Under **Shape → Dimensions**, enter the outside width and depth in millimeters. Click a numbered compartment to read its inside dimensions. For example, if you need 60 mm of clear space for a tool, check the inside measurement after adjusting the body.
4. **Adjust the layout if needed.** Switch to **Top**, select a compartment, set **Number of parts** to **2**, then click **Split in width** or **Split in depth**. Only the selected compartment splits. Click a divider to adjust its position, or select an element from **All walls and compartments** in the right panel. Return to **3D** to inspect the result.

5. **Finish the top edges (optional).** Under **Shape → Corners and chamfers**, find **Top edge of walls and dividers**. Choose **Chamfer** for a flat bevel or **Rounded** for a curved edge. Enter the size in millimeters; the maximum depends on wall thickness so a flat strip remains on top. The finish follows both sides of the exterior walls and dividers. Choose **None** to restore square edges.

![Shape controls and a finished sloped capsule with three compartments](images/capsule-sloped.jpg)

## Try a two-tone lid (optional)

A lid needs a level rim. If you want to keep the sloped capsule from the example, click **Save project** first. Then choose **Capsule** and the **Flat** height profile under **Shape**, and click **Create from template**.

1. Open **Shape → Lid** and add a lid. Under **Lid fit**, choose **Overlapping** for a lid that covers the rim or **Inset** for a lid that sits flush inside it. The two-tone inset lid needs walls at least 2 mm thick and an inside depth of at least 5.2 mm.
2. Enable **Two-tone pattern** and choose a **Lid pattern**. To try the fan-shaped leaves in the gallery, select **Ginkgo leaves**.
3. Set **Lid base color** to the background color and **Lid pattern color** to the color of the drawing. For the combination shown below, choose cream for the base and olive green for the pattern.

![Two-tone lids, from left to right. Top row shows Olive branch, Ginkgo leaves and Fern frond. Bottom row shows Tidal waves, River pebbles and Growth rings.](images/lid-motifs.svg)

For printing, choose **3MF** and assign the base and pattern to their filament slots. Keep both colors together as one object. For Olive branch, Ginkgo leaves, Fern frond, Tidal waves and Growth rings, **Cutwork pattern** makes the motif out of openings in a continuous top sheet. Combine it with **Raised pattern** to expose the recessed backing through the openings. With **Raised pattern** on, the motif stands 1.6 mm above a solid 1.6 mm backing; the openings do not go through the lid. Turn it off for a smooth, flush inlay. Raised inset lids export backing-side down. Overlapping lids export pattern-side down to accommodate their rim: check the bridges over the recesses in your slicer before printing.

## Download your first print

1. Open **Print** and choose your printer configuration or enter its build volume.
2. Click **↓ Download** in the top bar. In **Check and download**, choose **Organizer and accessories**. If you added a shell and want it too, choose the whole kit.
3. Choose **STL** for a single-color body, or **3MF** to keep separate parts, colors and filament assignments. Wait for the geometry and size checks. If a part does not fit, correct the dimensions or build volume and reopen the dialog.
4. Click **↓ Download STL** or **↓ Download 3MF** at the bottom of the dialog. If several STL files arrive in a ZIP, extract them first.
5. Open the model in your slicer. Check its size in millimeters, place the organizer base on the bed, and arrange any separate parts. Select your printer and material profiles, slice, and inspect the first layer and the dividers in the layer preview before printing.

## Projects and backups

Open **My projects** and save a named copy. The open project saves automatically. You can also search, rename, open, delete, or download projects there. Unnamed work is retained as a draft. Download a project JSON file as a backup or to transfer it, and click **Open** in the top bar to load it. A damaged file should report a validation error without replacing the current project.

The library is stored in your browser and tied to the site address. Clearing site data or changing browsers, devices, or addresses can make it unavailable. Keep a separate project-file backup. Filament slots are stored separately in the browser and are not included in project JSON; configure them again on another device.

## Filaments and export options

For a multicolor 3MF, configure the available slots in **Print** with the same numbers and colors as your slicer. On a Snapmaker U1 the first four correspond to T0–T3. Assign a slot to each part in the download dialog, then verify the assignments in Snapmaker Orca. Unassigned parts may use the first filament. Your printer and material profiles come from your slicer.

For a colored OBJ, keep the OBJ and its MTL file in the same folder. The export check allows a 2 mm margin at the bed edges for each part. Arrange the whole kit and check overhangs and fine details in the slicer.

## Print a large organizer in sections

In **Print**, set the build volume and choose two or three sections, or use the suggested cuts. The app raises wall thickness to at least 5 mm and floor thickness to at least 3 mm, changing compartment sizes. Shells and inserts are unavailable when splitting; the app prompts you to remove them. Some shapes and settings also restrict splitting.

Download the joint sample, place its halves separately, and print at 100% scale. Once cool, check the fit of the pins. Then download the kit, inspect all parts in the slicer, print them, and assemble them after cooling using pins and glue. Nominal pin dimensions are Ø 3.2 × 8 mm; each hole is Ø 3.3 mm and 4.5 mm deep. Fit and strength depend on print settings, material, and glue quality. The owner tested and accepted this joint for organizers; that does not validate every combination.

## Shells

A one-piece decorative shell is built around the organizer body. Automatic support and compatibility are limited: decorative panels, tiers, split printing, tilted walls, and special settings have separate constraints. If the interface reports an incompatibility, adjust the settings and inspect the result in both preview and slicer. Geometry tests do not guarantee the physical fit of every variant.
