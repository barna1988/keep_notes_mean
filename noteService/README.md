## Notes Service
Micro service using Node.js & MongoDB for CRUD operations on NOTE.

### Steps to start service
1. Start MongoDB - ```mongod```
2. Start Server  - ```npm start```

### Run using docker
1. Build Docker image - ```docker build -t barna1988/keep-note-final-noteservice .```
2. Run Docker image (docker port = 3001(1) - app port = (3001)) - ```docker run -p 3001:3001 barna1988/keep-note-final-noteservice```
3. App will be accessible using - http://localhost:3001
4. Login into docker: ```docker login```
5. Push to Docker hub Repository  - ```docker push barna1988/keep-note-final-noteservice:latest```


### API Spec
YTS
