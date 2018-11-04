const video_id = "YE7VzlLtp-4";
let player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
        height: "",
        width: "",
        videoId: video_id,
        events: {
            "onReady": () => {},
            "onStateChange": () => {}
        }
    });
}

window.onload = () => {
    get(`getcaptions?id=${video_id}`)
        .then(data => {
            loadSubtitles(data);
            bindEvents();
        })
        .catch(e => {
            console.error(e);
        });
};

function loadSubtitles(data) {
    for (c of data.captions) {
        const subtitle = createSubtitleFromCaption(c);
        createSubtitleElement(subtitle);
    }
}

function saveSubtitles() {
    const saveButton = document.getElementById("save-button");
    saveButton.classList.add("hidden");
}

function createSubtitleFromCaption(caption) {
    const startTime = caption.start;
    const endTime = caption.end;

    return {
        "startMinute": startTime.split(":")[0],
        "startSecond": startTime.split(":")[1],
        "endMinute": endTime.split(":")[0],
        "endSecond": endTime.split(":")[1],
        "caption": caption.caption,
    };
}

function createSubtitleElement(subtitle = {}, prevElement) {
    const subtitleString = `
        <div class="subtitle-entry test">
            <button class="time-remove time-button" onclick="removeSubtitleElement(this)">x</button>
            <p class="time inline" contenteditable="true">${subtitle.startMinute || "00"}</p>
            <pre class="inline">:</pre>
            <p class="time inline" contenteditable="true">${subtitle.startSecond || "00"}</p>
            <pre class="inline"> - </pre>
            <p class="time inline" contenteditable="true">${subtitle.endMinute || "00"}</p>
            <pre class="inline">:</pre>
            <p class="time inline" contenteditable="true">${subtitle.endSecond || "00"}</p>
            <textarea class="subtitle" rows="3" contenteditable="true">${subtitle.caption || ""}</textarea>
            <button class="time-new time-button" onclick="createSubtitleElement(undefined, this.parentNode)">+</button>
        </div>
    `;

    const subtitles = document.getElementById("subtitle-container");
    const subtitleElement = stringToElement(subtitleString);

    if (!prevElement) {
        subtitles.appendChild(subtitleElement);
    } else {
        // hacky insertAfter
        subtitles.insertBefore(subtitleElement, prevElement.nextSibling)
    }
}

function stringToElement(str) {
    const d = document.createElement("div");
    d.innerHTML = str;
    return d.childNodes[1];
}

function removeSubtitleElement(removeButton) {
    const subtitleEntry = removeButton.parentNode;
    subtitleEntry.parentNode.removeChild(subtitleEntry);
}

// TODO: Doesn't work well with newly created eles, find new way
function bindEvents () {
    // handle save-button events
    document.getElementById("save-button").addEventListener("click", e => {
        e.target.classList.add("hidden");
        // TODO: update captions.json
    });

    // handle timestamp events
    const times = document.getElementsByClassName("time");
    for (let ele of times) {
        ele.addEventListener("focus", e => {
            document.execCommand('selectAll', false, null)
        });

        ele.addEventListener("input", e => {
            document.getElementById("save-button").classList.remove("hidden");
            // TODO: validate input as user updates
        });
    }

    // handle textarea events
    const textAreas = document.getElementsByTagName("textarea");
    for (let ele of textAreas) {
        ele.addEventListener("input", e => {
            document.getElementById("save-button").classList.remove("hidden");
        });
    }
}