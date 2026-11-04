# Changelog

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
