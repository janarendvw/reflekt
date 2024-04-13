# Use the official Node.js image as a base
FROM node:alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install -g pnpm
RUN pnpm install
RUN npx prisma generate

# Copy the rest of the application code
COPY . .

# Expose the port that the Next.js app will run on
EXPOSE 3000