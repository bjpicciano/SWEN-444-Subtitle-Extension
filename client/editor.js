const video_id = "47Uf9luX-co";
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
            if (e.message === "Not Found") {
                createSubtitleElement();
            } else {
                console.error(e);
            }
        });
};

function loadSubtitles(data) {
    for (c of data.captions) {
        const subtitle = createSubtitleFromCaption(c);
        createSubtitleElement(subtitle);
    }
}

function saveSubtitles() {
    gatherSubtitles()
        .then(data => {
            return post("updatecaption", data)
        })
        .then(data => {
            console.log(data);

            const saveButton = document.getElementById("save-button");
            // saveButton.classList.add("hidden");
        })
        .catch(e => {
            console.error(e);
        });
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
        <div class="subtitle-entry">
            <button class="time-remove time-button" onclick="removeSubtitleElement(this)">x</button>
            <div class="time">
                <p class="inline" contenteditable="true">${subtitle.startMinute || "00"}</p>
                <pre class="inline">:</pre>
                <p class="inline" contenteditable="true">${subtitle.startSecond || "00"}</p>
                <pre class="inline"> - </pre>
                <p class="inline" contenteditable="true">${subtitle.endMinute || "00"}</p>
                <pre class="inline">:</pre>
                <p class="inline" contenteditable="true">${subtitle.endSecond || "00"}</p>
            </div>
            <textarea class="caption" rows="3" contenteditable="true">${subtitle.caption || ""}</textarea>
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

    if (document.querySelectorAll(".subtitle-entry").length < 1) {
        createSubtitleElement();
    }
}

function gatherSubtitles() {
    return get("getcaptions")
        .then(data => {
            let videoEntry;
            // find the video
            for (let entry of data) {
                if (entry.id === video_id) {
                    videoEntry = entry;
                }
            }

            // if we don't find the video entry, make it
            if (!videoEntry) {
                videoEntry = {
                    "id": video_id,
                };

                data.append(videoEntry);
            }

            videoEntry["captions"] = [];

            const subtitleEntries = document.querySelectorAll(".subtitle-entry");
            for (let subtitleEntry of subtitleEntries) {
                const times = subtitleEntry.querySelectorAll("p[contenteditable='true']");
                const caption = subtitleEntry.querySelector("textarea");

                const startMinute = times[0].innerHTML,
                    startSecond = times[1].innerHTML,
                    endMinute = times[2].innerHTML,
                    endSecond = times[3].innerHTML,
                    text = caption.value;

                const captionEntry = {
                    "start": startMinute + ":" + startSecond,
                    "end": endMinute + ":" + endSecond,
                    caption: text
                };

                videoEntry.captions.push(captionEntry);
            }

            return data;
        })
        .catch(e => {
            console.error(e);
        });
}