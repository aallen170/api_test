import interact from 'interactjs';

var angleScale = {
  angle: 0,
  scale: 1
}

var gestureAreas = document.getElementsByClassName(`gesture-area`)
var scaleElements = document.getElementsByClassName(`scale-element`)

// let pressingCtrl = false;

// document.addEventListener('keydown', e => {
//   let key = e.which || e.keyCode;
//   if (key === 17) pressingCtrl = true;
// });

// console.log(pressingCtrl);

export function PhotoInteract() {
  for (let i = 0; i < gestureAreas.length; i++) {
    console.log("running");
    let gestureArea = gestureAreas[i];
    let scaleElement = scaleElements[i];
    interact(gestureArea)
    .gesturable({
      onstart: function (event) {
        angleScale.angle -= event.angle
      },
      onmove: function (event) {
        resizeElement(event, scaleElement);
      },
      onend: function (event) {
        angleScale.angle = angleScale.angle + event.angle
        angleScale.scale = angleScale.scale * event.scale
      }
    })
    .draggable({
      // FIX THIS!!!!
      onstart: e => {
        angleScale.angle -= event.angle
      },
      onmove: event => {
        // document.addEventListener('keydown', e => {
        //   let key = e.which || e.keyCode;
        //   if (key === 17) mouseResize(event, scaleElement);
        // });
        dragMoveListener(event);
      },
      onend: e => {
        angleScale.angle = angleScale.angle + event.angle
        angleScale.scale = angleScale.scale * event.scale
      }
    })
  }
}

// function mouseResize(event, scaleElmnt) {
//   var target = event.target;
//   let pressingCtrl = false;

//   var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
//   var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

//   // translate the element
//   document.addEventListener('keydown', e => {
//     let key = e.which || e.keyCode;
//     if (key === 17) pressingCtrl = true;
//   });

//   if (pressingCtrl) {
//     target.style.webkitTransform =
//       target.style.transform =
//         `scale(${x})`
//   } else {
//     target.style.webkitTransform =
//       target.style.transform =
//         'translate(' + x + 'px, ' + y + 'px)'
//   }

//   // update the posiion attributes
//   target.setAttribute('data-x', x)
//   target.setAttribute('data-y', y)
// }

function resizeElement (event, scaleElmnt) {
  // console.log(event.angle);
  // document.body.appendChild(new Text(event.scale))
  console.log("running resizeElement");
  var currentAngle = event.angle + angleScale.angle
  var currentScale = event.scale * angleScale.scale

  scaleElmnt.style.webkitTransform =
  scaleElmnt.style.transform =
    'rotate(' + currentAngle + 'deg)' + 'scale(' + currentScale + ')'

  // uses the dragMoveListener from the draggable demo above
  
  dragMoveListener(event)
}

function dragMoveListener (event) {
  var target = event.target;
  let pressingCtrl = false;

  let child = target.children[0];

  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

  // translate the element
  child.addEventListener('keydown', e => {
    let key = e.which || e.keyCode;
    if (key === 17) {console.log("in here"); pressingCtrl = true;}
  });

  if (pressingCtrl) {
    console.log("pressing ctrl");
    target.style.webkitTransform =
      target.style.transform =
        `scale(${x})`
  } else {
    console.log("not pressing ctrl");
    target.style.webkitTransform =
      target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)'
  }

  // // translate the element
  // target.style.webkitTransform =
  //   target.style.transform =
  //     'translate(' + x + 'px, ' + y + 'px)'

  // update the posiion attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)
}

// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener