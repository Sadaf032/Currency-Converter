const BASE_URL = "https://v6.exchangerate-api.com/v6/271d3f212301538809697386/latest/";


const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");

for(let select of dropdowns){

    for(let currCode in countryList){

        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;

        if(select.name==="from" && currCode==="USD"){
            newOption.selected = true;
        } 
        else if(select.name==="to" && currCode==="PKR"){
            newOption.selected = true;

        }
        select.append(newOption);
    }

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })

}


const updateFlag = (element)=>{

    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;

}


btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;

    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }
    let from = fromCurr.value;
    let to = toCurr.value;
    const URL = `${BASE_URL}${from}`;

    let response = await fetch(URL);
    console.log(response); // yahan success check karo

    let data = await response.json();

    console.log(data);

    let rate = data.conversion_rates[to];
    let result = amtVal * rate;
    document.querySelector(".msg").innerText =`${amtVal} ${from} = ${result.toFixed(2)} ${to}`;


    
});
