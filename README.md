# ReplixGrid

![ReplixGrid organizer concept](docs/images/replixgrid-cover.png)

ReplixGrid is a local-first browser tool for designing customizable 3D-printable organizers. Set the dimensions, arrange compartments, adjust walls and add supported accessories or decorative shells, then export the parts for a slicer. No CAD application, account or application backend is required.

The interface is available in 11 languages. Translation catalogs need further native-speaker review. Printer presets set the build volume only; select the actual printer and material profiles in your slicer. ReplixGrid is an independent project and is not an official Snapmaker product.

## Get started

For a local development copy, install Node.js and npm, then:

```sh
npm ci
npm run dev
```

Open the local address printed by Vite (normally <http://127.0.0.1:5173/>). See the [user guide](docs/USER-GUIDE.md) for editing, saving, exporting and printing, and the [developer guide](docs/DEVELOPMENT.md) for architecture and checks.

## Current status and limitations

A whole organizer with a shell has been physically printed; panel attachment fit and a section joint using pins and glue have also been tested by the user. A three-slot 3MF kit was imported in Snapmaker Orca 2.4.1. These observations do not validate every model, printer or combination of settings.

- Download project JSON files for backup. Browser storage is local to the browser and site address; clearing it can remove projects. Filament slots are stored separately and must be configured again on another device.
- Split printing currently requires removing shells and inserts. Sections use pins and glue; wall and floor thicknesses increase to at least 5 mm and 3 mm respectively.
- Check placement of all parts, overhangs, fine features, filament assignments and print settings in the slicer. Export checks do not replace slicing or a fit test.

## License

ReplixGrid is available under the [MIT License](LICENSE). Third-party components have their own licenses; the Droid font outline notice is retained in [src/fonts/NOTICE](src/fonts/NOTICE).
