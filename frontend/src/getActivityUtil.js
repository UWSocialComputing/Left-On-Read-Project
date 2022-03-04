// Values in array should now be the time since the initial sampling time for each sampling cycle
// Values should ascend
export class KeyboardReader {
  constructor(sample_interval) {
    let sampleStartTime = Date.now();
    let clicksArray = [];

    window.onkeydown = function () {
      clicksArray.push(Date.now() - sampleStartTime);
    };

    this.resetArray = setInterval(function () {
      clicksArray = [];
      sampleStartTime = Date.now(); // reset the staritng time
    }, sample_interval);

    this.getArray = function () {
      return clicksArray;
    };
  }
}

// export class KeyboardReader {
//   constructor(sample_interval) {
//     let lastTime = Date.now();
//     let clicksArray = [];

//     window.onkeydown = function () {
//       let currTime = Date.now();
//       let timeDiff = currTime - lastTime;
//       clicksArray.push(timeDiff);
//       lastTime = currTime;
//     };

//     this.resetArray = setInterval(function () {
//       // console.log(clicksArray);
//       clicksArray = [];
//       lastTime = Date.now();
//     }, sample_interval);

//     this.getArray = function () {
//       return clicksArray;
//     };
//   }
// }
