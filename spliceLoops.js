  spliceTracks = (y, m) => {
    y.sort((a, b) => {
      return a - b
    })
    m.sort((a, b) => {
      return a - b
    })
    let uncommonTracks = []
    uncommonTracks = loops(y, m, uncommonTracks)
    uncommonTracks = loops(m, y, uncommonTracks)
    console.log(uncommonTracks)
  }

  loops = (primary, secondary, uncommonTracks) => {
    for (let i = 0; i < primary.length; i++) {
      let common = false
      for (let j = 0; j < secondary.length; j++) {
        if (primary[i] === secondary[j]) {
          common = true
          break
        }
        if (secondary[j] > primary[i]) {
          break
        }
      }
      if (!common) {
        uncommonTracks.push(primary[i])
      }
    }
    return uncommonTracks

  }

  let yours = [2, 4, 6, 8, 10, 12, 14, 7, 9, 34, 12, 26, 31, 45, 32, 90, 6, 35, 24, 56, 68, 79]
  let mine = [4, 8, 12, 16, 20, 34, 24, 45, 67, 78, 79, 90, 12, 23, 33, 45, 64, 12, 14, 16, 23]

  spliceTracks(yours, mine)
  // expected: [2, 6, 10, 14, 16, 20]