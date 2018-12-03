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

The Universal Subtitle Extension is now ready to use. You will notice this icon:

![Quill Icon](extension/img/quill48.png)

In the top right corner of the Chrome Browser. Clicking on it will launch the screen that allows you to start interacting with the extension.

## Features
### User Roles

Consumer - The primary user of the application. They will be able to read subtitles on any video anywhere on the web, understand when a video is not subtitled, and have the freedom to customize the subtitle display to ensure an enjoyable and positive experience. This assumes having the technical ability to be able to use a web browser along with installing and interacting with extensions.


Contributor - The secondary user the application. They will be able to create and edit subtitles for any video on the web and keep track of personal contributions. We assume they will have and be able to use a browser with the extension enabled, have the technical ability to be able to use a web browser along with installing and interacting with extensions, and they will have the skill necessary to subtitle a video.



### User Actions
- Be able to toggle subtitles on/off.
- Have the ability to change settings of how subtitles appear.
- Have the ability to add new subtitles to a video without any.
- Have the ability to edit/fix existing subtitles in a video.
- Have the ability to get help for the extension. 
- Be able to navigate backwards to the previous screen in the extension.


## Project State
### Known Bugs
- When loading a new webpage, even if the extension is in the on state, it will be not active and showing subtitles on the current page until the extension window is opened again.

### Missing Features
- Review newly transcribed videos
- Submit video for corrections
- Enable subtitles on any video
