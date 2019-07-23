let deleteButton = document.getElementById("deleteBTN");

deleteButton.addEventListener('mousedown', () => {
    // console.log(document.getElementById("selected-img"));
    let divToDelete = document.getElementById("selected-img").parentNode;
    document.getElementById("results").removeChild(divToDelete);
});