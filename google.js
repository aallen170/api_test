import "babel-polyfill";

import { PhotoInteract } from './interactTest';

let query = '';
let pageNum;
let queryField = document.getElementById("query");
let searchButton = document.getElementById("search");
let clearPageButton = document.getElementById("clear");
let safeSearch = document.getElementById("safeSearchCheckbox");
let getPagesURL;

let results = document.getElementById("results");

queryField.addEventListener('keypress', e =>{
    let key = e.which || e.keyCode;
    if (key === 13) editURL();
});

searchButton.addEventListener('click', editURL);
clearPageButton.addEventListener('click', clearPage);

function editURL() {
    query = queryField.value;
    if (!query.isEmpty()) search()
};

async function request(url) {
    const response = await fetch(url);
    return await response.json();
};

function clearPage() {
    results.innerHTML = '';
}

function search() {
    let randomNum, i = 0, pageNumsVisited = [],
        pageNum, numOfPages = 5, photoList = [],
        photosAtATime = 3, photoNumsGrabbed = [],
        wait = 0;
    
    while (i < numOfPages) {
        let valid = true;

        pageNum = Math.floor(Math.random() * 90) + 1;

        pageNumsVisited.forEach(num => {
            if (num === pageNum) valid = false;
        });

        if (valid) {
            i++;
            pageNumsVisited.push(pageNum);

            if (safeSearch.checked)
                getPagesURL = `https://www.googleapis.com/customsearch/v1?key=AIzaSyBuzXX0QdY0l4BXgKXkgn-pBur-bRRZ8sQ&cx=001890896498940584054:ltxzdnhqnbk&q=${query}&safe=active&searchType=image&start=${pageNum}`
            else
                getPagesURL = `https://www.googleapis.com/customsearch/v1?key=AIzaSyBuzXX0QdY0l4BXgKXkgn-pBur-bRRZ8sQ&cx=001890896498940584054:ltxzdnhqnbk&q=${query}&safe=off&searchType=image&start=${pageNum}`

            request(getPagesURL).then(data => {
                data.items.forEach((item, i) => {
                    photoList.push(item);
                });
                wait++;
            }).then(() => {
                if (wait === numOfPages) {
                    let j = 0
                    while (j < photosAtATime) {
                        randomNum = Math.floor(Math.random() * photoList.length);
                        let valid = true;
                        photoNumsGrabbed.forEach(num => {
                            if (num === randomNum) valid = false;
                        });
                        if (valid) {
                            j++;
                            photoNumsGrabbed.push(randomNum);
                            console.log(photoList[randomNum]);
                            results.innerHTML +=
                            `<div class="gesture-area">
                            <img src="${photoList[randomNum].link}" class="scale-element"/>
                            </div>`;
                        }
                    }
                }
                PhotoInteract();
            });
        }
    }
}

String.prototype.isEmpty = function() {
    return (this.length === 0 || !this.trim());
};