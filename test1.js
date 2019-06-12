// let testvar = 5;

// let query = 'animal';
// let pagesURL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=44f0f3e9f1bc34456bcf2b6df8499796&text=${query}&format=json&nojsoncallback=1`;

// let pageNum;

// // const response = await fetch(pagesURL);
// // const json = await response.json();
// // console.log(json);

// async function request(url) {
//     const response = await fetch(url);
//     return await response.json();
// };

// request(pagesURL).then(data => {
//     console.log(pagesURL);
//     console.log(data);

//     let pages = data.photos.pages;

//     let output = document.getElementById("random-page-output");

//     output.innerHTML = pages;

//     let randomNum = Math.floor(Math.random() * (pages * 0.9 - 1)) + 1;

//     pageNum = randomNum;

//     output.innerHTML += "<br/>" + "<br/>" + "Random number: " + randomNum;
// });

// // fetch(pagesURL).then(response => {
// //     return response.json();
// // }).then(data => {
// //     console.log(pagesURL);
// //     console.log(data);

// //     let pages = data.photos.pages;

// //     let output = document.getElementById("random-page-output");

// //     output.innerHTML = pages;

// //     let randomNum = Math.floor(Math.random() * (pages * 0.9 - 1)) + 1;

// //     pageNum = randomNum;

// //     output.innerHTML += "<br/>" + "<br/>" + "Random number: " + randomNum;
// // });