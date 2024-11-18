# Use Node.js 20 as base
FROM node:20-slim

# Set working directory
WORKDIR /app

# Install system dependencies and build tools
RUN apt-get update && apt-get install -y \
  sqlite3 \
  python3 \
  make \
  g++ \
  && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./

# Install dependencies and rebuild SQLite3
RUN npm install
RUN npm install sqlite3
RUN npm rebuild better-sqlite3

# Copy application files
COPY . .

# Create SQLite database directory
RUN mkdir -p tmp/db && chmod 777 tmp/db


# Environment setup
# SHOULD BE PASSED AT RUNTIME. THIS IS JUST FOR DEMO
ENV APP_KEY=v1GqV_J6iFq64NPhO5tW-aYeDMg0kaXM
ENV LOG_LEVEL=info
ENV NODE_ENV=production
ENV PORT=3333
ENV HOST=0.0.0.0

# Build the project first
RUN node ace build

# Run migrations and seeds
RUN node ace migration:run --force
RUN node ace db:seed

EXPOSE 3333

# Change to the build directory and install production dependencies
WORKDIR /app/build

# Move the database to the build folder for access
RUN mv /app/tmp /app/build/tmp

RUN npm ci --omit=dev

CMD sh -c "node bin/server.js & node ace scheduler:run"