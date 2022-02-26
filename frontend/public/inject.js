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
    let diffSec = (currTime - lastTime) / 1000;
    let timeDiff = Math.round(diffSec * STEP) / STEP; // rounds to nearest 1/STEP
    console.log(timeDiff);
    clicksArray.push(timeDiff);
    lastTime = currTime;
};

// run this at set intervals
setInterval(function () {
    document.getElementById("wpm").innerText = clicksArray.length > 0 ? clicksArray.toString() : "sfsfds";
    clicksArray = [];

    // add put code here
}, TIME);

// for users in room
// build faces

// make the div the first one
document.body.appendChild(newDiv);

// while (being seen)
// {
// query for status
// }
// 

// class ClicksCounter {
//     constructor(time, step) {
//         let lastTime = Date.now();
//         let clicksArray = [];

//         window.onkeydown = function () {
//             let currTime = Date.now();
//             let timeDiff = Math.round(((currTime - lastTime) / 1000) * step) / step;
//             console.log(timeDiff);
//             clicksArray.push(timeDiff);
//             lastTime = currTime;
//         };

//         this.resetArray = setInterval(function () {
//             document.getElementById("wpm").innerText = clicksArray;
//             clicksArray = [];
//         }, time);

//         this.getArray = function () {
//             return clicksArray;
//         };
//     }
// }

// var kCounter = new ClicksCounter(1000, 10);
