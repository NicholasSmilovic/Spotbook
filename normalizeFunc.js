normalize = (yourTopTracks, myTopTracks) => {
  let larger = yourTopTracks
  let smaller = myTopTracks

  if (larger.length < smaller.length) {
    larger = myTopTracks
    smaller = yourTopTracks
  }

  let scale = Math.floor(larger.length/smaller.length)
  let smallerCombo = []

  while (scale) {
    smallerCombo = smallerCombo.concat(smaller)
    scale--
  }

  return larger.concat(smallerCombo)

}

removeDuplicates = (arr) => {
  arr.forEach((track, index) => {
    for (let j = index + 1; j < arr.length; j++) {
      if (arr[j] === track) {
        arr.splice(j,1)

        j -= 1
      }
    }
  })
  return arr
}


let arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
let arr2 = [11, 12]

let x = normalize(arr1, arr2)
console.log(x)
console.log(removeDuplicates(x))
