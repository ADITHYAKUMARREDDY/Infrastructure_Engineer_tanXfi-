
"# Infrastructure_Engineer_tanXfi-" 

I've completed a task using MERN technology, but instead of MongoDB, I opted to use a CSV file. I'm currently considering switching to Django to further explore and enhance my skills. I have about 5 months of experience with JavaScript, and I'm eager to broaden my expertise with other technologies.

PORTFOLIO: https://www.crio.do/learn/portfolio/kumaradithya498/

RESUME: https://drive.google.com/file/d/1sG2FJ0e-9bp_NczMsHxKDyi4eqL2JSdn/view?usp=drive_link

demo video(125 sec): https://drive.google.com/file/d/1W5DAg-XnaYz_hg4sfkkVc1aARJuMjQcw/view?usp=drive_link


FOR RUNNING THE CODE CLONE THE CODE OPEN DOCKER:NOW IN TERMINAL
command: docker-compose up


Architecture Overview
Frontend

Purpose: Provides the user interface for the application.
Technology: React, a JavaScript library for building user interfaces.
Components:
LoginPage: Manages user login functionality.
RegisterPage: Handles user registration.
Data: Displays and interacts with data retrieved from the backend.
Backend

Purpose: Manages data processing and exposes API endpoints.
Technology: Node.js with Express.js.
Components:
Main.js: Contains core functions for processing data and calculating revenue.
Server.js: Configures the Express server and sets up API routes.
Dockerfile: Defines how to build the Docker image for the backend.
Database

Purpose: Stores and retrieves data.
Technology: CSV file (used for simplicity in this example).
Docker Compose

Purpose: Orchestrates the multi-container Docker application.
Technology: Docker Compose YAML file.
Components:
Frontend Service: Builds and serves the React application.
Backend Service: Builds and serves the Node.js application.
Code Flow and Explanation
Frontend

index.js

Purpose: Entry point of the React application.
Code Flow: Initializes the React application and renders the App component into the DOM.
Key Points: Uses ReactDOM.createRoot for rendering and includes reportWebVitals for performance monitoring.
App.js

Purpose: Main application component handling routing.
Code Flow: Defines routes for RegisterPage, LoginPage, and Data components using React Router.
Key Points: Uses BrowserRouter, Routes, and Route for navigation and manages user state with setUserName.
Dockerfile (Frontend)

Purpose: Defines the Docker image for the React application.
Code Flow: Builds the React application with Node.js and serves it using Nginx.
Key Points: Utilizes a multi-stage build to keep the image size small and serves static files via Nginx.
Backend

Server.js

Purpose: Configures the Express server and sets up API endpoints.
Code Flow: Sets up middleware (like cors and express.json()), defines API endpoints for data operations and price alerts.
Key Points: Handles HTTP requests with Express, integrates nodemailer for email notifications, and processes CSV data.
Main.js

Purpose: Contains core functions for processing data and sending emails.
Code Flow: Reads CSV data, calculates revenues, and identifies top customers. Sends price alert emails using nodemailer.
Key Points: Includes functions for CSV data processing and revenue calculation, and a function for sending price alerts via email.
Dockerfile (Backend)

Purpose: Defines the Docker image for the Node.js application.
Code Flow: Sets up the Node.js environment, installs dependencies, and runs the server.
Key Points: Uses a Node.js base image, copies application code, installs dependencies, and exposes port 3000 for the backend service.
Docker Compose

docker-compose.yml
Purpose: Manages the deployment of frontend and backend services in Docker.
Code Flow: Defines services for the frontend and backend, specifying build contexts, ports, and dependencies.
Key Points: Ensures the frontend service builds and serves the React app while the backend service handles the Node.js app. Ensures the backend starts before the frontend.
Summary
Frontend: React-based user interface with routing and state management.
Backend: Node.js API server for data processing and email alerts.
Database: CSV file for simple data storage.
Docker Compose: Orchestrates the deployment of frontend and backend services in Docker containers.
