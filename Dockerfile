# == Build stage
FROM node:25-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# == Production stage
FROM node:25-alpine

WORKDIR /app

# Copy only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built application from builder
COPY --from=builder /app/.output ./.output

# Expose port
EXPOSE 9000

# Set production environment
ENV NODE_ENV=production

# Start the application
CMD ["node", ".output/server/index.mjs"]
