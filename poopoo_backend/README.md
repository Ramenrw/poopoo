# How to run
## With Visual Studio
Click the "Run" button or press F5 to start the application.

## With .NET CLI (command prompt)
1. Open a command prompt or terminal.
2. Navigate to the project directory.
3. Run the following command to build and run the application:
   ```
   dotnet run
   ```
4. The application will start, and you can interact with it through the console.

# IMPORTANT BEFORE YOU START CALLING ROUTES
PLEASE PLEASE PLEAAAAAAAAAASE attach `Authorization: Bearer <token>` on every endpoint (except register/login one).  

# ROUTES YOU CAN CALL
## TL;DR
```
POST   /api/users/login
POST   /api/users/register

// the rest of these routes require a jwt token, which you can get from previous routes
GET    /api/recipes
POST   /api/recipes
DELETE /api/recipes/{recipeId}
GET    /api/recipes/generate

GET    /api/items
POST   /api/items/manual-entry
DELETE /api/items/manual-remove/{itemId}
POST   /api/items/update-expiry
POST   /api/items/upload-image
```

SAMPLE USER:
```
email: sharon@waterloo.com
password: ilovenewjeans
```

Read on for more information.  Also note: i am doing this sleep deprived (even though its like 9pm), so to be EXTRA sure, just doublecheck all the Controllers files.  This is the entry point for the routes (then you can trace if you like).

## Users & Authentication API

Base URL (dev): https://localhost:7134

http://localhost:5100/api/users
OR
https://localhost:7134/api/users
> Try to use https.  Auth shouldnt even work on http lol.

All authentication uses JWT Bearer tokens.
(actually, nothing is secured lol.  literally just for getting a user profile made.  its a hackathon.  what are they gonna hack)

## Authentication Flow (TL;DR)

Frontend calls POST /login or POST /register
API returns a JWT token
Frontend stores token (memory / secure storage.  idk what the mobile equivalent is................)

Frontend sends token on future requests:
> you normally do.  for this project, its ok.  (though you can just do it for practice. in the header, its just "Authentication: Bearer <token>")

Authorization: Bearer <token>

## POST /api/users/login

Authenticate an existing user.

### Request Body
```
{
  "email": "sharon@waterloo.com",
  "password": "ilovenewjeans"
}
```

**Password is sent plain-text over HTTPS.**
Hashing is handled server-side.

Success Response (200 OK)
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## Error Responses
### 401 Unauthorized	
Invalid email or password
### Example (fetch)
```
const res = await fetch("/api/users/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email,
    password,
  }),
});

if (!res.ok) throw new Error("Login failed");

const { token } = await res.json();
```

## POST /api/users/register

Register a new user and create their user profile.

This endpoint performs:

Auth user creation
User profile creation
Token issuance

### Request Body
```
{
  "email": "sharon@waterloo.com",
  "password": "ilovenewjeans",

  "preferredCuisines": ["Korean", "Japanese"],
  "groceryStoreFrequencyPerWeek": 2,
  "goals": ["High protein", "Muscle gain"],
  "restrictions": ["Peanuts"]
}
```

### Success Response (200 OK)
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## Error Responses
### 400 Bad Request	
Email already exists
### 500 Problem	
Auth created but profile creation failed (should be rare)

### Example (fetch)
```
const res = await fetch("/api/users/register", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email,
    password,
    preferredCuisines,
    groceryStoreFrequencyPerWeek,
    goals,
    restrictions,
  }),
});

if (!res.ok) throw new Error("Registration failed");

const { token } = await res.json();
```

# Using the Token (IMPORTANT)

For all protected endpoints, include:

`Authorization: Bearer <token>`

### Example
```
await fetch("/api/some-protected-endpoint", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

# Dev Seeded User (Development Only)

In dev, the backend may be seeded with:

```
email: sharon@waterloo.com
password: ilovenewjeans
```

# Recipes API

## This API allows the frontend to:

Fetch a user’s saved recipes
- Save a recipe for a user
- Remove a saved recipe
- Generate new recipes for a user

## GET /api/recipes

Get all saved recipes for a user.
Success Response (200 OK)
```
[
  {
    "name": "Spicy Chicken Rice Bowl",
    "ingredients": [
      "Chicken breast",
      "Rice",
      "Gochujang",
      "Soy sauce"
    ],
    "instructions": [
      "Cook rice",
      "Marinate chicken",
      "Pan fry chicken",
      "Assemble bowl"
    ],
    "preparationTimeMinutes": 15,
    "cookingTimeMinutes": 20,
    "cuisineType": "Korean",
    "mealType": "Dinner",
    "servings": 2,
    "dietaryRestrictions": []
  }
]
```
> NOTE: this is a sample response.  most likely each instruction and ingredient will have more information (amount, cook time, etc...)

### Example (fetch)
```
await fetch(`/api/recipes`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```
## POST /api/recipes

Save a recipe for a user.

Honestly not sure if this is necessary.  This is just if you want the user to make a user submitted recipe for whatever reason

### Request Body (RecipeDTO)
```
{
  "name": "Avocado Toast",
  "ingredients": [
    "Bread",
    "Avocado",
    "Salt",
    "Pepper"
  ],
  "instructions": [
    "Toast bread",
    "Mash avocado",
    "Spread on toast"
  ],
  "preparationTimeMinutes": 5,
  "cookingTimeMinutes": 3,
  "cuisineType": "Western",
  "mealType": "Breakfast",
  "servings": 1,
  "dietaryRestrictions": ["Vegan"]
}
```

### Success Response (200 OK)
(no body)

### Error Responses
400 Bad Request	
Failed to save recipe

### Example (fetch)
```
await fetch(`/api/recipes/save`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(recipe),
});
```

## DELETE /api/recipes/{recipeId}

Remove a saved recipe for a user.

recipeId = GUID of the recipe.  
should get this from after calling the `GET /api/recipes` endpoint

### Success Response (200 OK)
(no body)

### Error Responses
400 Bad Request	Failed to remove recipe

### Example (fetch)
```
await fetch(`/api/recipes/${recipeId}`, {
  method: "DELETE",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```


## GET /api/recipes/generate

Generate new recipe suggestions for a user.

This endpoint:

- Uses the user’s preferences (cuisines, goals, restrictions, etc.)
- Returns generated recipes

### Path Parameters
userId = GUID of user

### Success Response (200 OK)
```
[
  {
    "name": "High-Protein Tofu Stir Fry",
    "ingredients": [
      "Tofu",
      "Broccoli",
      "Soy sauce",
      "Garlic"
    ],
    "instructions": [
      "Press tofu",
      "Stir fry vegetables",
      "Add tofu and sauce"
    ],
    "preparationTimeMinutes": 10,
    "cookingTimeMinutes": 15,
    "cuisineType": "Asian",
    "mealType": "Dinner",
    "servings": 2,
    "dietaryRestrictions": ["Vegetarian"]
  }
]
```

### Example (fetch)
```
await fetch(`/api/recipes/${userId}/generate`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

# Items API

## GET /api/items

Get all items currently associated with the authenticated user.

### Success Response (200 OK)
```
[
  {
    "id": "6f0a5b0e-7b1a-4c2f-9d8a-1f6c2b9a1234",
    "userId": "9e2d3c4a-8f1a-4d9b-bb71-82c6a1f45678",
    "name": "Milk",
    "category": "Packaged",
    "quantity": 1,
    "recordedAt": "2026-02-02T18:41:00Z",
    "expirationDate": "2026-02-10T00:00:00Z",
    "detectedConfidence": 0.93
  },
  {
    "id": "8c4f2a9d-5b11-4f7a-9dcb-0f3b12a98765",
    "userId": "9e2d3c4a-8f1a-4d9b-bb71-82c6a1f45678",
    "name": "Eggs",
    "category": "Ingredient",
    "quantity": 12,
    "recordedAt": "2026-02-01T10:12:00Z",
    "expirationDate": null,
    "detectedConfidence": 0.0
  }
]

```
> don't really remember the format of the date.
category = Ingredient, packaged, or a third item i forgot.  
You can doublecheck the `GeminiClient.cs` class (our prompt is there too.  should i hide the system prompt? probably...)

Example (fetch)
```
await fetch("/api/items", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```
## POST /api/items/manual-entry

Manually add an item to the user’s inventory.

### Query Parameters
- itemName = name of item
- expiryDate = expiry date.  this is optional

### Example Request
`POST /api/items/manual-entry?itemName=Milk&expiryDate=2026-02-10`

### Success Response (200 OK)
(no body)

### Example (fetch)
```
await fetch(
  `/api/items/manual-entry?itemName=Milk&expiryDate=2026-02-10`,
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
```

## DELETE /api/items/manual-remove/{itemId}

Remove an item from the user’s inventory.

### Path Parameters
itemId = ID of the item to remove

### Success Response (200 OK)
(no body)

Example (fetch)
```
await fetch(`/api/items/manual-remove/${itemId}`, {
  method: "DELETE",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

## POST /api/items/update-expiry

Recalculate or update expiry dates for all user items.

This endpoint:

- Re-evaluates item expiry dates
- Uses backend logic / heuristics
- Does not require any request body

## Success Response (200 OK)
(no body)

Example (fetch)
```
await fetch("/api/items/update-expiry", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```


## POST /api/items/upload-image

Upload an image of groceries/items to automatically detect and update the user’s inventory.

This endpoint:

- Accepts a multipart/form-data request
- Uses AI/image recognition
- Adds or updates items for the user

### Request Type
multipart/form-data

### Form Fields

image = the image

### Success Response (200 OK)
(no body)

### Example (fetch)
```
const formData = new FormData();
formData.append("image", file);

await fetch("/api/items/upload-image", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
  },
  body: formData,
});
```
