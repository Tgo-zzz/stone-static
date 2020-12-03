// import $ from "jquery"
// import * as THREE from "three"

function FullView(data) {

  this.VIEWNUM = 1,
    this.mapImgs = document.getElementsByClassName("mapImg")
  this.icon = document.getElementById("map_icon")

  this.view = {},

    this.cacheTextures = {},
    this.textures = {
      interim: new THREE.TextureLoader().load("./src/img/mohu.png", render),
      beacon: new THREE.TextureLoader().load("./src/img/direction.png", render)
    }
  this.ViewData = data.view

}

FullView.prototype = {

  set: function (val, direction, islable) { //设置展示的全景编号

    if (val == 0) return;

    this.VIEWNUM = val
    this.view = this.ViewData["P" + val]
    this.changeScene(direction, islable);
    this.afterSet(val);
  },

  afterSet: function (val) {

    $(".mapImg").css("display", "none")

    switch (true) {
      case (104 < val && val < 122):
        this.mapImgs[1].style.display = "block"
        break;
      case (26 < val && val < 48):
        this.mapImgs[2].style.display = "block"
        break;
      case (61 < val && val < 84):
        this.mapImgs[3].style.display = "block"
        break;
      default:
        this.mapImgs[0].style.display = "block"
        break;
    }
    this.icon.style.left = `${this.view.x*1/54*600+10}px`
    this.icon.style.top = `${this.view.y*1/36*400}px`
  },

  changeScene: function (direction, islable) { //切换全景图

    this.clearBeacon();
    this.setBeacon();

    if (direction) {
      if (islable) {
        controls.object.position.set(direction.x, direction.y, direction.z);
        controls.update();
      } else {
        controls.position0.set(direction.x, direction.y, direction.z)
      }
    }

    if (this.isload()) {

      scene.background = this.cacheTextures[this.VIEWNUM]

      render();

    } else {

      let path = this.view.file

      scene.background = this.textures.interim
      scene.background = loader.load([
        path + '_rt.png', path + '_lf.png',
        path + '_up.png', path + '_dn.png',
        path + '_ft.png', path + '_bk.png',
      ], () => {
        render();
        this.getCache();
      });
    }
    // console.log(scene)
  },

  isload: function () { //检查所需要的图片是否已缓存

    return this.cacheTextures[this.VIEWNUM] ? true : false;

  },

  getCache: function (cacheNum, viewNum = 0) { //持续自调用，后台缓存周围图片
    let NUM = this.VIEWNUM
    let visible = this.view.visible
    let num = cacheNum || 0

    if (num >= visible.length) {
      console.log("周围图片准备就绪")
      return;
    }
    if (NUM != viewNum) { //检查缓存图片组中心是否变更，变更则停止缓存, 降低带宽压力
      return;
    }

    if (!this.cacheTextures[visible]) {
      let path = this.ViewData["P" + visible[num]]
      this.cacheTextures[num] = loader.load([
        path + '_rt.png', path + '_lf.png',
        path + '_up.png', path + '_dn.png',
        path + '_ft.png', path + '_bk.png',
      ], () => {
        num = num + 1;
        this.getCache(num, NUM);
      })
    } else {
      num++
      this.getCache(num, NUM)
    }
  },

  clearCache: function () { //清除内存中的图片

    let keepCache = {}

    for (let i = 0; i < this.view.visible; i++) {
      let index_i = this.view.visible[i]
      keepCache[index_i] = 1
      for (let j = 0; j < this.ViewData["P" + index_i].visible.length; j++) {
        let index_j = this.ViewData["P" + index_i].visible[j]
        keepCache[index_j] = 1
      }
    }

    for (let z in this.cacheTextures) {
      if (!keepCache[z]) {
        delete this.cacheTextures[z]
      }
    }

  },

  setBeacon: function () {
    let texture = this.textures.beacon
    let newBeacons = []

    this.view.visible.forEach(num => {
      let beacon = new THREE.Sprite(new THREE.SpriteMaterial({
        map: texture,
        color: 0xffffff
      }))
      let {
        x,
        y,
        z,
        size
      } = this.view.TargetOffset[num]
      if (size) beacon.scale.set(size, size, size);
      beacon.position.set(x, y, z)
      beacon.name = num
      newBeacons.push(beacon)
    })

    scene.add(...newBeacons)

  },

  clearBeacon: function () {

    let oldBeacons = []

    scene.children.forEach(e => {
      if (e.type == "Sprite") {
        oldBeacons.push(e)
      }
    })

    scene.remove(...oldBeacons)

  },

  onclick: function (event) {

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // 通过摄像机和鼠标位置更新射线
    raycaster.setFromCamera(mouse, camera);

    let intersects = raycaster.intersectObjects(scene.children)

    if (intersects[0]) {

      let NUMBER = intersects[0].object.name
      let direction = fullView.view.TargetOffset[NUMBER].direction

      fullView.set(NUMBER, direction)
    }

  },

  addJumpInMap: function () {

    let that = this

    this.mapImgs[1].addEventListener("click", function (e) {

      let x = e.layerX / 600 * 54 - 1.8
      let y = e.layerY / 400 * 36 - 1.8

      for (let i = 105; i < 122; i++) {
        let xx = that.ViewData["P" + i].x - x;
        let yy = that.ViewData["P" + i].y - y
        if (xx * xx + yy * yy < 2)
          return that.set(i)
      }
    })
    this.mapImgs[2].addEventListener("click", function (e) {

      let x = e.layerX / 600 * 54- 1.8
      let y = e.layerY / 400 * 36- 1.8

      for (let i = 27; i < 48; i++) {
        let xx = that.ViewData["P" + i].x - x;
        let yy = that.ViewData["P" + i].y - y
        if (xx * xx + yy * yy < 2)
          return that.set(i)
      }
    })
    this.mapImgs[3].addEventListener("click", function (e) {

      let x = e.layerX / 600 * 54 -1.8
      let y = e.layerY / 400 * 36-1.8

      for (let i = 62; i < 84; i++) {
        let xx = that.ViewData["P" + i].x - x;
        let yy = that.ViewData["P" + i].y - y
        if (xx * xx + yy * yy < 2)
          return that.set(i)
      }
    })
  }
}

let fullView = new FullView(ViewData)
fullView.addJumpInMap();
document.getElementsByTagName("canvas")[0].addEventListener("click", fullView.onclick, false)

fullView.set(115)