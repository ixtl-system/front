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

## Installation

1. Clone the repository:

   ```bash
   git clone <repo-url>
   ```
2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```
3. Configure environment variables:

   ```env
   REACT_APP_API_BASE_URL=https://api.yourdomain.com
   ```
4. Run the development server:

   ```bash
   npm start
   # or
   yarn start
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

## License

MIT © Your Name
