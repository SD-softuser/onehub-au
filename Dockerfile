# Use an official Node.js image as the base image
FROM node:18-alpine as build

# Set the working directory
WORKDIR /app

# Copy the backend package.json and package-lock.json
COPY package.json package-lock.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend files
COPY backend ./backend

# Copy the frontend package.json and install frontend dependencies
COPY frontend/package.json frontend/package-lock.json ./frontend/
RUN npm install --prefix frontend

# Build the frontend
COPY frontend ./frontend
RUN npm run build --prefix frontend

# Use a separate Node.js image for the production build
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy only the backend files and node_modules from the previous build stage
COPY --from=build /app/backend ./backend
COPY --from=build /app/node_modules ./node_modules

# Copy the built frontend files to the dist folder
COPY --from=build /app/frontend/dist ./frontend/dist

# Expose the port your app runs on
EXPOSE 3000

# Command to run the backend server
CMD ["node", "backend/index.js"]