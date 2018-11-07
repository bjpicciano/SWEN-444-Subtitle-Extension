chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message == "toggle") {
            var visibility = request.value ? "visible": "hidden";
            document.styleSheets[0].addRule('video::cue','visibility: ' + visibility + ';');
        }
    }
);
