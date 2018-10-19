# SWEN-444-Subtitle-Extension

# How to Run the Backend
- ```npm install```
- ```npm start```

# How data/ is organized
## captions.json

```
[
    {
        "id": 1,
        "captions": [
            [0, "Start of video"],
            [5, "5 seconds into video"],
            [8, "8 seconds into video"],
        ]
    }
]
```

## profiles.json

```
[
    {
        "id": 1,
        "username": "user1",
        "name": "Test User",
        "contributed_to": [1]
    }
]

```

# Endpoints
- /getProfiles
- /getCaptions

## Query
GET Request
To query on the endpoints, pass a *single* query or key=value;

Examples:
`?id=1`
`?username=user1`

# Update
POST Request
Post in the body the ENTIRE json you want to save. Even if you
change a small part, repost the entire body.
If there is already an ID matching, it will replace.
If the ID isn't found, a 404 is thrown.
If no ID is given, it will be inserted.
