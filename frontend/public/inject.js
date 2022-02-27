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
    faceDiv.setAttribute("id", "lor-user-".concat(userName))

    newDiv.appendChild(faceDiv);

    // set the listener to do the activity indicator
    setInterval(function (userName) {
        if (windowVisible) {
            //
            faceDiv.innerText = "present" + userName;

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