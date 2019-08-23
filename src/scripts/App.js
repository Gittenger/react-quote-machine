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
  const colors = getColors();
  const index = Math.round(Math.random() * (colors.length - 1));
  const color = colors[index];

  document.querySelector(".App").style.backgroundColor = `var(${color})`;
};

const getColors = () => {
  //getting list of :root props from document.styleSheets...check cssRules prop if err
  let helper = document.styleSheets[0].cssRules[1].style;

  //filtering out css vars from :root styles
  const colors = Array.from(helper).filter(prop => {
    return prop.startsWith("--");
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
      <div className="App">
        <button onClick={updateDisplay}>Get another quote</button>
        <div id="quote-box">
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
        </div>
      </div>
    );
  }
}

export default App;
