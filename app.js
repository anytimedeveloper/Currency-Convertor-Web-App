const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const message=document.querySelector(".message");

for(select of dropdowns){
for(currCode in countryList){
    let newoption = document.createElement("option");
    newoption.innerText= currCode;
    newoption.value=currCode;
    select.append(newoption);
    if(select.name === "from" && currCode === "USD"){
        newoption.selected="selected";
    }else if(select.name === "to" && currCode === "INR" ){
        newoption.selected="selected";
    }
}
select.addEventListener("change",(e)=>{
    updateFlag(e.target)
})
}

const updateFlag = (element)=>{
   let currCode= element.value;
   let countryCode = countryList[currCode];
   let newSrc =`https://flagsapi.com/${countryCode}/flat/64.png`;
   let img= element.parentElement.querySelector("img");
   img.src=newSrc;
}


btn.addEventListener("click",(e)=>{
  e.preventDefault();
  updateExchangeRate();

})

const updateExchangeRate=async()=>{
    let amount= document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal<1){
      amtVal=1;
      amount.value="1";
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response= await fetch(URL);
    let data= await response.json();
    let rate=data[toCurr.value.toLowerCase()];
    let finalamt= amtVal*rate;
    message.innerText=`${amtVal}${fromCurr.value} = ${finalamt.toFixed(2)}${toCurr.value}`;
}
window.addEventListener("load",()=>{
    updateExchangeRate();
});