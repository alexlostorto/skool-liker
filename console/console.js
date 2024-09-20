console.log("Script is running");

const delay = 500; // Example: 100 milliseconds
let working = false;

async function main() {
    console.log("Running");

    working = true;
    const likeButtons = document.querySelectorAll('button.dyKdeN.styled__VoteButton-sc-1e3d9on-2');

    let i = 0;
    function clickButtons() {
        setTimeout(function() {
            try {
                let likeButton = likeButtons[i];

                // Identify the like button
                likeButton.style.border = '2px solid red';

                // Check if already liked
                if (likeButton.querySelector('rect') == null) {
                    likeButton.click();
                }
            } catch(err) {}
            i++;
            if (i < likeButtons.length) {
                clickButtons();
            } else {
                working = false;
            }
        // Wait 100 milliseconds between each like
        }, delay)
    }

    clickButtons();
}

async function credits() {
    console.clear();
    console.log.apply(console, ["%c Thanks for using my Skool Liker! ","color: #fff; background: #8000ff; padding:5px 0;"])
    console.log.apply(console, ["%c Designed and Developed by Alex lo Storto %c\ud83d\ude80 ","color: #fff; background: #8000ff; padding:5px 0;","color: #fff; background: #242424; padding:5px 0 5px 5px;"])
}

setInterval(function() {
    if (working) {return}
    main();
}, 1000)
setInterval(credits, 1000);
