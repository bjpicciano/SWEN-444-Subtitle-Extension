const video_id = "YE7VzlLtp-4";

window.onload = () => {
    const times = document.getElementsByClassName("time");
    for (let ele of times) {
        ele.addEventListener("focus", e => {
            document.execCommand('selectAll', false, null)
        });

        ele.addEventListener("input", e => {
            // prevent erroneous input (text, > 2 characters, etc)
        });
    }

    get(`getcaptions?id=${video_id}`)
        .then(data => {
            console.log(data);
        })
        .catch(e => {
            console.error(e);
        });
};

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