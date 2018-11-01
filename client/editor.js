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
};

let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '',
        width: '',
        videoId: 'YE7VzlLtp-4',
        events: {
            'onReady': () => {},
            'onStateChange': () => {}
        }
    });
}