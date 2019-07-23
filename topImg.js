let currArea = 'empty', currElement = 'empty',
    prevElement = 'empty', currZIndex = 0;

document.addEventListener('mousedown', e => {
    e = e || window.event;
    let target = e.target || e.srcElement,
        img = target.textContent || target.innerText;

    currArea = e.target.parentNode;

    console.log(currArea.tagName);

    if (currArea.className === "gesture-area") {
        currArea.style.zIndex = currZIndex;
        currZIndex++;
    }

    if (e.target.className === "scale-element") {

        currElement = e.target;

        if (currElement !== prevElement) {
            prevElement.id = "none";
        }

        currElement.id = "selected-img";
        prevElement = currElement;
    } else {
        prevElement.id = "none";
    }
}, false);

document.addEventListener('touchstart', e => {
    e = e || window.event;
    let target = e.target || e.srcElement,
        img = target.textContent || target.innerText;

    currArea = e.target.parentNode;

    if (currArea.className === "gesture-area") {
        currArea.style.zIndex = currZIndex;
        currZIndex++;
    }

    if (e.target.className === "scale-element") {

        currElement = e.target;

        if (currElement !== prevElement) {
            prevElement.id = "none";
        }

        currElement.id = "selected-img";
        prevElement = currElement;
    } else {
        prevElement.id = "none";
    }
}, false);