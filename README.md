# M.A.P.S – My Academic Planning System

**M.A.P.S** (**M**y **A**cademic **P**lanning **S**ystem) is a full-stack web application designed specifically for the nearly 2,000 Computer Science undergraduates at Queens College. It centralizes real-time course data, professor reviews, and degree progress tracking into one intuitive, gamified platform.

---

## Features at a Glance

* **Real-Time Data:** Live course offerings scraped from CUNY Global Search.
* **Professor Insights:** Integrated rating and review system.
* **Schedule Builder:** Generate and validate multi-semester schedules, automatically preventing conflicts.
* **Degree Tracker:** Dynamic D3.js graph visualizing prerequisites and graduation progress.
* **Gamified UX:** Pixel-art theme inspired by treasure maps to make planning enjoyable.

---

## Tech Stack & Architecture

This application is built as a typical full-stack MERN-like structure, prioritizing type safety and modern tooling.

| Layer | Technology | Role |
| :--- | :--- | :--- |
| **Frontend** | React, JavaScript | User interface and client-side logic. |
| **Visualization** | D3.js | Used to render the dynamic prerequisite graph. |
| **Backend API** | Node.js, Express | Middleware for handling database interactions and scraping logic. |
| **Database** | PostgreSQL (Neon) | Secure, scalable storage for ratings, reviews, and user schedules. |
| **ORM** | Drizzle ORM | Type-safe interaction layer for the PostgreSQL database. |
| **Authentication**| Firebase Auth | Secure user sign-up and login. |

## Getting Started (Local Setup)

To set up and run M.A.P.S locally for development or demonstration, follow these steps.

### Prerequisites

* Node.js (v18+)
* npm or yarn
* A running PostgreSQL instance (or Neon connection string)

### Installation

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/Wilson1009/MAPS
    cd MAPS
    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    # or yarn install
    ```
3.  **Configure Environment Variables:**
    Create a file named `.env` in the root directory and configure the following variables:
    ```
    # Database Configuration (replace with your values)
    DATABASE_URL="postgresql://user:password@host:port/database"
    
    # Firebase Auth Configuration (for the frontend)
    FIREBASE_API_KEY="your_api_key"
    
    # Optional: Web Scraping Configuration (if run locally)
    SCRAPING_ENDPOINT="[internal or external scraping service]"
    ```
4.  **Database Migrations:**
    Initialize your database schema using Drizzle:
    ```bash
    npm run db:migrate
    ```

### Running the Application

1.  **Start the Backend/API:**
    ```bash
    npm run start:api
    ```
2.  **Start the Frontend:**
    ```bash
    npm run start:client
    ```

The application should now be accessible in your browser, typically at `http://localhost:3000`.

---

## Detailed Feature Breakdown

### 1. Real-Time Scraped Course Data

Instead of relying on outdated PDFs, M.A.P.S pulls live data from CUNY Global Search.

* **Data Points:** Available professors, class times, sections, and semesters offered.
* **Benefit:** Ensures students base all planning decisions on the latest available information.

### 2. Professor Rating System

We implemented a custom rating system to enrich the course data with student experiences.

* **User Input:** Students can submit numerical ratings, written reviews, and comments.
* **Integration:** Ratings feed directly into the Course Picker and Schedule Builder.

### 3. Course Picker (Hi → Lo Rated Professors)

A primary utility feature that simplifies course selection.

* **Functionality:** A student selects a course (e.g., CS 313), and the system automatically filters and ranks all professors teaching that course from highest to lowest rating.

### 4. Schedule Builder

A robust tool for semester planning using real-time data.

* **Capabilities:** Users can build schedules for multiple semesters, mix and match sections, and automatically avoid time conflicts.

### 5. D3 Course Requirement Graph

A comprehensive visualization of the CS major curriculum.

* **Visualization:** Each required course is a node in a treasure-map-style graph, powered by D3.js.
* **Dynamic Update:** As the user completes classes, the graph updates dynamically to show prerequisite relationships, progress toward graduation, and courses eligible to be taken next.

### 6. Gamified Pixel-Art Theme

To promote user engagement, the platform uses a unique aesthetic.

* **Design:** Features a custom pixel-art treasure map background, retro visuals, and a custom parchment scroll sprite.
* **Goal:** To turn academic planning into a more enjoyable, gamified experience.
