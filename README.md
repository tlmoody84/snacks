# Lab Assignment: Simple Backend Server for Snacks

Utilizing Backend Server doing the following:
Routes:

GET /items: Retrieves the list of all snacks.
GET /items/:id: Retrieves a specific snack by its ID.
POST /items: Adds a new snack to the list.
PUT /items/:id: Updates an existing snack based on its ID.
DELETE /items/:id: Deletes a snack from the list by its ID.

Middleware:

CORS: Allows cross-origin requests.
Express JSON: Automatically parses incoming JSON requests.
Error Handling:

404 Not Found: Returns a 404 error if a route or snack is not found.
Centralized Error Handling: Catches and logs all errors, returning a generic 500 error message

By: Tiffany Sharpe
