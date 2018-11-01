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
        "start_minute": start.split(":")[0],
        "start_second": start.split(":")[1],
        "end_minute": end.split(":")[0],
        "end_second": end.split(":")[1],
        "caption": c.caption,
    }
}

function createSubtitleElement(subtitle) {
    const subtitle_element = `
        <div class="subtitle-entry test">
            <button class="time-remove time-button">x</button>
            <p class="time inline" contenteditable="true">${subtitle.start_minute}</p>
            <pre class="inline">:</pre>
            <p class="time inline" contenteditable="true">${subtitle.start_second}</p>
            <pre class="inline"> - </pre>
            <p class="time inline" contenteditable="true">${subtitle.end_minute}</p>
            <pre class="inline">:</pre>
            <p class="time inline" contenteditable="true">${subtitle.end_second}</p>
            <textarea class="subtitle" rows="3" contenteditable="true">${subtitle.caption}</textarea>
            <button class="time-new time-button">+</button>
        </div>
    `;

    const subtitle_container = document.getElementById("subtitle-container");
    subtitle_container.innerHTML += subtitle_element;
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
    for (let remove_button of remove_buttons) {
        remove_button.addEventListener("click", e => {
            const subtitle_entry = remove_button.parentNode;
            subtitle_entry.parentNode.removeChild(subtitle_entry);
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
    const textareas = document.getElementsByTagName("textarea");
    for (let ele of textareas) {
        ele.addEventListener("input", e => {
            document.getElementById("save-button").classList.remove("hidden");
        });
    }
}