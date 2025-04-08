# Step 1: Build Stage
FROM node:22.14.0-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy entire project
COPY . .

# Build the app using Parcel
RUN npm run build

# Step 2: Production Stage
FROM nginx:alpine AS production

# Copy built files from build stage
COPY --from=build /app/build /app/build

# Expose port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
