let query = 'buildings';
let pageNum;
let queryField = document.getElementById("query");
let searchButton = document.getElementById("search");

queryField.addEventListener('keyup', editURL);

let getPagesURL;

function editURL() {
    let queryValue = document.getElementById('query').value;
    query = queryValue;
    getPagesURL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=44f0f3e9f1bc34456bcf2b6df8499796&text=${query}&sort=relevance&per_page=500&format=json&nojsoncallback=1`;
}

searchButton.addEventListener('click', search);

async function request(url) {
    const response = await fetch(url);
    return await response.json();
};

function search() {
    document.getElementById("random-page-output").innerHTML = '';
    document.getElementById("photo-output").innerHTML = '';
    request(getPagesURL).then(data => {
        console.log(getPagesURL);
        console.log(data);

        let pages = data.photos.pages;

        let pagesOutput = document.getElementById("random-page-output");
        let photoOutput = document.getElementById("photo-output");

        pagesOutput.innerHTML = pages;

        let percentageOfRelevance = 90;

        let relevanceCalclation = pages * (1 - percentageOfRelevance / 100) - 1;

        let randomNum = Math.floor(Math.random() * (relevanceCalclation)) + 1;

        pageNum = randomNum;

        pagesOutput.innerHTML += "<br/>" + "<br/>" + "Random number: " + randomNum;

        let getPhotoURL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=44f0f3e9f1bc34456bcf2b6df8499796&text=${query}&sort=relevance&per_page=500&page=${pageNum}&format=json&nojsoncallback=1`;

        request(getPhotoURL).then(data => {
            console.log(data);

            let photoList = data.photos.photo;

            let listSize = photoList.length;

            for (let i = 0; i < 10; i++) {
                let randomPhoto = Math.floor(Math.random() * (listSize - 1)) + 1;
                let currentID = photoList[randomPhoto].id;
                let photoSrcURL = `https://www.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=44f0f3e9f1bc34456bcf2b6df8499796&photo_id=${currentID}&format=json&nojsoncallback=1`;
                request(photoSrcURL).then(data => {
                    console.log("photo data " + i + ": ");
                    console.log(data);

                    let photoURL;
                    let sizes;

                    sizes = data.sizes.size;

                    photoURL = sizes[sizes.length - 1].source;

                    photoOutput.innerHTML +=
                    `<img src="${photoURL}" width="500">`
                });
            }

            console.log(photoList[0].id);
        });
    });
}