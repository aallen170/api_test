// var object = {
//     "val1": "test1",
//     "val2": "test2",
//     "val3": "test3"
// }
// console.log("testing");

// document.getElementById("output").innerHTML = object.val1;

let url = "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=8e7d65d5d917159c80eab5e94d454b58&text=animal&format=json&nojsoncallback=1";

let jsondata;

let jsonobject = {};

let pages;

function getJSON() {
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            jsondata = data;
        })
        .then(() => {
            console.log(jsondata);
            jsonobject = jsondata.photos;

            console.log(jsonobject);

            console.log(jsonobject.pages);

            let pages = jsonobject.pages;

            document.getElementById("output").innerHTML = pages;
        });
}

pages = document.getElementById("output").innerHTML;

console.log(pages);