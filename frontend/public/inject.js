// build the banner




// alert('hello world')
console.log('potato farm')

const newDiv = document.createElement("div");
newDiv.setAttribute("id", "lor-banner");

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
        document.getElementById("wpm").innerText = clicksArray.length > 0 ? clicksArray.toString() : "sfsfds";
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
    // instantiate and attach the face
    const faceDiv = document.createElement("div");
    const userName = users[userIdx];
    faceDiv.setAttribute("id", "lor-user-".concat(userName))
    faceDiv.setAttribute("class", "icon")
    newDiv.appendChild(faceDiv);

    // set the listener to do the activity indicator
    setInterval(function(userName) {
        if (windowVisible) 
        {
            //
            faceDiv.innerText = "present" + userName + " ";
            // FLAG: this will need to be a pull request
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