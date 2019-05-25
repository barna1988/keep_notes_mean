## Proxy Middleware Service
Micro service using http-proxy middleware to enable proxy

### Steps to start service
1. Start MongoDB - ```mongod```
2. Start Server  - ```npm start```

### Run using docker
1. Build Docker image - ```docker build -t barna1988/keep-note-final-apigateway .```
2. Run Docker image (docker port = 8000(1) - app port = (8000)) - ```docker run -p 8000:8000 barna1988/keep-note-final-apigateway```
3. App will be accessible using - http://localhost:8000
4. Login into docker: ```docker login```
5. Push to Docker hub Repository  - ```docker push barna1988/keep-note-final-apigateway:latest```

### API Spec
YTS

### Proxy URLs
Users API - URLs:
-----------------
Login (POST) - http://localhost:8000/users/login
Register (POST) - http://localhost:8000/users/register
Get Registered Users (GET) - http://localhost:8000/users/getUsers
Test (GET) - http://localhost:8000/users/
User Authentication Test for Bearer Token (POST) - http://localhost:8000/auth/

Notes API - URLs:
-----------------
Get Notes for UserID (GET) - http://localhost:8000/notes/?userId=harry
Create Notes for UserID (POST) - http://localhost:8000/notes/?userId=harry
Share One or More Notes (PUT) - http://localhost:8000/notes/share
Delete One or More Notes (POST) - http://localhost:8000/notes/delete
Add Note to Favourite (PUT) - http://localhost:8000/notes/addFavorites
Remove Note from Favourite (PUT) - http://localhost:8000/notes/removeFavorites
Group One or More Notes (PUT) - http://localhost:8000/notes/addGroup
Check Note is allowed for a UserID (GET) - http://localhost:8000/notes/:noteid/isAllowed?userId=harry
Get Note for NoteID (GET) - http://localhost:8000/notes/:noteid/
Update Note for NoteID (PUT) - http://localhost:8000/notes/:noteid/

Notification API - URL:
-----------------
Add Notification for other User (POST) - http://localhost:8000/notifications/?userId=harry
Get Reminders for UserID (GET) - http://localhost:8000/notifications/reminders/?userId=harry
Add Reminders for UserID (POST) - http://localhost:8000/notifications/reminders/?userId=harry
Get Reminders for reminderID (GET) - http://localhost:8000/notifications/reminders/:reminderId/
Sooze Reminders for reminderID (PUT) - http://localhost:8000/notifications/reminders/?userId=harry
Dismiss Reminders for reminderID (DELETE) - http://localhost:8000/notifications/reminders/?userId=harry
