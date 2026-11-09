# Your first ReplixGrid organizer

## First visit and a clean start

The first visit opens a blank workshop. Use the panel beside the left menu: **1. Choose a shape → 2. Set dimensions → 3. Add compartments**. Each step opens inside the panel while the canvas stays interactive. Use **Next: compartments**, then **Done**; or choose **Keep without dividers**. The helper can be closed with **×** after choosing a shape. You can also open a saved project or JSON file.

**On smaller screens:** when the browser window is 1400 px wide or less, the helper appears **below the model** so it does not cover the preview. Scroll down the **page** to reach the helper, the next steps, and the **Next: compartments** and **Done** buttons. Scroll back up to view the model. On wider screens, the helper stays beside the left menu.

Reopen the helper at any time with **Help → Helper: three steps**. Opening it keeps the current model; choosing another shape replaces the model and can be undone.

All Help menu labels follow the selected interface language. Quick Start and User Guide open in that language. The video is in English.

The helper follows the interface language, including all three steps, hints and the saved-project confirmation. The saved-project row uses the translated label **Previous project**. Actual project names in **My projects** remain as you saved them.

To start again, click **New project** in the top bar. Your previous work is saved in **My projects**, including an unnamed draft. A thumbnail row labelled **Previous project** in the helper confirms what was saved; click it to open the library. The canvas is cleared immediately and stays empty until you choose a new shape. The new model starts without dividers or accessories (Honeycomb retains its connected cells). Returning to an existing project restores its saved work. Choosing a template inside **Shape → Base** changes the current model; **New project** creates a separate one.


[Open ReplixGrid](https://grid.replixcast.com/?lang=en) · [User Guide — full feature reference](REFERENCE.md)

Start with a three-compartment organizer for your desk. The example below is 180 × 90 mm, with a low front for easy access and a taller back. All you need to design it is a browser. To prepare the file for your printer, open it in your usual slicer.

[Watch the Quick Start video in English (1:03)](https://grid.replixcast.com/guides/quick-start-en.mp4) to see how to split a compartment, bevel the top edges, add a two-tone lid and export a 3MF.

## Find your controls

- **Upper left:** choose **Shape**, **Compartments**, **Shell** or **Print**. The left menu lists the sections of that tool.
- **At the bottom of the preview:** selecting a section opens a compact, floating settings editor. The scene and grid continue behind it. Only the selected section appears here. Use the chevron to collapse it or **×** to close it; choose another section on the left to continue.
- **Above the model, in the center:** **Assembly**, **Organizer**, **Inserts**, **Shell** and **Lid** control which parts you see. For stacked designs, use the tier dropdown beside **Organizer** to select the active tier without closing the bottom settings editor. Choose **View stack** in the same dropdown to see all tiers and accessories together. Available buttons depend on your design. On narrower windows, they move onto a separate row below the toolbars.
- **On the right:** click a compartment number, wall or divider to edit that element.

In **Shape**, start with **Base**, then use **Dimensions**. In **Shell**, choose the pattern, shell type, color, thickness/rim and fit in their separate sections. In **Print**, choose a printer, configure filament slots, or open the section-printing controls.

While you move a slider, the model updates as each calculation finishes. Complex models may take longer; the final value is always calculated at full precision. Wait for the finished preview before checking or exporting the result. Editor notifications disappear after 10 seconds, or you can close them with **×**.

The Quick Start video was recorded with the earlier panel layout. The modeling steps still apply; use the locations above to find the current controls.

## Build the example

1. **Open** [grid.replixcast.com](https://grid.replixcast.com/?lang=en). Use the language menu in the top bar to change languages. If you already have a design you want to keep, click **Save project** to download an editable copy before starting.
2. **Create the body.** Open **Shape**, choose **Capsule** under **Base** and **Sloped** under **Height profile**, then click **Create from template**. The preview should show two dividers and three numbered compartments. The rim rises from 22 to 70 mm. Creating a template replaces the current design; the curved undo arrow restores it.
3. **Fit it to your space.** Under **Shape → Dimensions**, enter the outside width and depth in millimeters. Click a numbered compartment to read its inside dimensions. Under **Internal dimensions**, enter the required width or depth, or click the blue dimension label on the model and type the value. Click outside to apply. Start with compartment 1 and work in order in a simple row; the last compartment receives the remainder. Rounded ends can narrow away from the measurement line, so check the object footprint and leave clearance.
4. **Adjust the layout if needed.** Switch to **Top**, select a compartment, set **Number of parts** to **2**, then click **Split in width** or **Split in depth**. Only the selected compartment splits. Click a divider to adjust its position, or select an element from **All walls and compartments** in the right panel. Moving a selected divider changes the compartments on either side while keeping other divider positions fixed. Return to **3D** to inspect the result.

5. **Finish the top edges (optional).** Under **Shape → Corners and chamfers**, find **Top edge of walls and dividers**. Choose **Chamfer** for a flat bevel or **Rounded** for a curved edge. Enter the size in millimeters; the maximum depends on wall thickness so a flat strip remains on top. The finish follows both sides of the exterior walls and dividers. Choose **None** to restore square edges. When combining a cutout, internal corner rounding and a sloped or tilted body, wait for the finished preview before downloading. Check the final dimensions in the download dialog: tilting can increase the outside footprint. Cutouts in individual honeycomb edges are not supported.

![Shape controls and a finished sloped capsule with three compartments](images/capsule-sloped.jpg)

## Try a two-tone lid (optional)

A lid needs a level rim. If you want to keep the sloped capsule from the example, click **Save project** first. Then choose **Capsule** and the **Flat** height profile under **Shape**, and click **Create from template**.

1. Open **Shape → Lid** and add a lid. Under **Lid fit**, choose **Overlapping** for a lid that covers the rim or **Inset** for a lid that sits flush inside it. The two-tone inset lid needs walls at least 2 mm thick and an inside depth of at least 5.2 mm.
2. Enable **Two-tone pattern** and choose a **Lid pattern**. To try the fan-shaped leaves in the gallery, select **Ginkgo leaves**.
3. Set **Lid base color** to the background color and **Lid pattern color** to the color of the drawing. For the combination shown below, choose cream for the base and olive green for the pattern.

Choose the lid base, pattern and handle colors from **Slicer filaments** in their color popups. Set up those slots under **Print → Slicer filaments** first. **Match lid base** links the handle to the lid base; choosing a different handle color makes it independent. Export as 3MF to retain colors and check the filament assignments.

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

Applied edits are saved immediately. If a write is interrupted, reopening the app restores its temporary recovery copy. If the current session is damaged, the app tries its last successful snapshot. When neither copy can be restored, automatic saving stops to protect the stored data; use **Open** to restore a downloaded JSON backup. If saving reports an error, download a project backup before leaving.

Export checks use the latest applied edits and the selected parts. After changing dimensions or mounting placement, wait for a new check before downloading.

When the same project or drawer is edited in multiple tabs, conflicting changes are saved as a separate **Copy from another tab**. The other version is kept, and the editing tab continues with its copy. Compare the versions in **My projects** or the drawer selector and rename the copy if you want to keep it. Reopening an organizer tab restores its own saved project. Changes are not automatically merged between tabs.

The library is stored in your browser and tied to the site address. Clearing site data or changing browsers, devices, or addresses can make it unavailable. Keep a separate project-file backup. Filament slots are stored separately in the browser and are not included in project JSON; configure them again on another device.

## Filaments and export options

For a multicolor 3MF, configure the available slots in **Print** with the same numbers and colors as your slicer. On a Snapmaker U1 the first four correspond to T0–T3. Assign a slot to each part in the download dialog, then verify the assignments in Snapmaker Orca. Unassigned parts may use the first filament. Your printer and material profiles come from your slicer.

For a colored OBJ, keep the OBJ and its MTL file in the same folder. The export check allows a 2 mm margin at the bed edges for each part. Arrange the whole kit and check overhangs and fine details in the slicer.

## Print a large organizer in sections

In **Print**, set the build volume and choose two or three sections, or use the suggested cuts. The app raises wall thickness to at least 5 mm and floor thickness to at least 3 mm, changing compartment sizes. Shells and inserts are unavailable when splitting; the app prompts you to remove them. Some shapes and settings also restrict splitting.

Download the joint sample, place its halves separately, and print at 100% scale. Once cool, check the fit of the pins. Then download the kit, inspect all parts in the slicer, print them, and assemble them after cooling using pins and glue. Nominal pin dimensions are Ø 3.2 × 8 mm; each hole is Ø 3.3 mm and 4.5 mm deep. Fit and strength depend on print settings, material, and glue quality.

## Shells

Dense shell patterns can take several seconds to recalculate. If a shell fails to build, the successfully built organizer remains visible and the error stays available; this does not make the shell ready for printing. Correct the shell settings and run the download check again. Export still validates every requested part.

A one-piece decorative shell is built around the organizer body. When adding a shell pattern to a stacked organizer with bottom trim, the app selects a one-piece shell automatically; the trim remains on the first tier. To use separate panels instead, open **Shell → Shell type → Decorative panels**. Panels preserve wall thickness and compartment sizes. With 2.4 mm walls and a 2 mm floor, leave **Hidden Mounts** off and glue the panels in place. Hidden fasteners require walls at least 3.2 mm thick without relief. Panel bottoms sit above the trim; **Edge offset** starts at the top of the trim and must be at least 3 mm on stacked trays. Legacy snap fittings and floors thinner than 1.2 mm cannot be combined with shell-supporting bottom trim. Inspect the preview and slicer output, and check the fit with a small print before printing a full set.


## Match another organizer

Use **Shape → Shared style** to save the current colors and patterns with a name. Open another project, choose that saved style, and click **Apply style**. You can transfer colors, patterns, or both while keeping the destination's dimensions and compartments. See [Shared styles](REFERENCE.md#shared-styles) for compatibility and browser-storage details.

## Use your own SVG pattern

Open **Shape → Organizer relief → My SVGs**, upload a filled SVG, and choose a single motif or a repeating pattern. Select the walls, set the width, rotation and position, then adjust relief depth. In repeat mode, only complete motifs are placed: reducing the width does not leave clipped fragments at edges or cutouts. Internal compartments stay unchanged. The pattern is embedded in the saved project. The same library works in **Shape → Lid → My SVGs** (raised pattern or through openings) and **Shell → Pattern → My SVGs** (perforations). For lids and shells, **My SVGs** opens the bottom **Pattern Studio**. Use its **Lid / Shell** tabs to switch surfaces and automatically isolate the corresponding part in the preview. The library is on the left; size, rotation, spacing and X/Y offsets are alongside it. Choose **Raised relief (decoration)** or **Through stencil (cut)** at the top of the right-hand settings. Relief height appears only for relief; repeat spacing appears only in repeat mode. **Material thickness** changes the generated plate (1.2–6 mm for an SVG lid, 1–4 mm for a shell). Existing lid defaults are 3.2 mm for relief and 2 mm for stencil; an explicitly chosen thickness is kept when switching modes. An inset SVG lid needs internal depth of at least its thickness plus 2 mm. Shell patterns always cut through the shell, so relief is unavailable there. Base color is under **Additional**; file requirements are under **Which SVG files work?**. Closing the studio keeps your changes. Frames and fitting surfaces are retained. For cutouts, add bridges to any enclosed inner details so they remain attached. See [Custom SVG relief](REFERENCE.md#custom-svg-relief) for supported files and limits.

## Print an entire drawer

In **Drawer**, choose **Print entire drawer**. Set the printer bed length (horizontal), width (vertical), print height and spacing between parts. Review the part count, calculated bed count and numbered layouts, then choose **Download all beds (ZIP)**.

The archive contains one 3MF per bed, bed diagrams, an assembly diagram and a copy of the drawer project. Open each 3MF as a separate job in your slicer. See [Whole-drawer export](REFERENCE.md#whole-drawer-export) for details.

### Ready-made stencil examples

Download [organic leaves](https://raw.githubusercontent.com/gromvs75/ReplixGrid/refs/heads/main/docs/examples/organic_leaf_pattern-stencil.svg) or the [double hexagon](https://raw.githubusercontent.com/gromvs75/ReplixGrid/refs/heads/main/docs/examples/3d_print_pattern-stencil.svg). Save as `.svg`, then upload through **My SVGs** on the lid or shell. For a lid choose **Through stencil (cut)**; shells already use that mode. Choose **Repeat** for multiple copies, start around 20 mm width and 4 mm spacing, and reduce width if the drawing does not fit. The hexagon file contains one repeatable tile; the leaf file contains five leaves. See [ready-to-use stencil instructions](REFERENCE.md#download-ready-to-use-stencil-svgs) for both surfaces and bridge sizing.

Numeric sliders display their actual **Min / Max** limits and a white value marker on a green permitted interval. The red end caps indicate values beyond the limits. You can also type an exact value.

### Before uploading an SVG

Use filled vector outlines up to 200 KB. Convert text and strokes to outlines and remove any unwanted background. Images, masks, clipping, filters, gradients, CSS style blocks and element references are not supported. A file that imports successfully is not automatically suitable for every surface.

Body and lid **relief** have solid backing. **Through openings** in lids and shells must leave connected material: enclosed details need stencil bridges. Increasing repeat spacing cannot fix an isolated detail inside the drawing. Width scales the whole SVG, including any grid already drawn in it. If a build fails, the last successful preview may remain; correct the settings before exporting. See [Choose an SVG for its intended use](REFERENCE.md#choose-an-svg-for-its-intended-use) for preparation steps and examples.

### Add text or an icon

Open **Shape → Label and icon**, choose the side, enter text and select a font or a star/heart. Adjust letter height, vertical position and raised or engraved depth. These sliders update the model while you drag; complex models refresh as each calculation finishes. Letter height is limited to the space on the selected wall beneath the current text. Lower walls and cutouts on other sides do not restrict it. Vertical position runs from the bottom (0%) to the highest safe position below the opening or cutout (100%). On circular and oval models the inscription follows the curved wall and is included in the print export. If it does not fit, shorten the text or reduce letter height.

### Relief on stacked trays

Select **Tier 1**, **Tier 2**, or another tier from the dropdown beside **Organizer** above the model, then open **Shape → Organizer relief** to choose a built-in pattern or your SVG. Each tier can have its own relief. Decoration stays on the exterior walls, clear of the smooth mating collars, tongues and sockets. Internal compartment dimensions remain unchanged. STL and 3MF exports include the relief and retain separate printable tier parts. Verify physical fit with a small test print when changing printer or material.

### Manage filament slots

Under **Print → Slicer filaments**, add up to 16 slots and set a name and approximate preview color for each. Configure the exact shade and any color mixing in your slicer; ReplixGrid does not calculate mixing recipes. Select any card and click **Delete filament from slot N** to free that number without renumbering the others. **+ Slot N** restores the lowest free number. Model colors remain unchanged. Check the slot assignments again before exporting 3MF, especially after deleting a filament.

To match a digital color from your slicer, paste its six-digit **HEX code**, for example `#E63522`, beside the color picker. The leading `#` is optional. Valid codes update the preview immediately; incomplete or invalid text is not applied and reverts to the saved color when you leave the field. A matching HEX code does not simulate filament appearance, lighting or a physical color mixture.
