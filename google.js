let query = '';
let pageNum;
let queryField = document.getElementById("query");
let getPagesURL;

let pagesOutput = document.getElementById("random-page-output");
let photoOutput = document.getElementById("photo-output");

queryField.addEventListener('keyup', editURL);

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
    let numOfPages = 15;
    let photoList = [];

    //Make non-repeatable random numbers between 1 - 90
    for (let i = 0; i < numOfPages; i++) {
        let numberList = [];
        for (let i = 1; i <= 90; i++) numberList.push(i);

        let randomNumberList = [],
        i = numberList.length,
        j = 0;

        while (i--) {
            j = Math.floor(Math.random() * (i+1));
            randomNumberList.push(numberList[j]);
            numberList.splice(j,1);
        }
        
        let pageNum;

        console.log(pageNum);

        getPagesURL = `https://www.googleapis.com/customsearch/v1?key=AIzaSyBuzXX0QdY0l4BXgKXkgn-pBur-bRRZ8sQ&cx=001890896498940584054:ltxzdnhqnbk&q=${query}&searchType=image&start=${pageNum}`

        request(getPagesURL).then(data => {
            data.items.forEach(item => {
                photoList.push(item);
            });
        });
        console.log(getPagesURL);
    }
    
    request(getPagesURL).then(data => {
        pagesOutput.innerHTML = '';
        photoOutput.innerHTML = '';

        photoList.forEach(photoInfo => {
            photoOutput.innerHTML +=
            `<img src="${photoInfo.link}" width="200" style="float: left;">`
        });
    });
};