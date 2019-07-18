import interact from 'interactjs'

interact('.item').draggable({
  onmove(event) {
    console.log(event.pageX,
                event.pageY)
  }
})