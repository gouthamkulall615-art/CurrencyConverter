const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropDown = document.querySelectorAll(".dropdown select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

// Populate dropdowns
for (let select of dropDown) {
  for (let currCode of Object.keys(countryList)) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;

    if (select.name === "from" && currCode === "USD") {
      newOption.selected = true;
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = true;
    }

    select.append(newOption); // append only once
  }

  // Update flag when dropdown changes
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });

  // Show flag initially
  updateFlag(select);
}

// Update flag images
function updateFlag(element) {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let img = element.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

// Handle button click
const btn = document.querySelector("form button");
btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector("form input");
  let amtVal = Number(amount.value);
  if (!amtVal || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

  let response = await fetch(URL);
  if (response.ok) {
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    console.log(`Converted amount: ${rate * amtVal}`);
      document.querySelector(".msg").innerText =
    `${amtVal} ${fromCurr.value}=${(rate * amtVal).toFixed(2)} ${toCurr.value}`;
  } else {
    console.log("Currency data not found");
  }

});
