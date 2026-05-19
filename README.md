# Fast React Pizza Co

A React + Vite pizza ordering dashboard built with Tailwind CSS, Redux Toolkit, and React Router.

## Features

- Menu browsing with individual pizza items
- Add items to cart and update quantity
- Create, search, view, and update orders
- User creation and order assignment flow
- Responsive layout using Tailwind CSS
- Global state management with Redux Toolkit

## Tech stack

- React 19
- Vite
- Redux Toolkit
- React Router DOM
- Tailwind CSS
- ESLint

## Project structure

- `src/App.jsx` — main app container and route setup
- `src/main.jsx` — React entry point
- `src/index.css` — global styles
- `src/Store.js` — Redux store configuration (see [Redux Documentation](./README_REDUX.md) for details)
- `src/features/cart/` — cart components and slice
- `src/features/menu/` — menu listing components
- `src/features/order/` — order CRUD components
- `src/features/user/` — user creation and display components
- `src/services/` — API helpers for geocoding and restaurant data
- `src/ui/` — shared UI components
- `src/utils/helpers.js` — reusable helper functions

## Redux Documentation

For a complete guide on how global state, slices, actions, selectors, and async thunks are managed in this project, check the dedicated [Redux Architecture & State Management README](./README_REDUX.md).

## Setup

1. Install dependencies

   ```bash
   npm install
   ```

2. Start development server

   ```bash
   npm run dev
   ```

3. Open the local URL shown in the terminal

## Scripts

- `npm run dev` — start Vite development server
- `npm run build` — build production assets
- `npm run preview` — preview production build locally
- `npm run lint` — run ESLint

## Notes

- The app is configured as a private package with Vite and Tailwind.
- Update API service files in `src/services/` if you need to connect to real backend endpoints.
- Use Redux slices in `src/features/*/*Slice.js` to adjust state logic.

## License

This repository is provided as-is for learning and demo purposes.
# Fast_React_Pizza
