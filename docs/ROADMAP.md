# ReplixGrid: organizers for your things

Updated: 4 November 2026.

## Direction

Start from the user's objects and available space: “My drawer is 280 × 180 mm, and it needs to hold a caliper, bits and adapters.” Help the user turn measured dimensions into organizers they can print.

This is the active product plan. The broader reliability, editing, interface and release proposals are preserved in [FOLLOW-UP-TASKS.md](FOLLOW-UP-TASKS.md) as subsequent tasks. Necessary bug fixes and verification remain part of each milestone.

## 1. Set the internal dimensions of a compartment

User scenario: measure an object, add a chosen clearance, select a compartment and enter its required internal width or depth.

Work:
- Establish how current compartment boundaries and partition thickness determine usable internal dimensions.
- Define which partition moves and which neighboring compartment gives up or receives space.
- Start with rectangular compartments and one editable internal dimension at a time.
- Show the resulting neighboring space; reject impossible dimensions with a useful explanation.
- Keep the change reversible in one undo operation and preserve it when saving/reopening.
- Extend to curved footprints only with explicit measurement semantics. A capsule can narrow toward its end: draw the dimension line at the actual measurement location and do not imply that the same clearance exists everywhere.
- Distinguish measured span from guaranteed object fit, especially around inner fillets. Automatic object fitting is outside this first milestone.

Acceptance:
- Entering 45 mm produces a measured internal span of 45 mm at the indicated location, within the documented geometry tolerance.
- Wall thickness and neighboring minimum space remain valid.
- Preview, saved project and exported geometry agree.
- Curved compartments never present a centerline span as a guaranteed full rectangular fit.

First deliverable: a local rectangular-compartment prototype, with a visible measurement and explicit partition movement.

Implemented and approved by the owner on 4 November 2026; included in the internal-dimensions release.
Rounded outside corners and inner fillets retain editable, contour-aware centreline dimensions.
Dimension labels support in-place editing on the model, with shared compartment drafts and editable wall/endpoint heights.
See [behavior and review steps](INTERNAL-DIMENSIONS-PROTOTYPE.md).

## 2. Explore variants of one project

User scenario: keep both a three-wide-compartment layout and a four-narrow-compartment layout.

Work:
- Build on the current project library and autosave.
- Duplicate the current model into a named variant.
- Switch quickly between the original and variants.
- Keep changes and undo histories separate; never overwrite another variant.
- Preserve variants through reopening and allow independent export.

Acceptance: creating, editing, switching and reopening two variants retains both designs and exports the selected one.

This prepares project switching for the drawer workflow. General multi-document tabs and an export queue remain follow-up work.

## 3. Apply a shared style to a set

User scenario: choose a Voronoi lid/shell pattern and colours once, then reuse that combination on another tray.

Work:
- Define a reusable style containing supported lid/shell pattern settings and colours.
- Save and apply the style without changing tray dimensions or compartment layout.
- Report unsupported settings for a particular shape or accessory instead of silently changing geometry.
- Keep the style application reversible.
- Decide explicitly whether applying a style is a snapshot or a live link; prefer a snapshot for the first prototype.

Acceptance: differently shaped organizers can share a recognizable pattern/colour scheme while preserving their individual geometry and export colour assignments.

## 4. Arrange a set of trays inside a drawer

User scenario: enter the drawer's internal dimensions, arrange several trays in top view, inspect remaining space and export the trays individually.

Work in small increments:
1. Define drawer width, depth and optional usable height, plus intentional clearances.
2. Add tray instances from saved projects/variants, initially using a simple supported placement model.
3. Move and rotate trays in top view; show boundaries, collisions and remaining space.
4. Open a tray for editing and return to the arrangement without losing placement.
5. Apply a shared style and save/reopen the complete set.
6. Export individually named trays, with clear printer-size checks.

Before implementation, settle whether tray instances are independent copies or linked to library projects. Automatic packing, arbitrary object recognition and text-to-CAD generation are outside the initial scope.

Acceptance:
- The 280 × 180 mm example can be arranged with explicit clearances.
- Overlaps and out-of-bounds trays are visible.
- Editing a tray triggers a fresh fit check.
- Saved arrangements retain tray geometry and placement.
- Individual downloads correspond to the selected trays.

## Delivery and demonstration

Sequence: internal dimensions → project variants → reusable style → drawer layout.

For each milestone: define exact behavior → implement locally → run focused geometry/save/export checks → user review → publish to main and STRATO when authorized → update the English guide.

Use the repository's Lazyweb workflow when actual product UI design begins. This document is planning only.

Demonstration target: show a real drawer and its contents, design a coordinated set in the browser, export it for printing, and place the printed trays in the drawer.
