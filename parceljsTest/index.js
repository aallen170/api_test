import interact from 'interactjs'

var angleScale = {
    angle: 0,
    scale: 1
  }
  var gestureArea = document.getElementById('gesture-area')
  var scaleElement = document.getElementById('scale-element')
  
  interact(gestureArea)
    .gesturable({
      onstart: function (event) {
        angleScale.angle -= event.angle
      },
      onmove: function (event) {
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

  function dragMoveListener (event) {
    var target = event.target
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

  window.dragMoveListener = dragMoveListener

console.log('hello world')