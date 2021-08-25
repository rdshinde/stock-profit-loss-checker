const quantities = document.querySelector("#quantities");
const initialPrice = document.querySelector("#initial-price");
const currentPrice = document.querySelector("#current-price");
const stockName = document.querySelector("#stock-name");
const result = document.querySelector("#result");

const forAPIData = document.querySelector("#name");
const forAPI = document.querySelector("#from-api");
const calculate = document.querySelector("#calculate");
const overlay = document.querySelector("#overlay");


forAPI.addEventListener("click", function () {
  forAPIData.classList.remove("hidden");
  forAPI.classList.add("hidden");
});
overlay.addEventListener("click", function () {
  forAPIData.classList.add("hidden");
  forAPI.classList.remove("hidden");
});

function errorHandler(error) {
  alert(error.message); // Error handling function
}

function calculateProfitOrLoss() {
  const buyingPrice = parseInt(initialPrice.value);
  const currPrice = parseInt(currentPrice.value);
  const quantity = parseInt(quantities.value);

  const priceDiff = currPrice - buyingPrice;

  if (buyingPrice && currPrice && quantity) {
    if (priceDiff > 0) {
      const profit = Math.trunc(priceDiff * quantity);
      const profitPercentage = Math.trunc((priceDiff / buyingPrice) * 100);
      result.innerText = `Wow! you are in profit with ${profitPercentage}% that is ${profit} rupees.`;
      result.style.color = "green";
    } else if (priceDiff < 0) {
      const loss = Math.trunc(priceDiff * quantity);
      const lossPercentage = Math.trunc((priceDiff / buyingPrice) * 100);
      result.innerText = `Sorry! you are in loss with ${lossPercentage}% that is ${loss} rupees.`;
      result.style.color = "#ff0e0e";
    } else {
      result.innerText = `No Gain, No Pain`;
      result.style.color = "#03506f";
    }
  } else {
    if (buyingPrice == 0 || currPrice == 0 || quantity == 0) {
      alert("This cannot be zero. Please enter correct value.");
    }
  }
}
calculate.addEventListener("click", calculateProfitOrLoss);

function getData() {
  stock = (stockName.value).toUpperCase();
  var url =
    "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol="+stock+".BSE&outputsize=full&apikey=K8TU2ND7L5Z688IB";

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
stockName.addEventListener('input',getData);