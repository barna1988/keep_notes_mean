## User Service

Micro service using Node.js & MongoDB for user login/register etc.

### Steps to start service
1. Start MongoDB - ```mongod```
2. Start Server  - ```npm start```

### Run using docker
1. Build Docker image - ```docker build -t barnasreegoswami/keep-note-final-userservice .```
2. Run Docker image (docker port = 3000(1) - app port = (3000)) - ```docker run -p 3000:3000 barnasreegoswami/keep-note-final-userservice```
3. App will be accessible using - http://localhost:3000
4. Login into docker: ```docker login```
5. Push to Docker hub Repository  - ```docker push barnasreegoswami/keep-note-final-userservice:latest```

### API Spec
YTS
