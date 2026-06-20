# Stage 1: Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application files
COPY . .

# Set Vite build argument for the backend API URL
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Build the static site
RUN npm run build

# Stage 2: Serve stage
FROM nginx:alpine

# Copy built assets to Nginx default public folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
