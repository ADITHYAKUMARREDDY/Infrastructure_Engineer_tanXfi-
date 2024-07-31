
"# Infrastructure_Engineer_tanXfi-" 

I've completed a task using MERN technology, but instead of MongoDB, I opted to use a CSV file. I'm currently considering switching to Django to further explore and enhance my skills. I have about 5 months of experience with JavaScript, and I'm eager to broaden my expertise with other technologies.

PORTFOLIO: https://www.crio.do/learn/portfolio/kumaradithya498/
RESUME: https://drive.google.com/file/d/1sG2FJ0e-9bp_NczMsHxKDyi4eqL2JSdn/view?usp=drive_link

FOR RUNNING THE CODE CLONE THE CODE OPEN DOCKER:NOW IN TERMINAL
command: docker-compose up

Architecture Overview

Frontend

Purpose: My React-based frontend provides the user interface for the application.

Technology: I use React, a JavaScript library for building user interfaces.

Components:

LoginPage: Manages user login functionality.
RegisterPage: Handles user registration.
Data: Interacts with data from the backend and displays it to users.
Backend

Purpose: My backend handles data processing and exposes API endpoints.

Technology: I use Node.js with Express.js.

Components:

Main.js: Contains the core functions for reading data and processing revenue.
Server.js: Configures the Express server and sets up API routes.
Dockerfile: Defines how to build the backend Docker image.
Database

Purpose: My database stores and retrieves data, using a CSV file for simplicity in this example.

Technology: CSV file.

Docker Compose

Purpose: Docker Compose orchestrates the multi-container Docker application.

Technology: Docker Compose YAML file.

Components:

Frontend Service: Builds and serves the React application.
Backend Service: Builds and serves the Node.js application.
Code Flow and Explanation

Frontend

index.js

Purpose: Serves as the entry point of the React application.

Code Flow:

Initializes the React application.
Renders the App component into the DOM.
Key Points:

Uses ReactDOM.createRoot to render the app.
Includes reportWebVitals for performance monitoring.
App.js

Purpose: The main application component that handles routing.

Code Flow:

Defines routes for the RegisterPage, LoginPage, and Data components using React Router.
Manages userName state for user identification.
Key Points:

Utilizes BrowserRouter, Routes, and Route for navigation.
Passes the setUserName function to LoginPage for updating the user state.
Dockerfile (Frontend)

Purpose: Defines the Docker image for the React application.

Code Flow:

Builds the application using Node.js.
Serves the built application using Nginx.
Key Points:

Uses a multi-stage build to minimize image size.
Copies build artifacts to Nginx for serving static files.
Backend

Server.js

Purpose: Configures the Express server and sets up API endpoints.

Code Flow:

Sets up middleware (CORS, express.json()).
Defines API endpoints for data operations and price alerts.
Key Points:

Uses Express to handle HTTP requests.
Integrates Nodemailer for sending emails.
Reads and processes data from a CSV file.
Main.js

Purpose: Contains core functions for processing data and sending emails.

Code Flow:

Reads CSV data, calculates revenues, and identifies top customers.
Sends price alert emails using Nodemailer.
Key Points:

Includes functions for reading CSV data and calculating revenue.
sendPriceAlertEmail function for email notifications.
Dockerfile (Backend)

Purpose: Defines the Docker image for the Node.js application.

Code Flow:

Sets up the Node.js environment.
Installs dependencies and runs the server.
Key Points:

Uses a Node.js base image.
Copies application code and installs dependencies.
Exposes port 3000 for the backend service.
Docker Compose

docker-compose.yml

Purpose: Manages multi-container deployment.

Code Flow:

Defines services for frontend and backend.
Specifies build contexts, ports, and dependencies.
Key Points:

The frontend service builds and serves the React app.
The backend service builds and serves the Node.js app.
Ensures that the backend starts before the frontend.
