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
            <button class="time-button">x</button>
            <p class="time inline" contenteditable="true">${subtitle.start_minute}</p>
            <pre class="inline">:</pre>
            <p class="time inline" contenteditable="true">${subtitle.start_second}</p>
            <pre class="inline"> - </pre>
            <p class="time inline" contenteditable="true">${subtitle.end_minute}</p>
            <pre class="inline">:</pre>
            <p class="time inline" contenteditable="true">${subtitle.end_second}</p>
            <textarea class="subtitle" rows="3" contenteditable="true">${subtitle.caption}</textarea>
            <button class="time-button">+</button>
        </div>
    `;

    const subtitle_container = document.getElementById("subtitle-container");
    subtitle_container.innerHTML += subtitle_element;
}

function bindCaptionEvents () {
    const times = document.getElementsByClassName("time");
    for (let ele of times) {
        ele.addEventListener("focus", e => {
            document.execCommand('selectAll', false, null)
        });

        ele.addEventListener("input", e => {
            // prevent erroneous input (text, > 2 characters, etc)
        });
    }
}