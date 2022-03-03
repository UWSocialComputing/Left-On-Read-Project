
export class KeyboardReader {
  constructor(sample_interval) {
    let lastTime = Date.now();
    let clicksArray = [];

    window.onkeypress = function () {
      let currTime = Date.now();
      let timeDiff = currTime - lastTime;
      clicksArray.push(timeDiff);
      lastTime = currTime;
    };

    // window.onkeydown = function () {
    //   clicksArray.push(0); // may need to be checked
    //   lastTime = Date.now();
    // };

    this.resetArray = setInterval(function () {
      // console.log(clicksArray);
      clicksArray = [];
      lastTime = Date.now();
    }, sample_interval);

    this.getArray = function () {
      return clicksArray;
    };
  }
} 


export function testTab(response) {
  return response;
}