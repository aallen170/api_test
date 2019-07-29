let deleteButton = document.getElementById("deleteBTN");

document.addEventListener('keydown', e => {
    let key = e.which || e.keyCode;
    if (key === 46) deletePhoto();
});

deleteButton.addEventListener('mousedown', deletePhoto);
deleteButton.addEventListener('touchstart', deletePhoto);

function deletePhoto() {
    let divToDelete = document.getElementById("selected-img").parentNode;
    document.getElementById("results").removeChild(divToDelete);
}