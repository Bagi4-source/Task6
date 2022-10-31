let prices = {
  variants : [10000, 40, 300],
  radioButtons: {
      value1 : 0,
      value2 : 10,
      value3 : 20,
  },
  checkBoxes: {
      value1 : 70,
      value2 : 50,
      value3 : 100,
  }
};


function get_price(){
  let amount=document.querySelector("form#form1 > input[name=amount]").value;
  let amount_ok=/^[1-9][0-9]*$/;
  if (amount_ok.test(amount)==false) {
      alert("Неправильно введено количество товара!");
      return NaN;
  } else {
    let selector = document.querySelector("select[name=selection]");
    let price = prices.variants[parseInt(selector.value) - 1];
    let elements;
    switch (parseInt(selector.value)) {
      case 2:
        elements = document.querySelectorAll("input[name=radioBut]:checked");
        elements.forEach(function(element) {
          price += prices.radioButtons[element.value];
        });
        break;
      case 3:
        elements = document.querySelectorAll("div.check1 > label > input:checked");
        elements.forEach(function(element) {
          console.log(element.name);
          price += prices.checkBoxes[element.name];
        });
        break;
      default:
        break;
    }
    return price*parseInt(amount);
  }
}

function updatePrice() {
  let result = document.querySelector("div#result > span.result-text");
  result.textContent = get_price();
}

function updateView(){
  let selector = document.querySelector("select[name=selection]");
  console.log("update view");
  console.log(selector.value);
  switch (parseInt(selector.value)) {
    case 2:
      document.querySelector("div.checks").style.display = "none";
      document.querySelectorAll("input[name=value1]").checked = false;

      document.querySelector("div.radioButtoun").style.display = "block";
      document.querySelector("input[name=radioButtoun]").checked = true;
      break;
    case 3:
      document.querySelector("div.radioButtoun").style.display = "none";
      document.querySelectorAll("input[name=radioButtoun]").checked = false;

      document.querySelector("div.checks").style.display = "block";
      break;
    default:
      document.querySelector("div.radioButtoun").style.display = "none";
      document.querySelector("div.checks").style.display = "none";
      document.querySelectorAll("input[name=radioButtoun]").checked = false;
      document.querySelectorAll("input[name=value1]").checked = false;
  }
}

console.log("DOM is ready");

let selector = document.querySelector("select[name=selection]");
updateView();
selector.addEventListener("change", updateView);
