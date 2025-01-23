let baseurl =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

let select = document.querySelectorAll("select");
let btn = document.querySelector("form button");
let amount = document.querySelector("input");
let fromcurr = document.querySelector(".from select");
let tocurr = document.querySelector(".to select");
let msg = document.querySelector(".msg")

for (let content of select) {
  for (currcode in countryList) {
    let newoption = document.createElement("option");
    newoption.innerText = currcode;
    newoption.value = currcode;
    content.append(newoption);

    if (content.name == "from" && currcode == "USD") {
      newoption.selected = "selected";
    } else if (content.name == "to" && currcode == "INR") {
      newoption.selected = "selected";
    }
  }
  content.addEventListener("change", (evt) => {
    flagup(evt.target);
  });
}

let flagup = (element) => {
  let code = element.value;
  console.log(code);
  let countrycode = countryList[code];
  let imgsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = imgsrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amm = amount.value;

  if (amm == "" || amm < 1) {
    amm = 1;
    amount.value = "1";
  }
  let fromval = fromcurr.value.toLowerCase();
  let toval = tocurr.value.toLowerCase();

  let url = `${baseurl}/${fromval}.json`;

  let change = await fetch(url);
  console.log(change);
  let data = await change.json();
  rate = data[fromval][toval] ;
  console.log(rate);

  let final = amm * rate;
  console.log(final);

  msgchange(final,amm);

  
});
let msgchange =(finalval,amountval)=>{
  msg.innerText= `${amountval} ${fromcurr.value} = ${finalval} ${tocurr.value}`
}

