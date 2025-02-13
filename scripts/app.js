// Import
import { GetData } from "./fetch.js";

// Button ID'S
let idBtn = document.getElementById("idBtn");
let firstNameBtn = document.getElementById("firstNameBtn");
let lastNameBtn = document.getElementById("lastNameBtn");
let heightBtn = document.getElementById("heightBtn");
let ageBtn = document.getElementById("ageBtn");

// DIV ID'S
let idDiv = document.getElementById("idDiv");
let firstNameDiv = document.getElementById("firstNameDiv");
let lastNameDiv = document.getElementById("lastNameDiv");
let heightDiv = document.getElementById("heightDiv");
let ageDiv = document.getElementById("ageDiv");

// Pagination ID's
let previousBtn = document.getElementById("previousBtn");
let nextBtn = document.getElementById("nextBtn");
let show10Btn = document.getElementById("show10Btn");
let show20Btn = document.getElementById("show20Btn");
let show30Btn = document.getElementById("show30Btn");
let show40Btn = document.getElementById("show40Btn");
let show50Btn = document.getElementById("show50Btn");

// Variables
let limitShown = 10;
let ascendingOrder = true;
let userData;
let startIndex = 0;
let peopleList;

let divArray = [idDiv, firstNameDiv, lastNameDiv, heightDiv, ageDiv]
let sortBy = "idBtn"

// Having data load
async function start() {
    const userData = await GetData();
    return userData;
};
// start();

// Testing my fetch
// idBtn.addEventListener('click', () => {
//     console.log(userData[2]);
// });


// Sorting Function(s)
const SortById =async (ascend) => {
    if(ascend === true){
        let userData = await start();
        const sortedArray = userData.sort((a, b) => {
            a = a.Id;
            b = b.Id;

            return a - b;
        });
        return sortedArray;
    }else{
        let userData = await start();
        const sortedArray = userData.sort((a, b) => {
            a = a.Id;
            b = b.Id;

            return b - a;
        });
        return sortedArray;
    }
};


// Populate Function
async function populate(sortBy) {
    switch (sortBy){
        case 'idBtn':
            peopleList = await SortById(ascendingOrder);
            break;
    }
    divArray.forEach(field => {
        field.textContent = "";
    });

    peopleList.slice(startIndex, startIndex + limitShown).map(person => {
        createDiv(person);
    });
};


// Creating Elements
function createDiv(person){
    const properties = ['Id', 'FirstName', 'LastName', 'Height', 'Age'];
    const pArr = [];

    properties.forEach(prop => {
        let p = document.createElement('p');
        p.textContent = person[prop];
        pArr.push(p);
    });

    divArray.forEach((field, index) => {
        field.append(pArr[index]);
    });
}


// On load
window.addEventListener('load', function () {
    populate(sortBy)
});


// OnClicks For Sort Buttons
idBtn.addEventListener('click', () => {

    if(sortBy === 'idBtn' && ascendingOrder === true){
        ascendingOrder = false;
        populate(sortBy);
    }else if(sortBy === 'idBtn' && ascendingOrder === false){
        ascendingOrder = true;
        populate(sortBy);
    }else{
        ascendingOrder = true;
        sortBy = 'idBtn';
        populate(sortBy);
    }
});



// Pagination OnClicks & Limit change Function
function showLimitClick(limit){
    limitShown = limit;
    populate(sortBy);
}

show10Btn.addEventListener('click', () => {
    showLimitClick(10)
});
show20Btn.addEventListener('click', () => {
    showLimitClick(20)
});
show30Btn.addEventListener('click', () => {
    showLimitClick(30)
});
show40Btn.addEventListener('click', () => {
    showLimitClick(40)
});
show50Btn.addEventListener('click', () => {
    showLimitClick(50)
});

// Next & Previous OnClicks
previousBtn.addEventListener('click', () => {
    startIndex -= limitShown;
    
    if(startIndex < 0){
        startIndex = peopleList.length - limitShown;
    }
    populate(sortBy);
});

nextBtn.addEventListener('click', () => {
    startIndex += limitShown;

    if(startIndex >= peopleList.length){
        startIndex = 0;
    }
    populate(sortBy);
});