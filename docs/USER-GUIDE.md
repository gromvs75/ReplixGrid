# ReplixGrid user guide

Current as of November 2, 2026. Control names may differ with the selected language. ReplixGrid creates geometry for printing; final print preparation happens in your slicer.

## Create an organizer

1. Open the app and choose a shape or template. Set the width, depth, height, and thicknesses. Some settings depend on the chosen shape and other options.
2. Select a compartment and split it. Select and move dividers to change the layout; the top view makes positioning easier.
3. Select an outer wall or divider to adjust its height and available transitions. If desired, configure rounded corners, a decorative shell, panels, or inserts. The interface warns when settings are incompatible.
4. Inspect the model from several angles in 3D. Clearances and fit depend on the printer and material, so print a small test piece first when using a new combination.

## Projects and backups

Open **My projects** and save a named copy. The open project saves automatically. You can also search, rename, open, delete, or download projects there. Unnamed work is retained as a draft. Download a project JSON file as a backup or to transfer it, and use the project import control to open it. A damaged file should report a validation error without replacing the current project.

The library is stored in your browser and tied to the site address. Clearing site data or changing browsers, devices, or addresses can make it unavailable. Keep a separate project-file backup. Filament slots are stored separately in the browser and are not included in project JSON; configure them again on another device.

## Prepare and export

1. In **Print**, choose your printer and configuration or enter your build volume. Presets set dimensions only; they do not supply printer or material profiles.
2. If needed, configure filament slots. On a U1, the first four correspond to T0–T3. In the export dialog, assign available slots to parts. Orca may assign the first filament to parts left unassigned.
3. Choose the parts and format. **3MF** contains parts, colors, and selected slot assignments. **STL** does not contain color; multiple STL files download as a ZIP. **OBJ** uses an accompanying MTL for colors. 3MF does not include printer or filament profiles.
4. Wait for the checks and download the file. Checks cover mesh closure and individual part dimensions, with a 2 mm margin at the bed edges. They do not check placement of the complete kit, overhangs, or fine features.
5. Open the file in your slicer. Check the millimeter scale, orientation, arrangement of all objects, colors, and slot numbers. Choose your own printer and material profiles, slice the model, and inspect the layers before printing.

The owner confirmed import of a kit with three assigned slots in Snapmaker Orca 2.4.1. This does not guarantee compatibility with every slicer or model.

## Print a large organizer in sections

In **Print**, set the build volume and choose two or three sections, or use the suggested cuts. The app raises wall thickness to at least 5 mm and floor thickness to at least 3 mm, changing compartment sizes. Shells and inserts are unavailable when splitting; the app prompts you to remove them. Some shapes and settings also restrict splitting.

Download the joint sample, place its halves separately, and print at 100% scale. Once cool, check the fit of the pins. Then download the kit, inspect all parts in the slicer, print them, and assemble them after cooling using pins and glue. Nominal pin dimensions are Ø 3.2 × 8 mm; each hole is Ø 3.3 mm and 4.5 mm deep. Fit and strength depend on print settings, material, and glue quality. The owner tested and accepted this joint for organizers; that does not validate every combination.

## Shells

A one-piece decorative shell is built around the organizer body. Automatic support and compatibility are limited: decorative panels, tiers, split printing, tilted walls, and special settings have separate constraints. If the interface reports an incompatibility, adjust the settings and inspect the result in both preview and slicer. Geometry tests do not guarantee the physical fit of every variant.
