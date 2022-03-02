
export function getKeyboardActivity () { 
    var numClicks = 0;
    var timeOldClick = 0;
  
    window.onkeydown = function () { 
      timeOldClick = Date.now()
      numClicks++; 
    }; 
    this.secondsIntervalID = setInterval(function () {  
      numClicks--;
  
    }, 1000); 
    this.clicksPerSecond = function () { 
      var diff = Date.now() - timeOldClick;
      if (diff > 2000) {
        numClicks = 0;
        return 0;
      }
      return Math.ceil(diff);
    } 
  } 
   
  // Array will be of length 4, array
  var cpsCounter = new getKeyboardActivity(); 