// Build

// Container init
const containerDiv = document.createElement("div");
containerDiv.setAttribute("id", "container");
containerDiv.setAttribute("class", "container");

// Banner init
const bannerDiv = document.createElement("div");
bannerDiv.setAttribute("id", "lor-banner");
bannerDiv.setAttribute("class", "lor-banner")

// Hover-card init
const hoverDiv = document.createElement("div");
hoverDiv.setAttribute("id", "hover-card");

// Add hover-card and banner as children of container
containerDiv.appendChild(hoverDiv);
containerDiv.appendChild(bannerDiv);

STEP = 10; // sigfig; round to 1/STEP
TIME = 1000; // how frequently to run tracking code, in ms 
ACTUALLY_PUT = false;

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
setInterval(function () {
    if (!document.hidden) {
        // document.getElementById("wpm").innerText = clicksArray.length > 0 ? clicksArray.toString() : "sfsfds";

        // PUT
        if (ACTUALLY_PUT) {
            fetch('https://twyd.herokuapp.com/status/user_2/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "current_tab": "Docs", "keyboard_activity": clicksArray.length > 0 ? clicksArray : "[]" }),
            })
        }
    }
    clicksArray = [];
}, TIME);

// build user faces
const hardcode = [{ "user_name": "user_2", "alias": "Ora Aubrey", "current_tab": null, "keyboard_activity": [] }, { "user_name": "user_3", "alias": "Raleigh Wei", "current_tab": null, "keyboard_activity": [] }, { "user_name": "user_1", "alias": "Dana Hikaru", "current_tab": "Docs", "keyboard_activity": [2, 3] }]
// FLAG: this will some day be programmatic

var users = ["user_1", "user_2", "user_3"];
const userBox = document.createElement("div");
userBox.setAttribute("class", "center-align");
bannerDiv.appendChild(userBox);

for (var userIdx = 0; userIdx < users.length; userIdx++) {
    // instantiate and attach the face
    const faceDiv = document.createElement("div");
    faceDiv.setAttribute("class", "user-div");
    // faceDiv.innerHTML = users[userIdx];
    userBox.appendChild(faceDiv);

    const img = document.createElement("img");
    img.setAttribute("src", "https://christopherkang.me/assets/img/Kang_new_prof.jpg")
    img.setAttribute("class", "user-img");
    img.setAttribute("id", "user-" + users[userIdx]);
    faceDiv.appendChild(img);

    const userName = users[userIdx];

    // set the listener to do the activity indicator
    setInterval(function (userName) {
        if (!document.hidden) {
            // FLAG: this will need to be a pull request
            fetch('https://twyd.herokuapp.com/room/', {
                method: 'GET'
            }).then(response => response.json())
                .then(response => {
                    // we need to find our specific user
                    // and then simulate their typing
                    response.map((userInfo) => {
                        if (userInfo["user_name"] == userName) {
                            const keyboardActivity = userInfo["keyboard_activity"]
                            console.log("KEYBOARD: " + keyboardActivity);

                            var activate = () => {
                                var avatar = document.getElementById("user-" + userName);
                                avatar.setAttribute("style", "border: solid 5px rgb(255, 0, 0);");
                            }

                            var deactivate = () => {
                                var avatar = document.getElementById("user-" + userName);
                                avatar.setAttribute("style", "border: solid 5px rgb(0, 153, 255);");
                            }

                            var runsum = 0;
                            var idx = 0;
                            const DISPLAY_TIME = 300;
                            setInterval(() => {
                                if (runsum <= 900 && idx < keyboardActivity.length) {

                                    runsum += keyboardActivity[idx] + DISPLAY_TIME;

                                    activate();

                                    setTimeout(() => {
                                        deactivate();
                                    }, DISPLAY_TIME);

                                    // setTimeout(() => {
                                    //     idx++;
                                    // }, Math.max(0, keyboardActivity[idx] - DISPLAY_TIME));
                                    setTimeout(() => {
                                    }, 50);
                                    idx++;
                                } else {
                                    clearInterval();
                                }
                            }, 1000);
                            // while (runsum <= 900 && idx < keyboardActivity.length) {
                            //     console.log(idx);
                            //     console.log("length: " + keyboardActivity.length);

                            // }
                        }
                    });


                    // for (var responseIdx = 0; responseIdx < response.length; responseIdx++) {
                    //     const userInfo = response[responseIdx];
                    //     if (userInfo["user_name"] == userName) {
                    //         const keyboardActivity = userInfo["keyboard_activity"]
                    //         console.log("KEYBOARD: " + keyboardActivity);

                    //         var activate = () => {
                    //             var avatar = document.getElementById("user-" + userName);
                    //             avatar.setAttribute("style", "border: solid 5px rgb(255, 0, 0);");
                    //         }

                    //         var deactivate = () => {
                    //             var avatar = document.getElementById("user-" + userName);
                    //             avatar.setAttribute("style", "border: solid 5px rgb(0, 153, 255);");
                    //         }

                    //         var runsum = 0;
                    //         var idx = 0;
                    //         while (runsum <= 900 && idx < keyboardActivity.length) {
                    //             runsum += keyboardActivity[idx];

                    //             activate();

                    //             setTimeout(() => {
                    //                 deactivate();
                    //             }, 50);

                    //             // setTimeout(() => {
                    //             //     idx++;
                    //             // }, Math.max(0, keyboardActivity[idx]));
                    //             setTimeout(() => {
                    //                 idx++;
                    //             }, 50);

                    //         }
                    //     }
                    // }
                    // for (const userInfo of response) {
                    // console.log(response);
                    // })

                });
            // get activity here?
        }
    }, TIME, userName);

}

// for users in room
// build faces

// make the div the first one
document.body.appendChild(containerDiv);