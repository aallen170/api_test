import "babel-polyfill";

let query = '';
let pageNum;
let queryField = document.getElementById("query");
let searchButton = document.getElementById("search");
let clearPageButton = document.getElementById("clear");
let getPagesURL;

// let results = document.getElementById("results");
let results = document.getElementById("gesture-area");

queryField.addEventListener('keyup', editURL);
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
    let numOfPages = 1;
    let photoList = [];

    //Make non-repeatable random numbers between 1 - 90
    for (let i = 0; i < numOfPages; i++) {
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
            clearPage();

            // photoList.forEach((photoInfo, i) => {
            //     results.innerHTML +=
            //     `<div class="resizable" id="obj${i}" style="width: 200px;">
            //         <div class='resizers'>
            //             <img src="${photoInfo.link}">
            //             <div class='resizer top-left'></div>
            //             <div class='resizer top-right'></div>
            //             <div class='resizer bottom-left'></div>
            //             <div class='resizer bottom-right'></div>
            //         </div>
            //     </div>`;
            // });
            photoList.forEach((photoInfo, i) => {
                results.innerHTML +=
                `<img src="${photoInfo.link}" id="scale-element${i}" style="width: 200px;">`;
            });

            let resizableObjs = document.getElementsByClassName("resizable");

            // console.log("resizableObjs:");
            // console.log(resizableObjs);

            // console.log("resizableObjs length = " + resizableObjs.length);

            for (let i = 0; i < resizableObjs.length; i++) {
                console.log("resizableObj #" + i + ": ");
                console.log(resizableObjs[i]);
                resizableObjs[i].addEventListener('touchstart', () => {
                    console.log('touching');
                });
                mouseDragElement(resizableObjs[i]);
                makeResizableDiv(`#scale-element${i}`);
            }
        });
    }
};