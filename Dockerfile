# Use a node base image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install root dependencies (backend dependencies)
RUN npm install

# Copy the frontend and backend directories
COPY frontend ./frontend
COPY backend ./backend

# Install frontend dependencies and build the frontend
RUN npm install --prefix frontend && npm run build --prefix frontend

# Install nodemon globally to run the backend in development mode
RUN npm install -g nodemon

# Copy the rest of the application code
COPY . .

# Expose the necessary port
EXPOSE 5000

# Command to run the backend in development mode using nodemon
CMD ["nodemon", "backend/index.js"]
