# Define from what image we want to build from.
FROM node:10.15.3-alpine AS builder

# Developer name (Optional)
LABEL Maintainer="Barnasree.Goswami"

# Set environment variables - like API urls/Port etc.
ENV PORT 4200

# Create app directory to hold the application code inside the image
# this will be the working directory for your application
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Install all npm packages
RUN npm install
RUN npm install -g @angular/cli

# Bundle your app's source code inside the Docker image
COPY . .

# Port to connect to application - used in appConfig.js
EXPOSE ${PORT}

# Build Angular
RUN npm run build -- --output-path=./dist/out

# Define the command to run your app which defines your runtime, like 'npm start'
CMD [ "npm", "start" ]

# Web server config for Angular
# FROM nginx:1.15

# COPY --from=builder /usr/src/app/dist/out/ /usr/share/nginx/html

# COPY --from=builder /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf