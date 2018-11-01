window.onload = () => {

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