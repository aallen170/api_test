import interact from 'interactjs';

var angleScale = {
  angle: 0,
  scale: 1
}

var gestureAreas = document.getElementsByClassName(`gesture-area`)
var scaleElements = document.getElementsByClassName(`scale-element`)

export function PhotoInteract() {
  for (let i = 0; i < gestureAreas.length; i++) {
    console.log("running");
    let gestureArea = gestureAreas[i];
    let scaleElement = scaleElements[i];
    interact(gestureArea)
    .gesturable({
      onstart: function (event) {
        angleScale.angle -= event.angle
        console.log(`current: ${event.target.className} #${i}`);
      },
      onmove: function (event) {
        // console.log(event.angle);
        // document.body.appendChild(new Text(event.scale))
        var currentAngle = event.angle + angleScale.angle
        var currentScale = event.scale * angleScale.scale

        scaleElement.style.webkitTransform =
        scaleElement.style.transform =
          'rotate(' + currentAngle + 'deg)' + 'scale(' + currentScale + ')'

        // uses the dragMoveListener from the draggable demo above
        dragMoveListener(event)
      },
      onend: function (event) {
        angleScale.angle = angleScale.angle + event.angle
        angleScale.scale = angleScale.scale * event.scale
      }
    })
    .draggable({ onmove: dragMoveListener })
  }
}

function dragMoveListener (event) {
  var target = event.target
  console.log(event.target.id);
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

  // translate the element
  target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)'

  // update the posiion attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)
}

// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener

// PhotoInteract();