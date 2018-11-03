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
        const subtitle = captionToSubtitle(c);
        createSubtitleElement(subtitle);
    }
}

function captionToSubtitle(c) {
    const start = c.start;
    const end = c.end;

    return {
        "startMinute": start.split(":")[0],
        "startSecond": start.split(":")[1],
        "endMinute": end.split(":")[0],
        "endSecond": end.split(":")[1],
        "caption": c.caption,
    }
}

function createSubtitleElement(subtitle) {
    const subtitleElement = `
        <div class="subtitle-entry test">
            <button class="time-remove time-button">x</button>
            <p class="time inline" contenteditable="true">${subtitle.startMinute}</p>
            <pre class="inline">:</pre>
            <p class="time inline" contenteditable="true">${subtitle.startSecond}</p>
            <pre class="inline"> - </pre>
            <p class="time inline" contenteditable="true">${subtitle.endMinute}</p>
            <pre class="inline">:</pre>
            <p class="time inline" contenteditable="true">${subtitle.endSecond}</p>
            <textarea class="subtitle" rows="3" contenteditable="true">${subtitle.caption}</textarea>
            <button class="time-new time-button">+</button>
        </div>
    `;

    const subtitleContainer = document.getElementById("subtitle-container");
    subtitleContainer.innerHTML += subtitleElement;
}

// TODO: Doesn't work well with newly created eles, find new way
function bindEvents () {
    // handle save-button events
    document.getElementById("save-button").addEventListener("click", e => {
        e.target.classList.add("hidden");
        // TODO: update captions.json
    });

    // handle time-remove
    const remove_buttons = document.getElementsByClassName("time-remove");
    for (let removeButton of remove_buttons) {
        removeButton.addEventListener("click", e => {
            const subtitleEntry = removeButton.parentNode;
            subtitleEntry.parentNode.removeChild(subtitleEntry);
        });
    }

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