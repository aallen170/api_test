let query = '';
let pageNum;
let queryField = document.getElementById("query");
let searchButton = document.getElementById("search");
let getPagesURL;

let pagesOutput = document.getElementById("random-page-output");
let photoOutput = document.getElementById("photo-output");

queryField.addEventListener('keyup', editURL);
searchButton.addEventListener('click', editURL);

function editURL() {
    query = document.getElementById('query').value;
    getPagesURL = `https://www.googleapis.com/customsearch/v1?key=AIzaSyBuzXX0QdY0l4BXgKXkgn-pBur-bRRZ8sQ&cx=001890896498940584054:ltxzdnhqnbk&q=${query}&searchType=image`
    search();
};

async function request(url) {
    const response = await fetch(url);
    return await response.json();
};

function search() {
    let numOfPages = 3;
    let photoList = [];

    //Make non-repeatable random numbers between 1 - 90
    for (let i = 0; i < numOfPages; i++) {
        // let numberList = [];
        // for (let i = 1; i <= 90; i++) numberList.push(i);

        // let randomNumberList = [],
        // i = numberList.length,
        // j = 0;

        // while (i--) {
        //     j = Math.floor(Math.random() * (i+1));
        //     randomNumberList.push(numberList[j]);
        //     numberList.splice(j,1);
        // }
        
        // let pageNum;

        let pageNum = Math.floor(Math.random() * 90) + 1;

        console.log(pageNum);

        getPagesURL = `https://www.googleapis.com/customsearch/v1?key=AIzaSyBuzXX0QdY0l4BXgKXkgn-pBur-bRRZ8sQ&cx=001890896498940584054:ltxzdnhqnbk&q=${query}&searchType=image&start=${pageNum}`

        request(getPagesURL).then(data => {
            console.log("items:");
            console.log(data.items);
            data.items.forEach(item => {
                console.log(item);
                photoList.push(item);
            });
        }).then(() => {
            pagesOutput.innerHTML = '';
            photoOutput.innerHTML = '';
        
            photoList.forEach(photoInfo => {
                photoOutput.innerHTML +=
                `<img src="${photoInfo.link}" width="200" style="float: left;">`
            });
        });
    }
};