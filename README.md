# SWEN-444-Subtitle-Extension
Running this project (more details in sections below):
1. Start the server
2. Load the extension into chrome
3. Interact with the project through the extension and website

# Running the server
Download and install Node.js  

Install the node packages:
- ```npm install```

Start the node server:
- ```npm start```

# Adding the extension to chrome
Refer to google chrome's [getting started page](https://developer.chrome.com/extensions/getstarted) for more information
1. Open the Extension Management page by navigating to chrome://extensions.
2. Enable Developer Mode by clicking the toggle switch next to Developer mode.
3. Click the LOAD UNPACKED button and select the extension directory of this project.

# Data structure
## captions.json

```
[
  {
    "id": "YE7VzlLtp-4",
    "captions": [
      {
        "start": "00:00",
        "end": "00:30",
        "caption": "this is a short caption"
      },
      {
        "start": "00:40",
        "end": "5:00",
        "caption": "this is a long caption"
      }
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
- /updateCaption

## Query
###### GET Request  
To query on the endpoints, pass a *single* query or key=value;

Examples:  
`?id=1`  
`?username=user1`

## Update
###### POST Request
Post in the body the ENTIRE json you want to save. Even if you
change a small part, repost the entire body.  
- If there is already an ID matching, it will replace.  
- If the ID isn't found, a 404 is thrown.  
- If no ID is given, it will be inserted.
