# The Universal Subtitle Extension
The majority of online video content isn’t accessible for deaf or hard of hearing users.
Although some efforts have been made through auto-generated subtitles,
they often go unverified and are polluted with grammatical errors.
Individual efforts likewise cannot keep up with the perpetually increasing content base.
The Universal Subtitle Extension aims to solve both of these problems.  

Through crowdsourcing efforts, mass amounts of online videos can be subtitled with a
relatively high quality standard autonomously. Individual contributors can submit
corrections to subtitled works as well as grow their own contribution pool by
transcribing their favorite media for others to enjoy. Consumers can enjoy the benefits
of accurate, verified subtitles with easy access via the browser extension.
Simply toggle the extension and subtitles will be overlayed at the video’s base;
complete with size and color customization options. 

## Running the project
*More details in the sections below*
1. Start the server
2. Load the extension into chrome
3. Interact with the project through the extension and website

### Installing and running the server
1. Download and install [Node.js](https://nodejs.org/en/download/)

2. With Node.js comes the node project manager (npm)  
Use it to install the required packages by running this command your command prompt:
    - ```npm install```

3. Within the package.json file, various scripts are defined to run the project  
Start the Node.js server with the start script using this command:
    - ```npm start```

4. After the server is started connect to [http://localhost:8080/](http:localhost:8080/).  
Node.js will serve your client the HTML and Javascript files


### Adding the extension to Google Chrome
*Refer to Google Chrome's [getting started page](https://developer.chrome.com/extensions/getstarted) for more information*
1. Open the Extension Management page by navigating to chrome://extensions.
2. Enable Developer Mode by clicking the toggle switch next to Developer mode.
3. Click the LOAD UNPACKED button and select the extension directory of this project.

You can now begin using the Universal Subtitle Extension

## Features
### User Roles

### User Actions


## Project State
### Known Bugs

### Missing Features
- Subtitle review
- Submit for corrections
- Enable on any video