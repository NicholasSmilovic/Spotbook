let myArr = [{a: 1, b: 1, c: 1}, {a: 1, b: 1}, {b: 1, c:1}, {c: 1}]


for (let i = 0; i < myArr.length; i++) {
  if (myArr[i].a) {
    myArr.splice(i, 1)
    i--
  }
}



console.log(myArr)