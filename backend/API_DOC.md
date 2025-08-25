### RoadmapHub API Documentation

## Authentication

All endpoints require a logged-in user via JWT:

Header:
Authorization: Bearer <your-token-here>

## Feedback API

### POST /api/feedback

Create a new feedback item.

Request Body:

{
"content": "Add dark mode",
"category": "feature"
}

Responses:

201 Created

{
"\_id": "64e1234abc...",
"userId": "64e123user...",
"content": "Add dark mode",
"category": "feature",
"status": "open",
"createdAt": "2025-08-25T12:00:00.000Z",
"updatedAt": "2025-08-25T12:00:00.000Z"
}

400 Bad Request → Missing content or category

{ "message": "please provide content and category" }

401 Unauthorized → Missing/invalid token

### GET /api/feedback

Get all feedback created by the logged-in user.

Responses:

200 OK

[
{
"_id": "64e1234abc...",
"userId": "64e123user...",
"content": "Add dark mode",
"category": "feature",
"status": "open"
},
{
"_id": "64e456def...",
"userId": "64e123user...",
"content": "Fix login bug",
"category": "bug",
"status": "reviewed"
}
]

401 Unauthorized → Missing/invalid token

### GET /api/feedback/:id

Get a single feedback item by ID.

Responses:

200 OK → Feedback object

404 Not Found → Feedback does not exist

401 Unauthorized → User does not own this feedback

### PUT /api/feedback/:id

Update a feedback item.

Request Body (any fields you want to update):

{
"content": "Add dark mode toggle",
"status": "reviewed"
}

Responses:

200 OK → Updated feedback object

404 Not Found → Feedback does not exist

401 Unauthorized → User does not own this feedback

### DELETE /api/feedback/:id

Delete a feedback item.

Responses:

200 OK

{ "message": "Feedback deleted", "id": "<feedback_id>" }

404 Not Found → Feedback does not exist

401 Unauthorized → User does not own this feedback

## Roadmap API

### POST /api/roadmap

Create a roadmap item.

Request Body:

{
"title": "Implement dark mode",
"description": "Allow users to switch themes",
"status": "planned",
"category": "feature",
"feedbackRef": "64e1234abc...",
"isPublic": true
}

Responses:

201 Created → Created roadmap item

400 Bad Request → Missing required title

401 Unauthorized → Missing/invalid token

### GET /api/roadmap

Get all roadmap items for the logged-in user plus public items.

Responses:

200 OK → Array of roadmap items

401 Unauthorized → Missing/invalid token

### GET /api/roadmap/:id

Get a single roadmap item by ID.

Responses:

200 OK → Roadmap item object

404 Not Found → Item does not exist

401 Unauthorized → User does not own this item (if private)

### PUT /api/roadmap/:id

Update a roadmap item.

Request Body (any fields you want to update):

{
"title": "Implement dark mode toggle",
"status": "in progress"
}

Responses:

200 OK → Updated roadmap item

404 Not Found → Item does not exist

401 Unauthorized → User does not own this item

### DELETE /api/roadmap/:id

Delete a roadmap item.

Responses:

200 OK

{ "message": "Roadmap deleted", "id": "<roadmap_id>" }

404 Not Found → Item does not exist

401 Unauthorized → User does not own this item

# Error Cases

| Status Code | Meaning                                            |
| ----------- | -------------------------------------------------- |
| 400         | Invalid request body or missing required fields    |
| 401         | Unauthorized access (missing token or wrong owner) |
| 404         | Resource not found                                 |
| 500         | Server error                                       |
