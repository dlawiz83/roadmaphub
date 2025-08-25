### POST /api/auth/signup
Create a new user

Request:
{
  "name": "Ayesha",
  "email": "ayesha@example.com",
  "password": "password123"
}

Response:
{
  "_id": "...",
  "name": "...",
  "email": "...",
  "token": "..."
}


### POST /api/auth/login
Log in a user

Request:
{
  "email": "ayesha@example.com",
  "password": "password123"
}

Response:
{
  "_id": "...",
  "name": "...",
  "email": "...",
  "token": "..."
}
