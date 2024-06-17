# Stage 1: Build the frontend
FROM node:16 as build-frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Set up the backend and root dependencies
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
COPY backend/package*.json ./backend/
RUN npm install
COPY backend/ ./backend/
COPY --from=build-frontend /app/frontend/dist ./frontend/dist

EXPOSE 5000
CMD ["npm", "start"]