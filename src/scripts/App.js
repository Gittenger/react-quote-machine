import React from "react";

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
  }
}

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
        <button onClick={displayQuote}>Get another quote</button>
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
