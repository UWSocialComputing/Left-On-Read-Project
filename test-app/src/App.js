import logo from './logo.svg';
import './App.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p id="demo">clicks per time</p>
        <p id="wpm"></p>
        <img height="48" width="48" src='http://www.google.com/s2/favicons?domain=https://docs.google.com/spreadsheets/u/0/?tgif=d' />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
       </a>
      </header>
    </div>

  );
}




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

export default App;
