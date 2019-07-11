let query = '';
let pageNum;
let queryField = document.getElementById("query");
let searchButton = document.getElementById("search");
let getPagesURL;

queryField.addEventListener('keyup', editURL);
searchButton.addEventListener('click', editURL);

function editURL() {
    // let queryValue = document.getElementById('query').value;
    // query = queryValue;
    let photosetID = 72157698739446480;
    // change URL to get album photos
    getPagesURL = `https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=44f0f3e9f1bc34456bcf2b6df8499796&photoset_id=${photosetID}&format=json&nojsoncallback=1`
    // getPagesURL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=44f0f3e9f1bc34456bcf2b6df8499796&text=${query}&sort=relevance&per_page=500&format=json&nojsoncallback=1`;
    search();
}

async function request(url) {
    const response = await fetch(url);
    return await response.json();
};

function search() {
    document.getElementById("random-page-output").innerHTML = '';
    document.getElementById("photo-output").innerHTML = '';
    request(getPagesURL).then(data => {
        console.log(getPagesURL);
        console.log(data.photoset.photo[125]);

        let photos = data.photoset.photo;

        let pagesOutput = document.getElementById("random-page-output");
        let photoOutput = document.getElementById("photo-output");

        let randomNum = Math.floor(Math.random() * (photos.length)) + 1;

        let currentID = photos[randomNum].id;

        console.log(currentID);

        let photoSrcURL = `https://www.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=44f0f3e9f1bc34456bcf2b6df8499796&photo_id=${currentID}&format=json&nojsoncallback=1`;

        request(photoSrcURL).then(data => {
            let photoURL;
            let sizes;

            sizes = data.sizes.size;

            photoURL = sizes[sizes.length - 1].source;

            photoOutput.innerHTML +=
            `<img src="${photoURL}" width="300" style="float: left;">`
        });

        // let getPhotoURL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=44f0f3e9f1bc34456bcf2b6df8499796&text=${query}&sort=relevance&per_page=500&page=${pageNum}&format=json&nojsoncallback=1`;

        // request(getPhotoURL).then(data => {
        //     console.log(data);

        //     let photoList = data.photos.photo;

        //     let listSize = photoList.length;

        //     let numOfPhotos = 20;

        //     for (let i = 0; i < numOfPhotos; i++) {
        //         let randomPhoto = Math.floor(Math.random() * (listSize - 1)) + 1;
        //         let currentID = photoList[randomPhoto].id;
        //         let photoSrcURL = `https://www.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=44f0f3e9f1bc34456bcf2b6df8499796&photo_id=${currentID}&format=json&nojsoncallback=1`;
        //         request(photoSrcURL).then(data => {
        //             console.log("photo data " + i + ": ");
        //             console.log(data);

        //             let photoURL;
        //             let sizes;

        //             sizes = data.sizes.size;

        //             photoURL = sizes[sizes.length - 1].source;

        //             photoOutput.innerHTML +=
        //             `<img src="${photoURL}" width="300" style="float: left;">`
        //         });
        //     }

        //     console.log(photoList[0].id);
        // });
    });
};