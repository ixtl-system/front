# iXTL

iXTL is a React-based web application for managing xamanic events. The platform allows users to register, manage profiles (including personal and medical information), and register for ayahuasca and other shamanic ceremonies.

## Features

* **User Authentication** (Sign In / Sign Up / Log Out)
* **User Profile Management**

  * Collect and update personal information (CPF, RG, contact)
* **Medical History**

  * Register diseases and medications
  * Dynamic form fields for "Other" entries
  * List and remove entries
* **Event Management**

  * Fetch and display event types and event listings
  * Create, update, and view event details
  * Register users for events based on profile completeness
  * Manage event registrations and statuses

## Tech Stack

* **Frontend**: React, React Hook Form, Zod, Ant Design
* **State Management**: React Context API
* **HTTP Client**: Axios (wrapped as `api`)
* **Backend**: Exposes RESTful endpoints for authentication, user profiles, medical history, and events

## Visual Identity

The interface follows a calm, nature-inspired art direction to honour Brazilian Indigenous and Lakota roots.

### Color Palette

| Role | HEX |
| --- | --- |
| Canvas gradient | `#FFF7EC` → `#F2E5D5` → `#EDDCC7` |
| Primary forest green | `#6F8F72` |
| Deep forest green | `#5F7E63` |
| Warm earth accent | `#8E6C4A` |
| Soft clay highlight | `#F8ECDA` |

### Interactive Elements

* **Primary buttons & confirmations**: gradient from `#6F8F72` to `#5F7E63` with hover darkening to `#4F6D53`.
* **Secondary / outline controls**: translucent cream backgrounds with `#6F8F72` borders and text; hover fills with the primary gradient.
* **Status pills and cards**: use tonal variations of the palette (e.g., `rgba(111, 143, 114, 0.12)` for info bands, `#FFE8E6` for warnings).

### Typography

* **Font family**: "Montserrat", sans-serif across headings and body copy.
* **Hierarchy**:
  * Display titles: 36–52px, bold, tight line-height (1.1).
  * Section titles: 26–34px, bold.
  * Body copy: 14–18px, medium weight with 1.6–1.7 line-height for readability.

### Spacing & Layout

* Large rounded containers (24–36px radius) with generous padding (24–48px) to create breathing space.
* Grid-based cards (`minmax(260px, 1fr)`) and flexible wraps keep event and participant lists comfortable on all screen sizes.
* Soft drop-shadows (0 24px 40px rgba(79, 64, 46, 0.22)) reinforce floating panels without harsh contrast.

### Reusable Patterns

* **Gradient panels** for hero/summary sections to convey light and depth.
* **Pill-shaped buttons** with consistent hover/active feedback.
* **Blurred glass highlights** (`backdrop-filter: blur(6px)`) for key cards and overlays, ensuring legibility over textured backgrounds.
* **Modal styling** standardised with the same gradient background and rounded geometry as the main layout.

## Installation

1. Clone the repository:

   ```bash
   git clone <repo-url>
   ```
2. Install dependencies:

   ```bash
   yarn install
   ```
3. Configure environment variables:

   ```env
   REACT_APP_API_BASE_URL=https://api.yourdomain.com
   ```
4. Run the development server:

   ```bash
   yarn start
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

## License

MIT © Your Name
