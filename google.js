import "babel-polyfill";

import { PhotoInteract } from './interactTest';
// import { dragMoveListener } from './interactTest';
// import { gesture } from "@interactjs/actions";

let query = '';
let pageNum;
let queryField = document.getElementById("query");
let searchButton = document.getElementById("search");
let clearPageButton = document.getElementById("clear");
let getPagesURL;

let results = document.getElementById("results");
// let results = document.getElementById("gesture-area");

// queryField.addEventListener('keyup', editURL);
searchButton.addEventListener('click', editURL);
clearPageButton.addEventListener('click', clearPage);

function editURL() {
    query = queryField.value;
    if (query === '') {
        clearPage();
    } else {
        getPagesURL = `https://www.googleapis.com/customsearch/v1?key=AIzaSyBuzXX0QdY0l4BXgKXkgn-pBur-bRRZ8sQ&cx=001890896498940584054:ltxzdnhqnbk&q=${query}&searchType=image`
        search();
    }
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

            getPagesURL = `https://www.googleapis.com/customsearch/v1?key=AIzaSyBuzXX0QdY0l4BXgKXkgn-pBur-bRRZ8sQ&cx=001890896498940584054:ltxzdnhqnbk&q=${query}&searchType=image&start=${pageNum}`
            request(getPagesURL).then(data => {
                // for (let i = 0; i < photosAtATime; i++) {
                //     randomNum = Math.floor(Math.random() * data.items.length) + 1;
                //     photoList.push(data.items[randomNum]);
                // }
                data.items.forEach((item, i) => {
                    // console.log(photoList[i]);
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

    //Make non-repeatable random numbers between 1 - 90
    // for (let i = 0; i < numOfPages; i++) {

    //     request(getPagesURL).then(data => {
    //         // console.log("items:");
    //         // console.log(data.items);
            
    //         // randomPhoto = data.items[randomNum];
            
    //         for (let i = 0; i < 3; i++) {
    //             randomNum = Math.floor(Math.random() * data.items.length) + 1;
    //             photoList.push(data.items[randomNum]);
    //         }

    //         // data.items.forEach(item => {
    //         //     // console.log(item);
    //         //     photoList.push(item);
    //         // });
    //     }).then(() => {
    //         // clearPage();

    //         // results.innerHTML +=
    //         //     `<div class="gesture-area">
    //         //     <img src="${randomPhoto.link}" class="scale-element"/>
    //         //     </div>`;

    //         photoList.forEach((photoInfo, i) => {
    //             results.innerHTML +=
    //             `<div class="gesture-area">
    //             <img src="${photoInfo.link}" class="scale-element"/>
    //             </div>`;
    //         });
    //         PhotoInteract();
    //     });
    // }

}
