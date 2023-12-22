const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuotesBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// globle variable
let apiQuotes = [];
//Show Loading

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show New Quote
function newQuote() {
  loading();
  //  Pick a random qote fron apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // check author field is blank and replace it with 'unknown'

  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  // Check quote length to detrmine styling
  if (quote.text.length > 50) {
    quoteText.classList.add("long-qoute");
  } else {
    quoteText.classList.remove("long-qoute");
  }
  // Set Quote
  quoteText.textContent = quote.text;
  // Set Hide Loader
  complete();
}

// Get Quotes From API
async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";

  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // Catch Error Here
  }
}

// Tweet Quote
function tweetQuote() {
  const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(tweetUrl, "_blank");
}

// Event
newQuotesBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// on Load
getQuotes();
