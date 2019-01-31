let quotesData;
let chosenQuote;
let chosenAuthor;
let arrayURL = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
let colorArray = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];

function getQuotes() {
  return $.ajax({
    url: arrayURL,
    success: function(x) {
      if (typeof x === 'string') {
        quotesData = JSON.parse(x);
        console.log('received');
      }
    }
  });
};

function getRandomQuote() {
  return quotesData.quotes[Math.floor(Math.random() * quotesData.quotes.length)];
};

function getRandomColor() {
  return colorArray[Math.floor(Math.random() * colorArray.length)]
};

function getQuote() {
  let randomQuote = getRandomQuote();
  let randomColor = getRandomColor();
  chosenQuote = randomQuote.quote;
  chosenAuthor = randomQuote.author;
  
  $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?text=' + encodeURIComponent('"' + chosenQuote + '" -' + chosenAuthor));
  
  $('#quote').animate(
    {opacity: 0}, 500,
    function() {
      $(this).animate({opacity: 1}, 500);
      $('#text').html(randomQuote.quote);
    }
  );
  $('#author-box').animate(
    {opacity: 0}, 500,
    function() {
      $(this).animate({opacity: 1}, 500);
      $('#author').html(randomQuote.author);
    }
  );
  $('html body').animate(
    {
      backgroundColor: randomColor,
      color: randomColor
    }, 1000
  );
  $('.button').animate(
    {backgroundColor: randomColor,}, 1000
  );
};

$(document).ready(function() {
  getQuotes().done(() => {
    getQuote();
  });
  
  $('#new-quote').click(function() {
    getQuote();
  });

  $('#tumblr').click(function() {
    window.open('https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=' + chosenAuthor + '&content=' + chosenQuote + '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button');
  });
  
});