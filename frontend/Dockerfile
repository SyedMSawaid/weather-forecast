# Use the official Node.js image as the base image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Add npm configuration since it was failing on installing
RUN npm config set registry https://registry.npmjs.org/ \
  && npm config set fetch-retries 5 \
  && npm config set fetch-retry-factor 2 \
  && npm config set fetch-retry-mintimeout 10000 \
  && npm config set fetch-retry-maxtimeout 60000

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies with additional flags for reliability
RUN npm install

# Copy the rest of the application code
COPY . .

# Environment setup
# SHOULD BE PASSED AT RUNTIME. THIS IS JUST FOR DEMO

# LOCAL
# ENV NEXT_PUBLIC_BACKEND_BASE_URL="http://localhost:3333"

# PROD
ENV NEXT_PUBLIC_BACKEND_BASE_URL="https://weather-backend.fly.dev"

# Build the Next.js application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]