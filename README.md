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
To query on the endpoints, pass a *single* query or key=value;

Examples:
`?id=1`
`?username=user1`
