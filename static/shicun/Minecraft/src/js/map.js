function MCMap() {
  this.mapSeed = ""
  this.bitMap = []
  this.zoom = Number
}
Object.defineProperties(MCMap.prototype, {
  "visibleRegion": {
    get: function () {

      return this.visibleRegion

    },
    set: function (value) {

      this.visibleRegion = value

    }
  },
  "loadRegion": {
    get: function () {

      return this.loadRegion

    },
    set: function (value) {

      this.loadRegion = value

    },

  }
})

MCMap.prototype = {
  readMap:  (url,onLoad ,onProgress )=> {
    let loader =  new THREE.ObjectLoader();
    return  loader.load(url,onLoad,onProgress)
  },
  createMap: function () {

  },
  saveMap: function () {
    return JSON.stringify(scene.toJSON())
  },
  deleteMap: function () {

  },
  lerp: function (u) {
    return 3 * u * u - 2 * u * u * u
    // 3 * u * u - 2 * u * u * u
    //6 * Math.pow(u ,5) - 15 * Math.pow(u ,4) + 10 * u
  },
  weighting: function (u, v, n00, n10, n01, n11) {
    let n0 = n00 * (1 - this.lerp(u)) + n10 * this.lerp(u)
    let n1 = n01 * (1 - this.lerp(u)) + n11 * this.lerp(u)
    let n = n0 * (1 - this.lerp(v)) + n1 * this.lerp(v)
    return n
  },
  Noise: function (OverSquare, density, persistence = 1, octaves = 1, amplitude = 1, parentNoise) {
  // OverSquare 总方形：{x，y}
  // density 密度
  // persistence 持续度
  // octaves 倍频
  // amplitude 振幅
  // parentNoise 上一级噪声
  // 获取波长
    let unitSquare = {
      x: parseInt(OverSquare.x / density.x),
      y: parseInt(OverSquare.y / density.y)
    }
    let Znoise = []
    let noise = []

    // 条件判断
    if (density.x < 2 || density.y < 2) {
      console.warn("频率过低")
      return;
    }
    if (unitSquare.x < 1 || unitSquare.y < 1) {
      console.log("单位点精度不足，已返回柏林噪声，当前倍频：" + octaves);
      return;
    }
    if (octaves == 0) {
      console.log("柏林噪声计算完毕")
      return;
    } else {
      octaves--
    }


    // 生成晶格噪点
    let G = []
    for (let k = 0; k < 512; k++) {
      do {
        G[k] = {
          x: Math.seededRandom(amplitude) * 2 - 1,
          y: Math.seededRandom(amplitude) * 2 - 1
        }
      }
      while (G[k].x * G[k].x + G[k].y * G[k].y > 1)
    }

    for (let i = 0; i < OverSquare.x; i += unitSquare.x) {
      Znoise[i] = []
      for (let j = 0; j < OverSquare.y; j += unitSquare.y) {
        Znoise[i][j] = parseInt(Math.seededRandom(amplitude) * 512)
      }
      Znoise[i][OverSquare.y] = parseInt(Math.seededRandom(amplitude) * 512)
    }
    Znoise[OverSquare.x] = []
    for (let j = 0; j < OverSquare.y; j += unitSquare.y) {
      Znoise[OverSquare.x][j] = parseInt(Math.seededRandom(amplitude) * 512)
    }
    Znoise[OverSquare.x][OverSquare.y] = parseInt(Math.seededRandom(amplitude) * 512)

    // 插值计算
    let n = [
      [],
      []
    ]
    for (let i = 0; i < OverSquare.x; i++) {
      noise[i] = []

      for (let j = 0; j < OverSquare.y; j++) {

        if (j / unitSquare.y % 1 == 0) {
          n[0][1] = G[Znoise[parseInt(i / unitSquare.x) * unitSquare.x][j + unitSquare.y]]
          n[1][1] = G[Znoise[parseInt(i / unitSquare.x) * unitSquare.x + unitSquare.x][j + unitSquare.y]]
          n[0][0] = G[Znoise[parseInt(i / unitSquare.x) * unitSquare.x][j]]
          n[1][0] = G[Znoise[parseInt(i / unitSquare.x) * unitSquare.x + unitSquare.x][j]]
        }

        let point = [{
          x: i / unitSquare.x % 1,
          y: j / unitSquare.y % 1
        }, {
          x: i / unitSquare.x % 1 - 1,
          y: j / unitSquare.y % 1
        }, {
          x: i / unitSquare.x % 1,
          y: j / unitSquare.y % 1 - 1
        }, {
          x: i / unitSquare.x % 1 - 1,
          y: j / unitSquare.y % 1 - 1
        }]
        if (parentNoise) {
          parentNoise[i][j] = this.weighting(i / unitSquare.x % 1, j / unitSquare.y % 1, Math.dot(n[0][0], point[0]), Math
            .dot(n[1][0], point[1]),
            Math.dot(n[0][1], point[2]), Math.dot(n[1][1], point[3]))
        } else {
          noise[i][j] = this.weighting(i / unitSquare.x % 1, j / unitSquare.y % 1, Math.dot(n[0][0], point[0]), Math.dot(n[1]
              [0], point[1]),
            Math.dot(n[0][1], point[2]), Math.dot(n[1][1], point[3]))
        }
      }

    }

    this.Noise(OverSquare, {
      x: density.x / persistence,
      y: density.y / persistence
    }, persistence, octaves, amplitude * persistence, noise)

    return noise

  }
}


// export default MCMap