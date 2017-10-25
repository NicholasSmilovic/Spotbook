let APILimit = 5
let tracksToAdd = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]
let loops = Math.ceil(tracksToAdd.length/APILimit)
let totalLoops = loops

while (loops) {
  let bottom = APILimit*(totalLoops - loops)
  let top = bottom + APILimit - 1
  if (top > tracksToAdd.length - 1) {
    top = bottom + (tracksToAdd.length)%APILimit
  }
  console.log(`Range: ${bottom} - ${top}`)

  for (let index = bottom; index <= top; index++) {
    console.log(index)
  }
  loops -= 1
}
