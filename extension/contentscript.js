chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message == "toggle") {
            var visibility = request.value ? "visible": "hidden";
            document.styleSheets[0].addRule('video::cue','visibility: ' + visibility + ';');
        }
        else if(request.message == "customize-subs"){
            let fontColor = request.fontColor;
            let bkgdColor = request.bkgdColor;
            document.styleSheets[0].addRule('video::cue','color: #' + fontColor + ' !important;');
            document.styleSheets[0].addRule('video::cue','background: #' + bkgdColor + ' !important;');
        }
    }
);
