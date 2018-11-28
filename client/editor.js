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
            document.getElementById("loader").classList.add("hidden");
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
    for (let subtitle of data.captions) {
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

            // Remove and re-add fade-out to trigger animation
            const saveMessage = document.getElementById("save-message");
            saveMessage.classList.remove("hidden");
            setTimeout(() => {
                saveMessage.classList.add("hidden");
            }, 2000);
        })
        .catch(e => {
            console.error(e);
        });
}

function closeEditor() {
    if (confirm("Are you sure you want to quit?"))
        window.location = "http://localhost:8080/";
}

function createSubtitleElement(subtitle = {}, prevElement) {
    const subtitleString = `
        <div class="subtitle-entry">
            <div class="arrows">
                <img onclick="moveSubtitle(this, 'up')" class="arrow" src="https://image.flaticon.com/icons/svg/7/7645.svg" title="Move Subtitle Up">
                <br />
                <img onclick="moveSubtitle(this, 'down');" class="arrow" src="https://image.flaticon.com/icons/svg/25/25224.svg" title="Move Subtitle Down">
            </div>
            <button class="time-remove time-button" onclick="removeSubtitleElement(this)">x</button>
            <div class="times">
                <input maxlength="5" class="inline time" placeholder="00:00" value="${subtitle.start || "00:00"}">
                <p class="inline">-</p>
                <input maxlength="5" class="inline time" placeholder="00:00" value="${subtitle.end || "00:00"}">
            </div>
            <textarea class="caption" rows="3">${subtitle.caption || ""}</textarea>
            <button class="time-new time-button" onclick="createSubtitleElement(undefined, this.parentNode)">+</button>
        </div>
    `;

    const subtitles = document.getElementById("subtitle-container");
    const subtitleElement = stringToElement(subtitleString);

    if (!prevElement) {
        subtitles.appendChild(subtitleElement);
    } else {
        // hacky insert after
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

                data.push(videoEntry);
            }

            videoEntry["captions"] = [];

            const subtitleEntries = document.querySelectorAll(".subtitle-entry");
            for (let subtitleEntry of subtitleEntries) {
                const times = subtitleEntry.querySelectorAll("input.time");
                const caption = subtitleEntry.querySelector("textarea");

                const captionEntry = {
                    "start": times[0].value,
                    "end": times[1].value,
                    caption: caption.value
                };

                videoEntry.captions.push(captionEntry);
            }

            return data;
        })
        .catch(e => {
            console.error(e);
        });
}

function moveSubtitle(ele, direction) {

    const subtitleEntry = ele.parentNode.parentNode;
    const subtitleContainer = subtitleEntry.parentNode;

    let siblingEntry;
    let insertEntry;

    if (direction === "up") {
        siblingEntry = subtitleEntry.previousSibling;
        insertEntry = siblingEntry;
    } else if (direction === "down") {
        siblingEntry = subtitleEntry.nextSibling;
        insertEntry = siblingEntry.nextSibling;
    } else {
        return;
    }

    if (siblingEntry && siblingEntry.classList && siblingEntry.classList[0] === "subtitle-entry") {
        subtitleContainer.removeChild(subtitleEntry);
        subtitleContainer.insertBefore(subtitleEntry, insertEntry);
    }
}