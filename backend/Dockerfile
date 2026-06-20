# Stage 1: Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install all dependencies (including devDependencies)
RUN npm ci

# Copy the rest of the application files
COPY tsconfig.json ./
COPY src/ ./src/

# Compile TypeScript
RUN npm run build

# Stage 2: Production runtime stage
FROM node:20-alpine

WORKDIR /app

# Copy dependency files and install production dependencies only
COPY package*.json ./
RUN npm ci --only=production

# Copy built code from Stage 1
COPY --from=builder /app/dist ./dist

# Set default env variables
ENV PORT=5000
ENV NODE_ENV=production

EXPOSE 5000

# Start server
CMD ["node", "dist/index.js"]
