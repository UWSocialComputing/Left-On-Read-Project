// build the banner




// alert('hello world')
console.log('potato farm')

const newDiv = document.createElement("div");
newDiv.setAttribute("id", "lor-banner");

// set CSS

// make the div the first one

newDiv.setAttribute("class", "lor-banner");
const unDiv = document.createElement("div");
unDiv.setAttribute("id", "wpm");
newDiv.appendChild(unDiv);

// for users in room
// build faces

document.body.appendChild(newDiv);

// while (being seen)
// {
// query for status
// }
// 

class ClicksCounter {
    constructor(time, step) {
        let lastTime = Date.now();
        let clicksArray = [];

        window.onkeydown = function () {
            let currTime = Date.now();
            let timeDiff = Math.round(((currTime - lastTime) / 1000) * step) / step;
            console.log(timeDiff);
            clicksArray.push(timeDiff);
            lastTime = currTime;
        };

        this.resetArray = setInterval(function () {
            document.getElementById("wpm").innerText = clicksArray;
            clicksArray = [];
        }, time);

        this.getArray = function () {
            return clicksArray;
        };
    }
}

var kCounter = new ClicksCounter(1000, 10);
