// SELECTING ELEMENTS
const balanceEl = document.querySelector(".balance .value");
const incomeTotalEl = document.querySelector(".income-total");
const outcomeTotalEl = document.querySelector(".outcome-total");
const incomeEl = document.querySelector("#income");
const expenseEl = document.querySelector("#expense");
const allEl = document.querySelector("#all");
const incomeList = document.querySelector("#income .list");
const expenseList = document.querySelector("#expense .list");
const allList = document.querySelector("#all .list");

//SELECT BUTTONS
const expenseBtn = document.querySelector(".tab1");
const incomeBtn = document.querySelector(".tab2");
const allBtn = document.querySelector(".tab3");

//INPUT BTNS and Fields
const addExpense = document.querySelector(".add-expense");
const expenseTitle = document.querySelector("#expense-title-input");
const expenseAmount = document.querySelector("#expense-amount-input");

const addIncome = document.querySelector(".add-income");
const incomeTitle = document.querySelector("#income-title-input");
const incomeAmount = document.querySelector("#income-amount-input");

//VARIABLES
let ENTRY_LIST =[];
let balance=0, income=0, outcome=0;

const DELETE = "delete", EDIT= "edit";

let data=JSON.parse(localStorage.getItem("list"));
if (data){
    ENTRY_LIST=data;
    updateUI();
}

//EVENT LISTENERS
expenseBtn.addEventListener("click", function() {
    show(expenseEl);
    hide([incomeEl,allEl]);
    active(expenseBtn);
    inactive([incomeBtn, allBtn]);
})
incomeBtn.addEventListener("click", function() {
    show(incomeEl);
    hide([expenseEl,allEl]);
    active(incomeBtn);
    inactive([expenseBtn, allBtn]);
})
allBtn.addEventListener("click", function() {
    show(allEl);
    hide([incomeEl,expenseEl]);
    active(allBtn);
    inactive([incomeBtn, expenseBtn]);
})

addExpense.addEventListener("click",function () {
    //If just one of them is empty
    if (!expenseTitle.value || !expenseAmount.value){return;}

    //Save entry to ENTRY_LIST
    let expense={
        type: "expense",
        title: expenseTitle.value,
        amount: parseInt(expenseAmount.value)
    }
    ENTRY_LIST.push(expense);

    updateUI();
    clearInput([expenseTitle,expenseAmount]);
})

addIncome.addEventListener("click",function () {
    //If just one of them is empty
    if (!incomeTitle.value || !incomeAmount.value){return;}

    //Save entry to ENTRY_LIST
    let income={
        type: "income",
        title: incomeTitle.value,
        amount: parseInt(incomeAmount.value)
    }
    ENTRY_LIST.push(income);
    updateUI();
    clearInput([incomeTitle,incomeAmount]);
})

incomeList.addEventListener("click",deleteOrEdit);
expenseList.addEventListener("click", deleteOrEdit);
allList.addEventListener("click", deleteOrEdit);

//FUNCTIONS
function showItem(element,id) {
    const tempelate=` <li id = "${id}" class="${element.type}">
                        <div class="entry">${element.title}: $${element.amount}</div>
                        <div id="edit"></div>
                        <div id="delete"></div>
                    </li>`;
    if (element.type=="income"){
        incomeList.insertAdjacentHTML("afterbegin", tempelate);
    }else if(element.type=="expense"){
        expenseList.insertAdjacentHTML("afterbegin", tempelate);
    }
    allList.insertAdjacentHTML("afterbegin",tempelate);
}

function updateUI() {
    income=calculateValue("income", ENTRY_LIST);
    outcome = calculateValue("expense", ENTRY_LIST);
    balance = income-outcome;

    //Clearing UI lists
    allList.innerHTML="";
    incomeList.innerHTML="";
    expenseList.innerHTML = "";

    ENTRY_LIST.forEach((element,id)=>{
        showItem(element,id);
    })
    incomeTotalEl.innerHTML = `<small>$</small>${income}`;
    outcomeTotalEl.innerHTML = `<small>$</small>${outcome}`;
    let sign=(balance>=0) ? "$" : "-$";
    balanceEl.innerHTML=`<small>${sign}</small>${Math.abs(balance)}`;
    updateChart(income,outcome);

    localStorage.setItem("list",JSON.stringify(ENTRY_LIST));
}


function deleteOrEdit(event) {
    let target=event.target;
    if (target.id==DELETE){
        let id=target.parentNode.id;
        ENTRY_LIST.splice(id,1);
        updateUI();
        clearInput([incomeTitle,incomeAmount,expenseTitle,expenseAmount]);
    }else if (target.id==EDIT){
        let id=target.parentNode.id;
        let element=ENTRY_LIST[id];
        if (element.type == "expense"){
            expenseTitle.value=element.title;
            expenseAmount.value= element.amount;
        }else if (element.type=="income"){
            incomeTitle.value=element.title;
            incomeAmount.value= element.amount;
        }
        ENTRY_LIST.splice(id,1);
        updateUI();
    }
}

function calculateValue(type, array) {
    let sum=0;
    array.forEach(element => {
        if (element.type==type){
            sum+=element.amount;
        }
    })
    return sum;
}

function clearInput(array) {
    array.forEach(element => {
        element.value="";
    })
}

function show(element) {
    element.classList.remove("hide");
}

function hide(array) {
    array.forEach(element => {
        element.classList.add("hide")
    })
}

function active(element) {
    element.classList.add("active");
}

function inactive(array) {
    array.forEach(element => {
        element.classList.remove("active")
    })
}
