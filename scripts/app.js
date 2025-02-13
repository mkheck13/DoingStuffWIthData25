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
let startIndex = 0;
let peopleList;

// Array Of My DIV'S
let divArray = [idDiv, firstNameDiv, lastNameDiv, heightDiv, ageDiv]

// What to show on load/reload
let sortBy = "idBtn"

// Having data load
async function start() {
    const userData = await GetData();
    return userData;
};

// On load
window.addEventListener('load', function () {
    populate(sortBy)
});

// Testing my fetch
// idBtn.addEventListener('click', () => {
//     console.log(userData[2]);
// });

// Sorting Function(s)
// Sort by ID
const SortById =async (ascend) => {
    if(ascend){
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

// Sort By First Name
const SortByFirst = async (ascend) =>{
    if(ascend){
        let userData = await start();
        const sortedArray = userData.sort((a, b) => {
            a = a.FirstName;
            b = b.FirstName;

            if(a < b){
                return -1;
            }else if(a > b){
                return 1;
            }else if(a === b){
                return 0;
            }
        });
        return sortedArray;

    }else{
        let userData = await start();
        const sortedArray = userData.sort((a, b) =>{
            a = a.FirstName;
            b = b.FirstName;

            if(a > b){
                return -1;
            }else if(a < b){
                return 1;
            }else if(a === b){
                return 0;
            }
        });
        return sortedArray;
    }
};

// Sort By Last Name
const SortByLast = async (ascend) =>{
    if(ascend){
        let userData = await start();
        const sortedArray = userData.sort((a, b) => {
            a = a.LastName;
            b = b.LastName;

            if(a < b){
                return -1;
            }else if(a > b){
                return 1;
            }else if(a === b){
                return 0;
            }
        });
        return sortedArray;

    }else{
        let userData = await start();
        const sortedArray = userData.sort((a, b) =>{
            a = a.LastName;
            b = b.LastName;

            if(a > b){
                return -1;
            }else if(a < b){
                return 1;
            }else if(a === b){
                return 0;
            }
        });
        return sortedArray;
    }
};

// Sort by Height
const SortByHeight = async (ascend) =>{
    if(ascend){
        let userData = await start();
        const sortedArray = userData.sort((a, b) => {
            a = a.Height.substr(0, 2);
            b = b.Height.substr(0, 2);

            return a - b;
        });
        return sortedArray;

    }else{
        let userData = await start();
        const sortedArray = userData.sort((a, b) =>{
            a = a.Height.substr(0, 2);
            b = b.Height.substr(0, 2);

            return b - a;
        });
        return sortedArray;
    }
};

// Sort By Age
const SortByAge = async (ascend) =>{
    if(ascend){
        let userData = await start();
        const sortedArray = userData.sort((a, b) => {
            a = a.Age;
            b = b.Age;

            return a - b;
        });
        return sortedArray;

    }else{
        let userData = await start();
        const sortedArray = userData.sort((a, b) =>{
            a = a.Age;
            b = b.Age;

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

        case 'firstNameBtn':
            peopleList = await SortByFirst(ascendingOrder);
            break;

        case 'lastNameBtn':
            peopleList = await SortByLast(ascendingOrder);
            break;
        
        case 'heightBtn':
            peopleList = await SortByHeight(ascendingOrder);
            break;

        case 'ageBtn':
            peopleList = await SortByAge(ascendingOrder);
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
        // p.className = "underline";
        pArr.push(p);
    });

    divArray.forEach((field, index) => {
        field.append(pArr[index]);
    });
};

// OnClicks For Sort Buttons
// Id button
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

// First Name Button
firstNameBtn.addEventListener('click', () => {

    if(sortBy === 'firstNameBtn' && ascendingOrder === true){
        ascendingOrder = false;
        populate(sortBy);
    }else if(sortBy === 'firstNameBtn' && ascendingOrder === false){
        ascendingOrder = true;
        populate(sortBy);
    }else{
        ascendingOrder =true;
        sortBy = 'firstNameBtn';
        populate(sortBy);
    }
});

// Last Name Button
lastNameBtn.addEventListener('click', () => {

    if(sortBy === 'lastNameBtn' && ascendingOrder === true){
        ascendingOrder = false;
        populate(sortBy);
    }else if(sortBy === 'lastNameBtn' && ascendingOrder === false){
        ascendingOrder = true;
        populate(sortBy);
    }else{
        ascendingOrder =true;
        sortBy = 'lastNameBtn';
        populate(sortBy);
    }
});

// Height Button
heightBtn.addEventListener('click', () => {

    if(sortBy === 'heightBtn' && ascendingOrder === true){
        ascendingOrder = false;
        populate(sortBy);
    }else if(sortBy === 'heightBtn' && ascendingOrder === false){
        ascendingOrder = true;
        populate(sortBy);
    }else{
        ascendingOrder =true;
        sortBy = 'heightBtn';
        populate(sortBy);
    }
});

// Age Button
ageBtn.addEventListener('click', () => {

    if(sortBy === 'ageBtn' && ascendingOrder === true){
        ascendingOrder = false;
        populate(sortBy);
    }else if(sortBy === 'ageBtn' && ascendingOrder === false){
        ascendingOrder = true;
        populate(sortBy);
    }else{
        ascendingOrder =true;
        sortBy = 'ageBtn';
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