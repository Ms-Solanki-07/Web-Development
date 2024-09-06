const Base_url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

// Assume countryList is defined elsewhere in your code

const dropdowns = document.querySelectorAll(".drop-down select");
const btn = document.querySelector(".btn");  // Updated to match the class in HTML
const fromCurr = document.querySelector(".from select");  
const toCurr = document.querySelector(".to select");  
const amountInput = document.querySelector(".amount input");
const msgDiv = document.querySelector(".msg");

// Populate dropdowns
for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amtVal = parseFloat(amountInput.value);
    if (isNaN(amtVal) || amtVal < 1) {
        amtVal = 1;
        amountInput.value = 1;
    }

    const URL = `${Base_url}/${fromCurr.value.toLowerCase()}.json`;
    try {
        let response = await fetch(URL);
        let data = await response.json();
        const rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

        if (rate) {
            const convertedAmount = (amtVal * rate).toFixed(2);
            msgDiv.innerText = `${amtVal}${fromCurr.value} = ${convertedAmount}${toCurr.value}`;
        } else {
            msgDiv.innerText = "Exchange rate not found.";
        }
    } catch (error) {
        msgDiv.innerText = "Failed to fetch currency data.";
        console.error("Error fetching currency data:", error);
    }
});
