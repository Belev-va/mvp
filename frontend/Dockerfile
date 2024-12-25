# Build stage
FROM node:16-alpine AS build

# Set Node options to increase memory limit
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Build the application
# Note: These are public URLs, not sensitive data
ENV REACT_APP_AUTH_API=/api/auth
ENV REACT_APP_PROFILE_API=/api/profiles
ENV REACT_APP_PROJECT_API=/api/projects
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
