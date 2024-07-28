# Use an official node image as a base
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port (adjust if necessary)
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
