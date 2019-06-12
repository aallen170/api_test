let query = 'tiger';
let pageNum;

let getPagesURL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=44f0f3e9f1bc34456bcf2b6df8499796&text=${query}&per_page=500&format=json&nojsoncallback=1`;

async function request(url) {
    const response = await fetch(url);
    return await response.json();
};

request(getPagesURL).then(data => {
    console.log(getPagesURL);
    console.log(data);

    let pages = data.photos.pages;

    let pagesOutput = document.getElementById("random-page-output");
    let photoOutput = document.getElementById("photo-output");

    pagesOutput.innerHTML = pages;

    let percentageOfRelevance = 90;

    let relevanceCalclation = pages * Math.abs(percentageOfRelevance / 100 - 1) - 1;

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
                `Image #${i+1}:
                <br/>
                <img src="${photoURL}" width="500">
                <br/>
                <br/>`
            });
        }

        console.log(photoList[0].id);
    });
});