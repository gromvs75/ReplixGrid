# ReplixGrid User Guide

Design an organizer in millimeters, check its fit, and download the parts for your slicer. For a first build, follow the illustrated capsule example. Use this reference when you want to change a particular part of your design.

[Open ReplixGrid in English](https://grid.replixcast.com/?lang=en) · [Quick Start](USER-GUIDE.md) · [Local installation](../README.md#local-installation)

| I want to… | Go to |
| --- | --- |
| Select a wall, rotate the model or undo a change | [Workspace and views](#workspace-and-views) |
| Choose a shape, change dimensions or lean the walls forward | [Shape and dimensions](#shape-and-dimensions) |
| Fit an object into a compartment or move a divider | [Compartments and dividers](#compartments-and-dividers) |
| Lower a wall, shape its edge or cut a finger opening | [Wall heights and cutouts](#wall-heights-and-cutouts) |
| Soften a rim, add texture or put a name on the body | [Corners, edges and decoration](#corners-edges-and-decoration) |
| Add a removable cup, stack trays or fit a lid | [Inserts, tiers and lids](#inserts-tiers-and-lids) |
| Print a decorative cover for the outside | [Sleeves and panels](#sleeves-and-panels) |
| Reopen a design or move it to another computer | [Projects and backups](#projects-and-backups) |
| Choose a printer, split a large model or assign filament | [Print setup and sectioning](#print-setup-and-sectioning) · [Download and slice](#download-and-slice) |
| Work out why a control or download is unavailable | [Troubleshooting](#troubleshooting) |

## Workspace and views

Open a tool in the upper left. **Shape** changes the body and its accessories. **Compartments** changes the layout. **Shell** designs a separate outer cover. **Print** sets the build volume, filament slots and optional section cuts. Click a compartment number, wall or divider on the model to open its settings on the right. If a part is hard to click, expand **All walls and compartments** and select it by name.

Drag the background to rotate, scroll to zoom, and drag with the right mouse button to pan. **Return camera** restores the camera framing. **Top** helps you select a narrow compartment or move a divider. **3D** shows wall heights and the finished assembly. **Grid** toggles the reference grid, with fine lines every 10 mm and major lines every 50 mm. Use the part buttons below the model to isolate the organizer, inserts, shell or lid when present. With the lid isolated, choose **Bottom** to inspect its underside. Press **Esc** to close the tool panel. Use the curved arrows above the model to undo or redo a design change.

Use the top bar to choose an interface language or switch between light, dark and system appearance. The English names in this guide match the English interface.

## Shape and dimensions

Under **Shape**, choose a base and height profile, then click **Create from template**. The button replaces the current construction. Save a named copy first if you want to keep both designs. **Basic templates** also offers an empty body and a four-compartment starting point.

| Base | When to choose it |
| --- | --- |
| Rounded | A rectangular footprint with adjustable outside corners. |
| Capsule | A long body with semicircular ends. The sloped template carries the incline through both curved ends. |
| Circle | A round organizer sized by diameter. |
| Oval | An elongated curved outline with separately adjustable width and depth. |
| Honeycomb | A cluster of hexagonal cells that share walls. Select a cell to adjust its height. |

Choose **Flat** for a level rim, **Sloped** for a continuous rise, or **Steps** for distinct height levels. The dimensions below the choices describe the template you are about to create. Once created, edit the model under **Dimensions**. Width and depth measure the outside footprint. Use the selected compartment's inside dimensions when sizing it for an object. On a curved base, also check the narrowing ends in **Top** view.

![Sloped capsule with a low end for access, a tall end for long items and two transverse dividers](images/capsule-sloped.jpg)

**Shape → Additional** contains wall and bottom thickness. Thicker walls take space from the compartments. **Tilt on a flat base** leans the walls forward by up to 25° while the bottom stays horizontal. This differs from a sloped rim, which changes wall height along the body. With tilt enabled, use the finished dimensions in the download dialog to check the space the printed part will occupy.

## Exact internal dimensions

Select a compartment and use **Internal dimensions** in the right panel, or click its blue dimension label directly on the model. Choose width or depth, enter millimeters and click outside the inline field to apply. Enter also applies; Escape cancels. The right panel retains its Apply button. Invalid values cannot change the model. Each committed edit can be undone in one step.

The orange divider is its current position; the dashed blue line previews the new position. The closest enclosing split on the chosen axis moves, keeping the outside body size and wall thickness unchanged. The panel shows affected neighboring sizes. If there is no divider on that axis, adjust the overall dimensions or split the compartment first.

In a simple row, start with compartment 1 and continue in order; the last compartment takes the remainder. Neighboring dimensions are not locked, so editing an earlier compartment can resize a later one.

Rounded corners, capsule contours, chamfers and inner fillets remain supported. The blue line measures the actual internal span at the compartment centreline, just above the floor. Space can narrow elsewhere around curves: add clearance and check the whole object footprint. Circle, oval, honeycomb and tilted walls do not currently support exact compartment editing.

Select a wall or divider to edit its height directly on the model. Flat walls show one value; two-point profiles show A/B values. Linked-height and stepped-wall rules match the right panel. These labels edit height, not wall length or global thickness.

## Compartments and dividers

For a quick layout, use **Compartments → + Compartment** to split the largest compartment. **− Compartment** merges a neighboring pair. In a honeycomb, these controls add or remove an outside cell and preserve the size of the others. Two neighboring honeycomb cells share a wall as high as the taller cell.

For an exact layout, switch to **Top** and select the compartment you want to divide. Choose **Number of parts**, then **Split in width** to divide the width into narrower compartments, or **Split in depth** to make shallower ones. You can split one of the results again. For a pencil bay beside two small trays, first split the width in two, then split only the tray side in depth.

![Top-view example with one full-depth bay and two smaller compartments](images/compartment-splits.svg)

Select the divider to drag it, or adjust **First compartment** under **Partition position**. Check the new inside dimensions on each side. **Remove partition** combines the compartments and can also remove dividers nested inside that split. Review the highlighted selection and the confirmation before removing it.

## Wall heights and cutouts

Select an outside wall or divider. **One height** sets a level top. **Two points** lets you set the heights at ends **A** and **B**, which are marked on the model. Choose **Straight**, **Wavy** or **Zigzag** to shape the edge along the wall. Wavelength controls the distance between repeats. In a stepped template, selecting a step adjusts its level together with the linked wall and divider.

Use **Connect the heights of adjacent walls** to make an outside wall follow its neighbors. For a divider, **Fit to adjacent walls** copies the two end heights once. Repeat the fit after changing the neighboring walls. **Like the others** returns the selected wall to the common height.

Open **Wall cutout** to make a reach-in opening. Choose a smooth scoop, semicircle or rectangular opening, set the width and depth, then move it along the wall. Position runs from end A to B. Depth is measured down from the top edge. Inspect the remaining lip above the floor. Choose **No cutout** to fill the opening. Honeycomb uses cell height instead. Stepped circles and ovals do not support cutouts in the outside walls.

## Corners, edges and decoration

Open **Shape → Corners and chamfers**. Three controls affect different parts of the print.

| Control | Where to look | What it changes |
| --- | --- | --- |
| External corners | Top view, outside outline | Round the footprint corners or cut them at 45°. Zero gives a square corner. Available on the rectangular family of bases. |
| Radius inside compartments | Top view, inside a bay | Rounds the vertical junction where two walls meet. Tight bays limit the available radius. |
| Top edge of walls and dividers | Cross-section through a wall | **Chamfer** cuts a flat bevel and **Rounded** curves the lip. Both sides of outside walls and dividers receive the finish. **None** restores the square lip. |

![Wall cross-sections showing square, chamfered and rounded upper corners with the same wall thickness](images/top-edge-profiles.svg)

For example, on a 2 mm wall try a 0.5 mm chamfer. Each side loses 0.5 mm at the very top, leaving a 1 mm flat strip. The maximum displayed size depends on wall thickness. With **Rounded**, the value is the radius in millimeters.

- **Organizer color** changes the preview and color-capable exports. Choose a swatch, a custom color or a configured filament color. Assign the actual filament slot at export.
- **Bottom trim** adds a projecting band around the base. Choose smooth, striped or stepped trim and set its height. A compatible sleeve can rest on it. Trim requires an untilted, single-piece, single-tier body and is incompatible with separate panels.
- **Organizer relief** adds a raised pattern directly to the outside wall. Scroll the pattern catalogue, set pattern size and relief height, and release the slider to rebuild. The inside stays smooth. The projections increase the outside dimensions. Choose **Smooth** to remove the relief.
- **Label and icon** puts lettering or a symbol on a selected side. Enter the text, choose a font, set letter height and vertical position, then choose raised lettering or engraving and set its height or depth. A star or heart can accompany the text. If the inscription runs into a cutout or exceeds the available face, lower the position or reduce the letter size.

## Inserts, tiers and lids

**Removable inserts.** Select a compartment, then expand **Compartment insert** on the right. **Empty** makes an open cup. **For little things** adds a grid with adjustable rows and columns. **For handles** creates sockets for pens or tools. Set the socket's inside diameter and the app fits as many as the insert allows. Choose a fitted, rounded, circular, oval or hexagonal outline and a color. **Remove insert** clears that bay. An empty cup is still a printable part.

The insert follows its compartment with at least 0.5 mm clearance. Its walls and bottom are 1.2 mm thick and its height adjusts to finish roughly 1 mm below the rim. An insert in a tilted organizer comes out along the slope. Isolate **Inserts** to inspect them, then export **Organizer and accessories**. Inserts require single-piece printing.

**Stacked trays.** Start with a level rim, then open **Shape → Tiers → + Tier**. Select the tier to edit before changing its height or layout. The tiers share a footprint and can have different compartments. **View stack** shows them together. Adjust **Fit clearance** for the mating surfaces. You can build two to five tiers or remove tiers with **− Tier**. Stacking requires upright walls, a smooth body and a continuous supporting rim. Lower dividers that stand above the rim. Use decorative panels for an outside cover on a stack. A supported wall cutout must leave enough material near both corners to carry the tray above it.

**Lid.** In **Shape → Lid**, click **+ Cover**. Use a level upper rim with equal outside wall heights and dividers at or below it. Tilt, honeycomb and sectional printing prevent this fit. Choose **Overlapping** for an outside cap or **Inset** for a 2 mm plate that sits flush inside the tray. The inset option cuts a seat in the upper wall with 0.35 mm clearance on each side and leaves room above dividers and inserts. It needs at least 2 mm wall thickness and 4 mm inside depth. Add a wall cutout or a handle to lift it. The overlapping lid has a locating rim with 0.5 mm clearance. Choose its top pattern, scale and depth, then set the rim height and finish. For a handle, choose cylindrical or bar, set its size and height, and optionally chamfer or round its edges. The handle prints separately and glues to the lid. The preview lifts the overlapping lid and shows the inset lid seated. The exported lid lies flat for printing.

**Two-tone pattern.** Enable it on either lid fit, then choose Olive branch, Ginkgo leaves, Fern frond, Tidal waves, River pebbles Growth rings or Voronoi cells. Choose a base color and a pattern color. The 3.2 mm plate has a solid 1.6 mm backing and a 1.6 mm patterned face. The outer locating rim and optional handle add to the overall height. For an inset lid, allow at least 5.2 mm inside depth. Export in 3MF to keep both colors together as one lid, and assign the two parts to your filament slots. For Olive branch, Ginkgo leaves, Fern frond, Tidal waves and Growth rings, **Cutwork pattern** makes the motif out of openings in a continuous top sheet. Combine it with **Raised pattern** to expose the recessed backing through the openings. Enable **Raised pattern** to leave the openings in the upper 1.6 mm empty. Disable it for a smooth inlay. Raised inset lids print backing first; overlapping lids print patterned face down. Check bridging over the recesses in the slicer.

![Six two-tone lid patterns](images/lid-motifs.svg)

## Sleeves and panels

Open **Shell** and choose a pattern. A shell is printed separately from the organizer. If you want the pattern on the body itself, use **Shape → Organizer relief**.

| Shell mode | Fit and assembly |
| --- | --- |
| **Around the body** | One bottomless sleeve follows the perimeter and wall heights. Slide it over the body from above, following the wall direction on a tilted model. The panel indicates whether a support ledge is present or the sleeve rests on the table. |
| **Decorative panels** | Separate framed panels cover selected sides and leave the corners exposed. Choose the sides and adjust **Edge offset**. Glue panels without fastenings. With hidden pins, press each panel straight onto its matching wall for a permanent attachment. |

![Top views of a sleeve wrapping the corners and separate panels ending before each corner](images/shell-fit.svg)

Choose the pattern, set its size, adjust **Border width** for the solid frame, and set **Shell thickness**. Under **Landing**, **Clearance on each side** sets the gap between sleeve and organizer. A 0.5 mm gap on each side adds 1 mm across two opposite sides before you count shell thickness. Compare **Assembly** with the isolated **Shell** view to judge the result. **Download shell** exports the cover separately, and **Remove shell** removes it from the design.

Panels require a compatible rectangular base. Switching to panels can raise wall thickness to 3.2 mm, reducing compartment space. Hidden mounting sockets need smooth walls. Panel edge offset controls the margin on the face, whereas sleeve clearance controls the sliding fit.

## Projects and backups

Use **My projects → Save a copy** to name a design or make a variant before experimenting. The open project saves automatically in this browser. The library lets you search, open, rename, delete or download a project. **Save project** in the top bar downloads an editable JSON backup. Use **Open** to load that file, including on another computer or in a local installation.

Keep a downloaded backup before clearing browser data. Each browser and site address has its own library. Filament slots are stored separately for the printer in the browser. Set them up again when moving to another device. For the downloadable local app, see [Local installation](../README.md#local-installation).

## Print setup and sectioning

Under **Print**, select your printer and head configuration or choose **Custom size**. Check build width, depth and height. The preset supplies the build volume. Choose the printer, nozzle, material and slicing profiles in your slicer.

For a model that exceeds the bed, use the suggested cuts or choose two or three sections when available. Read the proposed seam positions and use **Move the parts apart** to see how the sections meet. Splitting increases wall thickness to at least 5 mm and floor thickness to at least 3 mm. Recheck the inside dimensions. Remove shells and inserts before splitting. Stacked trays, tilted models and the circle, oval and honeycomb bases require single-piece printing. **Return solid model** switches off sectioning. Check thickness again if you want to restore earlier dimensions.

**Joint sample** downloads mating ends to try at the same scale and print settings as the final body. Place them separately with their bases down. After cooling, the nominal Ø 3.2 × 8 mm pins fit into Ø 3.3 mm holes, 4.5 mm deep on each side of the seam. Check alignment, then use pins and glue to assemble the printed sections. Use **Download all parts** for the sectioned organizer itself.

## Download and slice

1. In **Print**, configure filament slots if you want a multicolor file. Match slot numbers and colors to your slicer. On a Snapmaker U1, slots 1–4 correspond to T0–T3. Add up to 16 slots, set each color and optionally name its material. Distinct colors let the app match part colors to slots automatically. If two slots share a color, choose the intended slot for each part in the download dialog.
2. Click **↓ Download**. Choose **Organizer and accessories**, **Shell only** or **The whole set**, according to which parts you need. For a sectioned model, export the kit.
3. Select a format below. For 3MF, assign a filament slot to each part or leave it for assignment in the slicer. Orca can use the first filament for unassigned parts.
4. Wait for the geometry and size checks. Read the dimensions of each part and any instruction to rotate it 90° on the bed. The check reserves 2 mm at the bed edges. Download with the format button at the bottom of the dialog.
5. Open the result in your slicer at **100% scale in millimeters**. Arrange the complete set, check overhangs and thin details, and preview the first layer and dividers. For a multicolor print, verify each part's filament assignment before slicing.

| Format | Choose it for | What to do with the download |
| --- | --- | --- |
| STL | Geometry for a single-color print | Open the STL in the slicer. Extract the ZIP first if the export contains several STLs. |
| 3MF | A kit with separate parts, colors and filament assignments | Open it in your slicer and verify the parts and slots. ReplixGrid leaves printer and material profiles to the slicer. |
| OBJ + MTL | A colored model for a tool that accepts OBJ | Keep the geometry and material file together. The model uses millimeters with Z up. |
| Project JSON | Continuing to edit compartments, dimensions or accessories | Use **Save project** and reopen it with **Open** in ReplixGrid. |

## Troubleshooting

| What you see | What to check |
| --- | --- |
| The object fits the outside dimensions but will not fit in a bay | Select the compartment and check its inside measurements. Allow for wall thickness, curved ends, inside corner radius and removable inserts. |
| Selecting a divider keeps selecting the wall in front | Switch to **Top** or open **All walls and compartments** on the right. |
| The lid or next tier cannot be added | Check for a level rim, equal outside heights, protruding dividers, tilt or split printing. For a stack, also check the body relief and shell mode. |
| A part exceeds the bed although the footprint seemed small enough | Read the finished dimensions in the download dialog. Tilt, relief, trim and shells can extend beyond the base. Check the selected printer configuration and rotation. |
| A downloaded print has the wrong colors | Use 3MF, match the slot numbers in **Print**, then inspect the per-part assignments in the slicer. STL carries geometry only. |
| A design saved on another device is missing | Transfer its project JSON and use **Open**. Browser libraries are local to each device and site address. |

## Project variants

Click **+ Variant** in the top bar, or open **My projects** and select **New variant**. Enter a name and click **Create variant**. The new variant is an independent copy; the original remains saved. An unnamed original is retained as **Draft**.

Use the selector beside **+ Variant** to switch between related models, or choose one under **Variants of this project** in My projects. Each variant saves automatically and keeps its own undo/redo history after switching or reloading. A newly created variant starts with an empty history.

Use **Separate project → Save a copy** to create an unrelated project. Rename or delete individual models in My projects; deleting the original does not delete its variants.

**Download** exports the selected model for printing. **Save project** downloads that model as editable JSON; **File** on a library card downloads the corresponding model. JSON contains one model, without its related variants or undo history. Save each model separately to transfer or back up the complete set.


## Shared styles

1. Open a project with the colors and patterns you want to reuse.
2. Under **Shape → Shared style**, enter a name and click **Save current style**.
3. Open another project or variant, return to **Shared style**, and select the saved style.
4. Choose **Colors**, **Patterns**, or both. Review **Will apply** and any **Will skip** messages, then click **Apply style**.

A style captures the organizer color and relief, plus the colors and patterns of an existing shell and lid. A smooth body style removes the destination's body relief. Dimensions, compartment layouts, wall thicknesses, lid fit, handles, and shell clearances stay unchanged. Missing lids or shells are not added. Incompatible pattern settings are skipped with an explanation; compatible settings can still be applied. Insert colors and filament-slot assignments are not transferred.

Application is one undo step and creates an independent copy: later edits to one organizer do not change the others. Deleting a saved style does not change projects that already use it.

Saved styles belong to this browser and site address. A project JSON preserves the applied appearance, but does not include the saved-style library. To reuse a style on another device, open the styled project's JSON there and save its current style again.
