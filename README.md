# Neefoon Website

Marketing website for [Neefoon](https://neefoon.com) — a real-time AQI (Air Quality Index) app for Thailand, Southeast Asia, and worldwide.

Built with **React 19**, **TypeScript**, and **Vite**.

---

## About the App

Neefoon (หนีฝุ่น) means "escape the dust" in Thai. The app brings live AQI data, fire hotspot maps, worldwide city rankings, and station-level pollutant history to mobile — with no ads, no signup, and no tracking.

This repository is the public website that advertises the app and handles donations.

---

## Pages

| Route        | Description                                                      |
| ------------ | ---------------------------------------------------------------- |
| `/`        | Home — hero, AQI explainer, features, screenshots, data sources |
| `/about`   | About the project and its maker                                  |
| `/support` | Donation page (Stripe)                                           |
| `/privacy` | Privacy policy                                                   |
| `/terms`   | Terms of service                                                 |

---

## Tech Stack

| Tool         | Version | Role                    |
| ------------ | ------- | ----------------------- |
| React        | 19      | UI framework            |
| TypeScript   | 6       | Type safety             |
| Vite         | 8       | Build tool & dev server |
| React Router | 7       | Client-side routing     |

The site also uses a lightweight custom i18n system (English and Thai) built on React Context, with no external translation library.

---

## Getting Started

**Requirements:** Node >= 20.19

```bash
# Install dependencies
npm install

# Copy the example env file and fill in your values
cp .env.example .env

# Start the development server
npm run dev

# Build for production
npm run build

# Preview the production build locally
npm run preview
```

---

## Environment Variables

Copy `.env.example` to `.env` before running the dev server or building.

| Variable         | Description                              | Example                               |
| ---------------- | ---------------------------------------- | ------------------------------------- |
| `VITE_API_URL` | URL of the backend API (AQI data server) | `http://localhost:3000` (local dev) |

For production, set `VITE_API_URL` to your production API URL.

---

## Project Structure

```
src/
  components/
    sections/     # Page sections (Hero, Features, AQI Explainer, etc.)
    Footer.tsx
    Navbar.tsx
  pages/          # Route-level components (Home, About, Support, ...)
  i18n/           # Language context + English and Thai translation files
  hooks/          # Custom React hooks (e.g. scroll-reveal)
  styles/         # Per-page and shared CSS modules
  types/          # Shared TypeScript types
```

---

## License

This source code is shared publicly for reference. All content, branding, and design remain the property of the Neefoon project.
