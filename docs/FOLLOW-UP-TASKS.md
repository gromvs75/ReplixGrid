# ReplixGrid follow-up tasks

Saved on 4 November 2026 as subsequent work. The active product plan is ROADMAP.md. This list does not supersede that plan; overlapping items should be reconciled when scheduled.

## Product direction

Help people design and print useful organizers without CAD knowledge. Keep the compact interface, local project storage and existing slicer profiles. Build on the existing shapes, compartments, inserts, lids, shells, decoration, print preparation and Help documentation.

The existing project library already has thumbnails, search, renaming, file download and autosave. Extend these capabilities rather than rebuilding them.

## 1. Reliability and recovery

- Retain a reproducible project fixture for each reported geometry failure.
- Check targeted combinations of cutouts, sloped walls, inner rounding and top-edge finishing, including exported geometry.
- Explain geometry failures in terms of the affected part and suggest a useful recovery action.
- Keep the last successful preview distinguishable from the current calculation; prevent exporting stale geometry.
- Verify recovery from an interrupted calculation and safe reopening of saved projects.

Done when: reported cases build and export correctly; failed calculations do not lose edits or present stale results as current. Existing connection-strength tests need not be repeated.

First task: audit preview/export error handling and make a short list of reproducible failure cases before changing behavior.

## 2. Faster everyday editing

- Add an explicit duplicate-project / save-as-variant action.
- Add reusable personal presets for frequently used dimensions and supported settings.
- Support applying a chosen wall setting to several selected walls, with clear scope and one undo action.
- Improve numeric entry where necessary: exact millimetres, predictable limits and useful reset actions.

Done when: a user can create two variations of an existing organizer without overwriting the original, and can apply a shared setting without editing each wall individually.

## 3. Working on several projects

- Define project tabs or an equivalent quick switcher, building on the current library.
- Keep selection, camera and undo history separate for each open project.
- Associate background calculations and export jobs with the correct project revision.
- Handle simultaneous browser tabs without silently overwriting newer edits.
- Introduce a small, bounded export queue only after project isolation is verified.

Done when: switching projects during a calculation or export cannot mix geometry, names, colours or saved data. No server accounts are required for this phase.

## 4. Useful new capabilities

- Add curated use-case presets: desk, drawer, tools and small parts.
- Explore a drawer layout containing several independent trays; define spacing and available drawer dimensions first.
- Reuse a coordinated style across organizer, shell and lid.
- Extend pattern controls only where they improve real outcomes: scale, rotation and border width.
- Prototype custom SVG decoration separately; define geometry complexity limits before integrating it.

Done when: each feature has a complete create/edit/save/reopen/export workflow. Drawer layout and SVG import are separate deliverables, not prerequisites for simpler presets.

## 5. Interface refinement

- Review long translations and narrow tablet layouts across the existing controls.
- Keep common settings easy to reach and advanced settings progressively disclosed.
- Improve selection and part visibility when the model contains a shell, lid or inserts.
- Add concise contextual guidance linked to the English User Guide.
- Check keyboard navigation, readable focus states and light/dark contrast.

Done when: main workflows remain compact and readable across supported languages and tested screen sizes. Follow the repository's Lazyweb workflow when actual UI design work begins.

## 6. Release and feedback workflow

- Prepare a repeatable build and deployment process tied to a specific main commit.
- Verify live assets and keep a recoverable previous release.
- Maintain brief release notes and update the English guides with each feature.
- Review available usage data; define any additional event collection separately before implementation.
- Prioritize the next iteration using actual failure reports and user workflows.

Done when: the deployed version is traceable to GitHub and each release has verification evidence and a documented rollback path.

## Delivery rhythm

For each small milestone:
1. Define the user scenario and acceptance criteria.
2. Implement locally with focused checks.
3. Show the working result for user review.
4. Publish to main and STRATO when authorized.
5. Verify the public version and update documentation.

Scheduling is deferred until the active product milestones in ROADMAP.md are reviewed. Necessary bug fixes and release checks still accompany each milestone.

Do not introduce subscriptions, a marketplace, mandatory accounts or cloud synchronization as part of this plan. Revisit them only if user needs justify a separate scope.
