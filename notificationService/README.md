## Notes Service
Micro service using Node.js, MongoDB & socket.io for sending Notifications.

### Steps to start service
1. Start MongoDB - ```mongod```
2. Start Server  - ```npm start```

### Run using docker
1. Build Docker image - ```docker build -t barna1988/keep-note-final-notificationservice .```
2. Run Docker image (docker port = 3003(1) - app port = (3003)) - ```docker run -p 3003:3003 barna1988/keep-note-final-notificationservice```
3. App will be accessible using - http://localhost:3003
4. Login into docker: ```docker login```
5. Push to Docker hub Repository  - ```docker push barna1988/keep-note-final-notificationservice:latest```

### API Spec
Swagger UI - http://localhost:3003/api-docs