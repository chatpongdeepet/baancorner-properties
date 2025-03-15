# BaanCorner Properties
## Table of Contents
- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)

- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Key Components](#key-components)
- [Contributing](#contributing)
- [License](#license)

## Overview
**BaanCorner Properties** is a web application where users can browse, manage, and contact property listings. It features property searches, messaging functionality, and user-generated content like bookmarks or saved properties.
The project is built using **Next.js** and **MongoDB**, focusing on scalability, a clean user experience, and modern web development practices.
## Key Features
- **Dynamic Property Listings**: Add, edit, or delete property listings.
- **Search Functionality**: Filter properties based on location and type.
- **User Authentication**: Google OAuth-based sign-in.
- **Messaging System**: Send and read messages between users about properties.
- **Bookmarks**: Save and manage favorite properties.
- **Responsive Design**: Optimized for desktops and mobile devices.

## Tech Stack
- **Frontend**: React, Next.js
- **Backend**: API Routes powered by Next.js
- **Database**: MongoDB
- **Styling**: TailwindCSS
- **State Management**: Context API
- **Cloud**: Cloudinary for media management
- **Authentication**: NextAuth.js with Google Provider

## Folder Structure
``` 
root/
├── components/          // Reusable React components
├── context/             // Global state management using Context API
├── model/               // MongoDB Schemas
├── pages/               // Next.js pages
│   ├── api/             // API routes
│   ├── properties/      // Property-related dynamic routes
│   ├── profile/         // User profile and saved properties
├── public/              // Public assets
├── utils/               // Utility functions
├── assets/              // Static assets like images
├── styles/              // Global stylesheets
```
## Getting Started
### Prerequisites
Before you get started, ensure you have the following installed:
- **Node.js** (18.x or higher)
- **npm** (or yarn, if preferred)
- A **MongoDB** instance (local or cloud-based)
- A **Cloudinary** account for media hosting

### Installation
1. Clone the repository:
``` bash
   git clone https://github.com/your-username/baancorner-properties.git
   cd baancorner-properties
```
1. Install dependencies:
``` bash
   npm install
```
1. Set up your `.env` file (see below).
2. Run the development server:
``` bash
   npm run dev
```
1. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables
Add the following variables to your `.env` file in the project's root directory.
``` dotenv
# App URLs
NEXT_PUBLIC_DOMAIN=http://localhost:3000
NEXT_PUBLIC_API_DOMAIN=http://localhost:3000/api

# Database
MONGODB_URI=<Your MongoDB URI>

# Authentication
GOOGLE_CLIENT_ID=<Your Google Client ID>
GOOGLE_CLIENT_SECRET=<Your Google Client Secret>
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<Random Secure Key>

# Cloudinary
CLOUDINARY_CLOUD_NAME=<Your Cloudinary Cloud Name>
CLOUDINARY_API_KEY=<Your Cloudinary API Key>
CLOUDINARY_API_SECRET=<Your Cloudinary API Secret>

# MapBox/Google APIs (if applicable for geocoding and maps)
NEXT_PUBLIC_MAPBOX_TOKEN=<Your Mapbox Token>
NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY=<Your Google Geocoding API Key>
```
## API Endpoints
### Property-related Routes

| HTTP Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/properties` | Fetch all properties |
| `GET` | `/api/properties/featured` | Fetch featured properties |
| `GET` | `/api/properties/:id` | Fetch single property by ID |
| `POST` | `/api/properties` | Add a new property |
| `PUT` | `/api/properties/:id` | Update a property by ID |
| `DELETE` | `/api/properties/:id` | Delete a property by ID |
### Messaging Routes

| HTTP Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/messages` | Fetch all messages |
| `GET` | `/api/messages/unread-count` | Get unread message count |
| `POST` | `/api/messages` | Send a new message |
| `PUT` | `/api/messages/:id` | Mark a message as read/unread |
| `DELETE` | `/api/messages/:id` | Delete a message |
### User/Bookmark Routes

| HTTP Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/bookmarks` | Fetch bookmarked properties |
| `POST` | `/api/bookmarks` | Add or remove a bookmark |
For more detailed API information, please see the `route.js` files inside the `pages/api/` folder.
## Key Components
### Core Components
- **PropertyAddForm**: Form for adding new properties.
- **PropertyEditForm**: Form for editing existing properties.
- **PropertyCard**: Card UI to display property details.
- **SearchForm**: Search bar for filtering property listings.
- **Messages**: Messaging UI to send and receive messages about properties.

### Context Providers
- **GlobalProvider**: Manages global application state.
- **AuthProvider**: Wraps NextAuth.js for authentication management.

### Utility Scripts
- **getSessionUser.js**: Provides session-based user data.
- **request.js**: Functions to fetch properties or perform CRUD operations.

## Contributing
We welcome contributions! To contribute:
1. Fork the repository.
2. Create a new branch for your feature/fix.
3. Commit your changes and open a pull request.

## License
This project is licensed under the MIT License.
Feel free to enhance this README as the project evolves!
