// Make the DIV element draggable:
dragElement(document.getElementById("mydiv"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id)) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id).onmousedown = dragMouseDown;
    document.getElementById(element.id).ontouchstart = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV: 
    elmnt.onmousedown = dragMouseDown;
    elmnt.ontouchstart = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.ontouchend = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
    document.ontouchmove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
    document.ontouchend = null;
    document.ontouchmove = null;
  }
}

// // Constructor for Shape objects to hold data for all drawn objects.
// // For now they will just be defined as rectangles.
// function Shape(x, y, w, h, fill) {
//     // This is a very simple and unsafe constructor. 
//     // All we're doing is checking if the values exist.
//     // "x || 0" just means "if there is a value for x, use that. Otherwise use 0."
//     this.x = x || 0;
//     this.y = y || 0;
//     this.w = w || 1;
//     this.h = h || 1;
//     this.fill = fill || '#AAAAAA';
//   }
  
//   // Draws this shape to a given context
//   Shape.prototype.draw = function(ctx) {
//     ctx.fillStyle = this.fill;
//     ctx.fillRect(this.x, this.y, this.w, this.h);
//   }