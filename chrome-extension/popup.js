startButton = document.querySelector('#start');

startButton.addEventListener('click', function() {
    let delay = document.querySelector('#delay').value;

    console.log(delay);

    if (startButton.textContent == 'Start') {
        startButton.textContent = 'Stop';
    } else {
        startButton.textContent = 'Start';
    }

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {message: "Start", delay: delay});
    });
});