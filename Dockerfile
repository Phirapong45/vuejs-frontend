# FROM node:16-alpine  

# # Set the working directory
# WORKDIR /app

# # Copy package.json and package-lock.json to the working directory
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application code to the working directory
# COPY . .

# # Expose the port the app runs on
# EXPOSE 3000

# # Command to run the application
# CMD [ "npm", "run", "serve" ]

FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf   