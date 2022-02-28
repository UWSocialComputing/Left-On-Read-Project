// build the banner

const newDiv = document.createElement("div");
newDiv.setAttribute("id", "lor-banner");

// hover-over thing
const hover = document.createElement("div");
hover.setAttribute("id", "hover-card");
newDiv.appendChild(hover);


// set CSS


// create the debugging div
newDiv.setAttribute("class", "lor-banner");
const unDiv = document.createElement("p");
unDiv.setAttribute("id", "wpm");
newDiv.appendChild(unDiv);

STEP = 10; // sigfig; round to 1/STEP
TIME = 1000; // how frequently to run tracking code, in ms 

let lastTime = Date.now();
let clicksArray = [];

// upon keystroke
window.onkeydown = function () {
    let currTime = Date.now(); // provides date in ms
    let diffMs = currTime - lastTime;
    // let timeDiff = Math.round(diffMs * STEP) / STEP; // rounds to nearest 1/STEP
    let timeDiff = diffMs;
    console.log(timeDiff);
    clicksArray.push(timeDiff);
    lastTime = currTime;
};

// keep track of window visibility
var windowVisible = true;

function visibilityListener() {
    switch (document.visibilityState) {
        case "hidden":
            windowVisible = false;
            console.log("i'm unseen");
            break;
        case "visible":
            windowVisible = true;
            break;
    }
}

document.addEventListener("visibilitychange", visibilityListener);

// run this at set intervals
setInterval(function () {
    if (windowVisible) {
       // document.getElementById("wpm").innerText = clicksArray.length > 0 ? clicksArray.toString() : "sfsfds";
        clicksArray = [];

        // add put code here
    }
}, TIME);

fetch('https://twyd.herokuapp.com/status/user_1/', {
    method: 'PUT', // or 'PUT'
    headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
    },
    body: { "current_tab": "Docs", "keyboard_activity": [2, 3, 4] },
})

// build user faces
var users = ["user_1", "user_2", "user_3"];
// FLAG: this will some day be programmatic

for (var userIdx = 0; userIdx < users.length; userIdx++)
{
    const userName = users[userIdx];
    let name = userName.substring(0, 2);
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    const faceDiv = generateAvatar(name, "white", "#" + randomColor); // TODO: random color

    // set the listener to do the activity indicator
    setInterval(function(userName) {
        if (windowVisible) 
        {
            //
            newDiv.appendChild(faceDiv);
            // FLAG: this will need to be a pull request
            // get activity here?
            pulsate(faceDiv, Math.random()*20+1);
        }
    }, TIME, userName);

}

fetch('https://twyd.herokuapp.com/room/', {
    method: 'GET'
}).then(response => response.json())
    .then(response => {
        // Do something with response.
        console.log(response);
    });

// for users in room
// build faces

// make the div the first one
document.body.appendChild(newDiv);

// while (being seen)
// {
// query for status
// }
// 

// generate an avatar icon
function generateAvatar(text, foregroundColor, backgroundColor) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    // refresh before rendering
    context.clearRect(0, 0, canvas.width, canvas.height);

    canvas.width = 200;
    canvas.height = 200;

    // Draw background
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw text
    context.font = "bold 100px Assistant";
    context.fillStyle = foregroundColor;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    return canvas;
}

function hoverShowInfo() {

}

function pulsate (canvas, rate) {
    const context = canvas.getContext("2d");

    // for pulsating    
    context.lineWidth = 30;
    context.strokeStyle = rate > 10 ? "#42f56c" : "#fcd860"; // turn to green when active?
    context.strokeRect(0, 0, canvas.width, canvas.height);//for white background
    // turn this stroke on and off
}