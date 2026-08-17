# Hospital Management System (HMS) — Frontend

A modern React + TypeScript frontend for a Hospital Management System (HMS). This repository contains the UI, components, styles, and GraphQL integration used to power the web client.

## Table of Contents
- **Project**: Short description and goals
- **Features**: Key functionality
- **Tech Stack**: Libraries and frameworks used
- **Getting Started**: Prerequisites, install, run
- **Development**: Scripts and common tasks
- **Project Structure**: Important folders and files
- **Contributing**: How to help
- **License**: License information

## Project

This frontend implements the user interface for a hospital management application: authentication flows, dashboards, clinical modules, tenant and user management, reports, and integrations with a GraphQL backend. The UI is built with TypeScript and React and is organized into reusable components and feature modules.

## Features
- Authentication (login, MFA, forgot password)
- Role & tenant management UI
- Dashboards, charts, and reporting pages
- Reusable component library (tables, forms, modals, charts)
- GraphQL queries & mutations integration
- Localization / i18n support

## Tech Stack
- React
- TypeScript
- GraphQL (client queries/mutations)
- Styling: CSS, styled components (project-specific)
- Testing: Jest & React Testing Library
- Build: Create React App / Vite (project-configured)

## Getting Started

Prerequisites

- Node.js (LTS recommended)
- npm or yarn

Installation

```bash
npm install
# or
yarn install
```

Running locally

```bash
npm start
# or
yarn start
```

Build for production

```bash
npm run build
# or
yarn build
```

Run tests

```bash
npm test
# or
yarn test
```

## Development

- Linting and formatting: check package.json scripts for `lint` and `format` commands.
- GraphQL: queries and mutations live under the `graphql/` folder.
- i18n: localized strings are in `locales/`.

## Project Structure (high level)

- `src/` — application source
  - `components/` — reusable UI components
  - `molecules/`, `pages/`, `Icons/` — domain components and pages
  - `graphql/` — queries and mutations
  - `features/` — feature modules
  - `assets/`, `styles/`, `utils/` — static assets and helpers
- `public/` — static files

Refer to the code for specific implementations and component usage.

# hospital-management-system-HMS