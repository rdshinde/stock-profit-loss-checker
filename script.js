// selecting required elements
const quantities = document.querySelector("#quantities");
const initialPrice = document.querySelector("#initial-price");
const currentPrice = document.querySelector("#current-price");
const stockName = document.querySelector("#stock-name");
const result = document.querySelector("#result");
const getCurrentPrice = document.querySelector('#get-current-price');

const forAPIData = document.querySelector("#name");
const forAPI = document.querySelector("#from-api");
const calculate = document.querySelector("#calculate");
const overlay = document.querySelector("#overlay");

// event listener for stock name appearance
forAPI.addEventListener("click", function () {
  forAPIData.classList.remove("hidden"); //using classlist property
  forAPI.classList.add("hidden");
  currentPrice.disabled = true;
});
// event listener for overlay
overlay.addEventListener("click", function () {
  forAPIData.classList.add("hidden");
  forAPI.classList.remove("hidden");
  currentPrice.disabled = false;
});

// Calculating profit or loss
function calculateProfitOrLoss() {
  const buyingPrice = parseFloat(initialPrice.value);
  const currPrice = parseFloat(currentPrice.value);
  const quantity = parseInt(quantities.value);
  // calculating price difference in current price and initial price
  const priceDiff = currPrice - buyingPrice;
  // handling empty input
  if (buyingPrice > 0 && currPrice > 0 && quantity > 0) {
    // for profit calculation
    if (priceDiff > 0) {
      const profit = (priceDiff * quantity).toFixed(2);
      const profitPercentage = Math.trunc((priceDiff / buyingPrice) * 100);
      result.innerText = `Wow! you are in profit with ${profitPercentage}% that is ${profit} rupees.`;
      result.style.color = "green";
    }
    //   for loss calculation
    else if (priceDiff < 0) {
      const loss = (priceDiff * quantity).toFixed(2);
      const lossPercentage = Math.trunc((priceDiff / buyingPrice) * 100);
      result.innerText = `Sorry! you are in loss with ${lossPercentage}% that is ${loss} rupees.`;
      result.style.color = "#ff0e0e";
    }
    //   for no loss, no profit
    else {
      result.innerText = `No Gain, No Pain`;
      result.style.color = "#03506f";
    }
  } else {
    alert(
      "These values cannot be zero or negative. Please enter correct values."
    );
  }
}

// for getting currentPrice trough API
function getData() {
  stock = stockName.value.toUpperCase();
  var url =
    "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=" +
    stock +
    ".BSE&outputsize=full&apikey=K8TU2ND7L5Z688IB";

  jQuery.ajax({
    url: url,
    dataType: "json",
    contentType: "application/json",
    success: function (data) {
      var lastRefreshed = data["Meta Data"]["3. Last Refreshed"];

      currentPrice.value =
        data["Time Series (Daily)"][lastRefreshed]["4. close"];
    },
  });
}
// Adding event listerners for api and calculation respectively
setTimeout(getCurrentPrice.addEventListener("click", getData),100);
setTimeout(calculate.addEventListener("click", calculateProfitOrLoss),1000);