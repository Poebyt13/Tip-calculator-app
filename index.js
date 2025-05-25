
const btns = document.getElementsByClassName("btn__form")
const btnReset = document.getElementById("btn--reset")
const btnCustom = document.getElementById("btn--custom")
const inputBill = document.getElementById("input__bill")
const inputPeople = document.getElementById("input__people")


// input
let bill, tipSelected, numPeople;

// calcoli
const tipAmountText = document.getElementById("tip--amount")
const tipTotalText = document.getElementById("tip--total");
let tipTotal, totalWithTip;

inputBill.addEventListener("input", e => {
    bill = Number(e.target.value)
    enabledBtn()
})
inputPeople.addEventListener("input", e => {
    numPeople = Number(e.target.value)
    enabledBtn()
})
btnCustom.addEventListener("input", e => {
    tipSelected = Number(e.target.value) / 100;
      enabledBtn()
})
btnReset.addEventListener("click", e => {
    bill = null;
    tipSelected = null;
    numPeople = null;
    tipAmountText.innerHTML = "0.00"
    tipTotalText.innerHTML = "0.00"
    inputBill.value = ""
    inputPeople.value = ""

    Array.from(btns).forEach(btn => {
        btn.classList.remove("btn--selected")
    })

    btnCustom.type = "button"
    btnCustom.value = "Custom"
    btnCustom.removeAttribute("id")
})


Array.from(btns).forEach(el => {
    el.addEventListener('click', e => {

        Array.from(btns).forEach(btn => {
            btn.classList.remove("btn--selected")
        })

        if (el.classList.contains("btn--custom")) {
            btnCustom.type = "text"
            btnCustom.value = ""
            btnCustom.setAttribute("id", "input--custom")
            return;
        }

        btnCustom.type = "button"
        btnCustom.value = "Custom"
        btnCustom.removeAttribute("id")

        el.classList.add("btn--selected")
        tipSelected = Number(el.value.replace("%", "")) / 100;
        enabledBtn()
    })
})

const enabledBtn = () => {
    if (bill && tipSelected && numPeople) {
        btnReset.classList.remove("disabled")
        calculate()
    }
}

const calculate = () => {

    tipTotal = bill * tipSelected;
    totalWithTip = bill + tipTotal;
    tipAmountText.innerHTML = (tipTotal / numPeople).toFixed(2);
    tipTotalText.innerHTML = (totalWithTip / numPeople).toFixed(2);

}