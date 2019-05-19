# Define from what image we want to build from.
FROM node:10.15.3-alpine AS builder

# Developer name (Optional)
LABEL Maintainer="Barnasree.Goswami"

# Set environment variables - like API urls/Port etc.
ENV PORT 4200

# Create app directory to hold the application code inside the image
# this will be the working directory for your application
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Install all npm packages
RUN npm install

# Bundle your app's source code inside the Docker image
COPY . .

# Port to connect to application - used in appConfig.js
EXPOSE ${PORT}

# Build Angular
RUN npm run build -- --output-path=./dist/out

# Web server config for Angular
FROM nginx:1.15

COPY --from=builder /usr/src/app/dist/out/ /usr/share/nginx/html

COPY --from=builder /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf