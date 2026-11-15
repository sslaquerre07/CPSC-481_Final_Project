# React Starter

A React and TypeScript application scaffolded with Vite, Redux Toolkit, React Redux, and Material UI.

## Getting started

```sh
npm install
npm run dev
```

## Available scripts

- `npm run dev` starts the development server.
- `npm run build` type-checks and builds the app for production.
- `npm run lint` checks the source with Oxlint.
- `npm run preview` serves the production build locally.

## App structure

- `src/store/index.ts` configures the global Redux store.
- `src/store/hooks.ts` exports typed Redux hooks.
- `src/store/counter/` contains the counter reducer, selector, and state type.
- `src/store/persistence.ts` restores and saves the complete Redux state.
- `src/components/NavigationTile.tsx` is the reusable clickable dashboard tile.
- `src/pages/` contains the POV selector and student/staff dashboard pages.

The Redux state is saved in `localStorage` and restored on page load, so it survives refreshes and browser restarts until cleared.

The app starts at `/`, where users can choose the student or staff view. Dashboard tiles link to placeholder feature pages that can be implemented later.
