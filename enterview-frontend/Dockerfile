# Use an official Node runtime as the base image
FROM node:20-alpine

RUN apk add xdg-utils 

# Set the working directory inside the container
WORKDIR /frontend

# Copy package.json and package-lock.json (or yarn.lock if you use Yarn) into the container
COPY package*.json ./

# Install project dependencies inside the container
RUN npm install

# Copy the rest of the application into the container
COPY . .

# Specify the command to run on container start
CMD ["npm", "start", "--", "--host"]