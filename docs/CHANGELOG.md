# Changelog

## 2026-11-06 — Surface patterns, compact editors and whole-drawer export

- Use your own SVG artwork on lids and perforated shells in Pattern Studio, with separate lid and shell tabs.
- Keep tool navigation on the left and edit the selected section in a compact, centered panel below the model.
- Switch visible parts above the model, in the center; on smaller windows the switches occupy their own row.
- Export the whole drawer as a ZIP of 3MF print beds, including mounting plate sections and organizer accessories. The bed count uses the configured printer dimensions.
- Updated the [Quick Start](USER-GUIDE.md#find-your-controls) and [full user guide](REFERENCE.md) for the current controls, SVG surfaces and drawer export.

## 2026-11-05 — Custom SVG relief

- Import filled SVG artwork into a local library and apply it to selected organizer walls.
- Place one motif or repeat it with adjustable size, rotation, position and spacing.
- Keep repeated motifs whole at wall edges and cutouts, including small patterns.
- Carry SVG contours with saved projects and shared styles; export the relief for printing.

See [Custom SVG relief](REFERENCE.md#custom-svg-relief) for supported files and instructions.

## 2026-11-04 — Drawer arrangements

- Start with measured drawer dimensions and clearance in the separate Drawer workspace.
- Create organizers directly in a drawer or add independent copies of saved projects and variants.
- Move, rotate, duplicate and edit trays, with assembled size and clearance checks.
- Save multiple drawers locally, transfer layouts as JSON and export individual trays.
- Rotate the viewing orientation without changing physical dimensions or exports.

See [Drawer arrangements](REFERENCE.md#drawer-arrangements) for instructions. Placement is free; this release does not generate a mounting plate.

## 2026-11-04 — Wrapped shells on stacked trays

- Bottom trim is now available on the first tier of a stack, including wrapped shells. Upper tiers keep their hidden joints without decorative bottom trim.

- Add tiers while retaining a wrapped shell.
- Hide the joint inside the lower wall and a socket below the upper floor, preserving compartment dimensions.
- Export a separate shell for each decorated tier. Fit shells from above before stacking; matching shells meet at a narrow support band.

## 2026-11-04 — Shared styles

- Save named color and pattern styles for reuse across projects and variants.
- Apply colors, patterns, or both in one undo step, preserving dimensions and layout.
- Review incompatible or missing components before applying.
- Keep applied appearances independent of the saved-style library.

See [Shared styles](REFERENCE.md#shared-styles) for instructions.

## 2026-11-04 — Project variants

- Create a named variant while keeping the original model.
- Switch between related variants in the top bar or My projects.
- Keep separate undo/redo histories after switching and reopening the browser.
- Rename, delete or download each variant independently.
- Use Separate project to save an unrelated copy.

See [Project variants](REFERENCE.md#project-variants) for instructions.

## 2026-11-04 — Exact dimensions and inline editing

- Set a compartment’s internal width or depth by moving the nearest applicable divider.
- Keep rounded outside corners and inner fillets, using contour-aware centreline measurements.
- Preview the moving divider and affected neighboring dimensions before applying.
- Edit compartment dimensions and wall/endpoint heights directly on the model in a compact number-and-unit field; the right panel remains available.
- Apply an inline edit by clicking outside or pressing Enter; cancel with Escape. Each committed change is one undo step.
- Explain sequential sizing for a simple row: start with compartment 1; the last receives the remainder. Neighboring sizes are not locked.
- Update the English instructions for editing dimensions and wall heights.
