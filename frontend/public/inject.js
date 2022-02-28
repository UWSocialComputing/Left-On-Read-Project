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
TIME = 10000; // how frequently to run tracking code, in ms 

// keep track of window visibility
var windowVisible = false;

function visibilityListener() {
    switch (document.visibilityState) {
        case "hidden":
            windowVisible = false;
            console.log("i'm unseen");
            break;
        case "visible":
            windowVisible = true;
            console.log("I'm seen!!!!!!!");
            break;
    }
}

document.addEventListener("visibilitychange", visibilityListener);

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

// run this at set intervals
setInterval(function (windowVisible) {
    if (windowVisible) {
        document.getElementById("wpm").innerText = clicksArray.length > 0 ? clicksArray.toString() : "sfsfds";
        
        // PUT
        fetch('https://twyd.herokuapp.com/status/user_2/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "current_tab": "Docs", "keyboard_activity": clicksArray.length > 0 ? clicksArray : "[]" }),
        })
    }
    clicksArray = [];
}, TIME, windowVisible);

// build user faces
var users = ["user_1", "user_2", "user_3"];
// FLAG: this will some day be programmatic

const hardcode = [{ "user_name": "user_2", "alias": "Ora Aubrey", "current_tab": null, "keyboard_activity": [] }, { "user_name": "user_3", "alias": "Raleigh Wei", "current_tab": null, "keyboard_activity": [] }, { "user_name": "user_1", "alias": "Dana Hikaru", "current_tab": "Docs", "keyboard_activity": [2, 3] }]

for (var userIdx = 0; userIdx < users.length; userIdx++) {
    // instantiate and attach the face
    const faceDiv = document.createElement("div");
    const userName = users[userIdx];
    let name = userName.substring(0, 2);
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    const faceDiv = generateAvatar(name, "white", "#" + randomColor); // TODO: random color

    // set the listener to do the activity indicator
    setInterval(function (userName) {
        if (windowVisible) {
            //
            faceDiv.innerText = "present" + userName;

            newDiv.appendChild(faceDiv);
            // FLAG: this will need to be a pull request
            fetch('https://twyd.herokuapp.com/room/', {
                method: 'GET'
            }).then(response => response.json())
                .then(response => {
                    console.log(response);
                    // we need to find our specific user
                    // and then simulate their typing
                    for (const userInfo in response) {
                        if (userInfo["user_name"] == "userName") {
                            console.log(userInfo["keyboard_activity"]);
                        }
                    }
                });
            // get activity here?
            pulsate(faceDiv, Math.random()*20+1);
        }
    }, TIME, userName);

}

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