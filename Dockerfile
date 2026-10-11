# == Build stage
FROM node:22-bookworm-slim AS builder

WORKDIR /app

RUN apt-get update \
	&& apt-get install -y --no-install-recommends python3 make g++ \
	&& rm -rf /var/lib/apt/lists/*

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# == Production stage
FROM node:22-bookworm-slim

WORKDIR /app

RUN apt-get update \
	&& apt-get install -y --no-install-recommends python3 make g++ \
	&& rm -rf /var/lib/apt/lists/*

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
