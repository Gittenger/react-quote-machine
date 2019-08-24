import React from "react";

const updateDisplay = () => {
  displayQuote();
  changeColor();
};

async function displayQuote() {
  const url =
    "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

  try {
    const responseObj = await fetch(url);
    const data = await responseObj.json();
    const quotes = data.quotes;
    const index = randNum(quotes.length);
    const quote = quotes[index];

    const quoteEl = document.querySelector("#quote");
    const authorEl = document.querySelector("#author");

    quoteEl.innerHTML = quote.quote;
    authorEl.innerHTML = quote.author;
  } catch (err) {
    console.error("Error grabbing quote");
    displayQuote();
  }
}

const changeColor = () => {
  const element = document.querySelector(".App");
  const colors = getColors(); //returns array of css variables (color names)
  const index = Math.round(Math.random() * (colors.length - 1));
  const colorName = colors[index];

  //use regex to get string of color name from css variable
  let newColor = `${colorName}`.replace(/-/g, "");

  if (element.dataset.color === newColor) {
    changeColor();
  } else {
    element.dataset.color = newColor;
    document
      .querySelector(".App")
      .style.setProperty("--appBackgroundColor", `var(${colorName})`);
  }
};

const getColors = () => {
  let sheets = document.styleSheets;
  let rootStyles;

  //for loop to locate :root styles
  for (let i = 0; i < sheets.length; i++) {
    for (let j = 0; j < sheets[i].cssRules.length; j++) {
      if (sheets[i].cssRules[j].selectorText) {
        //finding :root style rules if selectorText exists in rule declarations
        if (sheets[i].cssRules[j].selectorText === ":root") {
          rootStyles = sheets[i].cssRules[j].style;
        }
      }
    }
  }

  //filtering out css vars from :root styles
  const colors = Array.from(rootStyles).filter(prop => {
    return prop.startsWith("--color");
  });

  return colors;
};

const randNum = max => {
  const factor = Math.random();
  let num;

  if (factor < 0.01) {
    num = 0;
  } else if (factor > 0.99) {
    num = max;
  } else {
    num = Math.ceil(factor * max);
  }
  return num;
};

class App extends React.Component {
  componentDidMount() {
    displayQuote();
  }

  render() {
    return (
      <div className="App" data-color="red">
        <div id="quotes-container">
          <p id="quote-text">
            <span className="quote-box">
              {" "}
              "<span id="quote" />"{" "}
            </span>
            <span className="author-box">
              {" "}
              ~<span id="author" />{" "}
            </span>
          </p>
          <button onClick={updateDisplay}>Get another quote</button>
        </div>
      </div>
    );
  }
}

export default App;
