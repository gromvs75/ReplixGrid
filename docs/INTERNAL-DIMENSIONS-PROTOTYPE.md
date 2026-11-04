# Internal dimensions — behavior and verification

4 November 2026. Owner-reviewed implementation, included in the internal-dimensions release.

Select a leaf compartment, choose Width or Depth, and enter millimetres. Focusing
the input opens top view. The orange line marks the existing divider; the dashed
blue line previews its new centre. The dimension line spans the proposed inner
faces at the compartment centre. Apply commits one undo operation; typing alone
does not change the project or its export. Other affected compartments are listed
with their before/after dimensions. Invalid input disables Apply.

The blue measurement label on the model is also editable. Click it, type a
dimension, then click outside the field or press Enter. Escape discards the draft.
The compact editor contains only the number and mm unit.
The inline input and sidebar share a draft and neighbor preview. Leaving the input applies a valid draft; invalid input is discarded. Selecting another object,
switching axes, or undoing/replacing the project clears stale drafts. Each apply
creates one undo operation. Read-only dimensions with no movable divider are
still shown but cannot be edited.

Selected walls and dividers show editable height labels on the model in 3D and
top view. Flat walls have one height; two-point profiles have A/B labels. Enter
or clicking outside applies; Escape cancels. Existing linked-height and stepped
wall rules are shared with the sidebar. A wall-height draft does not alter the
model until confirmed; the sidebar updates after confirmation. Wall length and
global wall thickness remain controlled by the existing shape settings.

The closest ancestor split on the requested axis moves. Perpendicular splits
below that ancestor share the same dimension, so an entire row may change.
Existing ratios within both branches remain unchanged. The limits account for
all nested compartments and their 2 mm minimum, not just the immediate neighbor.
No matching split means the exterior walls fix that dimension: split the cell
or change the overall shape dimensions.

Rounded outside corners, capsule-like rounded rectangles, chamfers and inner
fillets are now supported without changing their configured radii. Circle,
oval, honeycomb and tilted walls remain unsupported for exact compartment editing.

Dimensions are measured on the centreline of the selected region, clipped to
the actual inner footprint and inner fillets, just above the floor. The inverse
solver moves the nearest partition to obtain that measured span. The kernel and
measurement share the same fillet polygons and their 0.005 mm union overlap.
The requested centreline value is solved within 1e-6 mm; exported endpoints are
checked within 0.0001 mm (float32 STL and rounded-offset tessellation). The panel
shows neighbouring centreline width × depth. Rounded corners narrow the space
elsewhere: this is not an automatic object-fit check or an insert dimension.
Labels show two decimals. Only the existing split ratio is changed.

The project schema and export pipeline are unchanged: only the existing split
ratio is saved. Wait for “Saved in this browser” before closing/reloading, or
download the project JSON. Existing autosave uses a 350 ms debounce.

Review example: split the default 100 × 100 mm tray along its width, select
compartment 1, enter 45, inspect compartment 2 changing from 47 to 49 mm, and
Apply. Undo returns both to 47 mm; redo restores 45/49. Try 100 mm to see the
range error. The external dimensions and 2 mm divider thickness remain fixed.

Focused automated coverage: both axes and both branches, shared boundaries,
nested minimum-space limits, numerical endpoints, rounded contours, inner fillets, unsupported shapes,
JSON round-trip, one-step undo/redo, and exported STL inner-face coordinates.

Lazyweb report: https://www.lazyweb.com/report/lazyweb/0f770e7d-bb9e-4fd7-bbc5-66ba79f558fe/?source=create

For a simple sequential row, set compartment 1 first and continue in order. The last compartment receives the remaining space. Neighboring sizes are not locked; changing an earlier boundary can change a later compartment. The sidebar shows this hint only for the applicable row layout.
