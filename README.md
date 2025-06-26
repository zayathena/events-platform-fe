# Launchpad Project - Events Platform Frontend

A responsive frontend platform for discovering and signing up for events in Liverpool. Users can browse and view events from Ticketmaster as well as local community events, register for an account, and sign up for events. Staff users have additional privileges to create and delete events. The app also integrates with Google Calendar for adding signed-up events.

---

## 📋 Project Overview

The Events Platform Frontend is built with React and provides a dynamic, user-friendly interface for interacting with the Events Platform API. Key functionality includes:

- **Event Browsing:** View a curated list of both Ticketmaster and local events.
- **User Authentication:** Register, log in, and manage personal event signups.
- **Staff Tools:** Staff users can create and delete events.
- **Google Calendar Integration:** Easily add confirmed events to your Google Calendar.
- **Responsive & Accessible:** Optimized for various device sizes and accessibility standards.

---

## ✨ Features

- 🗓️ **Browse Events:** Seamlessly browse through community and Ticketmaster events.
- 📥 **Event Signup:** User-friendly signup process for events.
- 👥 **Role-Based Access:** Different experiences for regular users and staff members.
- 🧾 **Google Calendar Integration:** Add events to your calendar with a click.
- 🚀 **Responsive Design:** Optimized for mobile, tablet, and desktop experiences.

---

## 📦 Dependencies

### Runtime Dependencies

- **react**: ^19.1.0  
- **react-dom**: ^19.1.0  
- **react-router-dom**: ^7.6.0  
- **react-scripts**: ^5.0.1  
- **typescript**: ^4.9.5  
- **web-vitals**: ^2.1.4  

Additional libraries include testing utilities and type definitions:

- **@testing-library/dom**: ^10.4.0  
- **@testing-library/jest-dom**: ^6.6.3  
- **@testing-library/react**: ^16.3.0  
- **@testing-library/user-event**: ^13.5.0  
- **@types/jest**: ^27.5.2  
- **@types/node**: ^16.18.126  
- **@types/react**: ^19.1.5  
- **@types/react-dom**: ^19.1.5  

### Development Dependencies

- **postcss**: ^8.5.3

*Note:* Running `npm install` (or using yarn) will automatically install all of the above dependencies based on the contents of your **package.json**.

---

## 🚀 Running the Project Locally

### Prerequisites

- **Node.js** (v14 or later)
- **npm** (or yarn)
- A stable internet connection for API calls (Ticketmaster, etc.)

### Steps

1. **Clone the Repository**

- You can clone the repository by entering the following command in your terminal: 
git clone https://github.com/zayathena/events-platform-fe/

- Then naviagte into the folder: cd events-platform-fe

2. **Install Dependencies**

- npm install
  # or if you prefer yarn:
  # yarn install

3. **Set Up Environment Variables**

Create a .env file at the root of the project with the following keys. Adjust values as needed:

REACT_APP_API_BASE_URL=https://events-platform-be.onrender.com/api
REACT_APP_TICKETMASTER_API_KEY=your_ticketmaster_api_key

Ensure that your backend API URL and any required keys are set. Remember that environment variable names must start with REACT_APP_ when using Create React App.

4. **Run the Development Server**

Start the app with:
npm run start

5. **Build for Production**

To create an optimised production build, run:
npm run build

## 🔐 Test Accounts
Use the following credentials to test the different roles in the app:

**User Account:**
Email: user@gmail.com
Password: user123

**Staff Account:**
Email: staff@gmail.com
Password: staff123

## 📁 Project Structure

public/
  ├── index.html         # HTML template and metadata
  └── favicon.ico        # Site icon

src/
  ├── components/        # Reusable UI components (e.g., headers, event cards)
  ├── context/           # Contains React context providers
  ├── pages/             # Page components for various routes (Home, Login, Event Details, etc.)
  ├── api/               # API utility functions to interact with backend endpoints (auth, events, etc.)
  ├── utils/             # Utility functions and helper modules
  ├── App.tsx            # Main app component with routing setup
  └── index.tsx          # Application entry point

  ## 🌍 Deployment

  **Deploying on Netlify**

  1. **Connect your Git Repository**

  Log in to Netlify and link your GitHub repository.

  2. **Configure Build Settings:**

  - **Build Command:** npm run build
  - **Publish Directory:** build

  3. **Set Environment Variables**

  Configure required environment variables (such as REACT_APP_API_BASE_URL and REACT_APP_TICKETMASTER_API_KEY) in the Netlify dashboard under Site Settings > Build & Deploy > Environment.

  4. **Continuous Development**
  Every push to your main branch will trigger an automatic redeployment on Netlify.
  For more details, refer to Netlify’s Deployment Documentation.

## 📺 Live Demo
Visit the live deployed version here:
https://shimmering-phoenix-1ab6c9.netlify.app

