# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and yarn.lock files to the working directory
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install --frozen-lockfile

# Copy the rest of the application code to the working directory
COPY . .

# Build the Nuxt.js application
RUN yarn build

# Expose the port that the app runs on
EXPOSE 3000

# Set the command to start the application
CMD ["yarn", "start"]