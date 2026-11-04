# Changelog

## Unreleased — Project variants

- Create a named independent variant of the current model, retaining the original.
- Switch between related variants in the header or My projects.
- Preserve separate undo/redo histories across switching and browser reloads (up to 60 states per direction).
- Keep Save a copy for a separate project; JSON backup/export remains specific to the selected model.
- Keep older library entries compatible without changing project JSON.

Local prototype; not deployed to the public site. See [VARIANTS.md](VARIANTS.md).

## 2026-11-04 — Exact dimensions and inline editing

- Set a compartment’s internal width or depth by moving the nearest applicable divider.
- Keep rounded outside corners and inner fillets, using contour-aware centreline measurements.
- Preview the moving divider and affected neighboring dimensions before applying.
- Edit compartment dimensions and wall/endpoint heights directly on the model in a compact number-and-unit field; the right panel remains available.
- Apply an inline edit by clicking outside or pressing Enter; cancel with Escape. Each committed change is one undo step.
- Explain sequential sizing for a simple row: start with compartment 1; the last receives the remainder. Neighboring sizes are not locked.
- Add geometry, export, draft and undo regression coverage and update the English guides.

Next milestone: named variants of a project, independent persistence and undo histories, fast switching and export of the selected variant. Variants are not part of this release.
