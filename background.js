const playSound = () => {
    if (typeof(audio) != "undefined" && audio) {
        audio.pause();
        document.body.removeChild(audio);
        audio = null;
    }
    audio = document.createElement('audio');
    document.body.appendChild(audio);
    audio.autoplay = true;
    audio.src = chrome.extension.getURL('tada.mp3');
    audio.play();
};

chrome.extension.onMessage.addListener((message, sender, sendResponse) => {
    if (message && message.type == 'playSound') {
        playSound();
        sendResponse(true);
    }
});