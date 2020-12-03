function build(bitMap, camera) {

  this.bitMap = bitMap
  const raycaster = new THREE.Raycaster();

  var mouse = new THREE.Vector2();

  function onClick(event) {

    var btnNum = event.button

    mouse.x = 0;
    mouse.y = 0;

    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children);

    if (btnNum == 0) {
      var object = intersects[0].object
      var index = object.name.split("_")
      delete bitMap[index[0]][index[1]][index[2]]
      scene.remove(object)
    }

    if (btnNum == 2) {
      var object = intersects[0].object
      var index = object.name.split("_")
      var face = intersects[0].face.normal.clone()
      var box = Blocks[usingBlcok]()

      if (index[3] && (index[3] == 'stairs' || index[3] == 'glass' )) {

        face.applyEuler(new THREE.Euler(-object.rotation.x, -object.rotation.y, -object.rotation.z, 'XYZ'))

      }

      if (usingBlcok.split("_")[0] == 'stairs') {

        getStairDirection(face, index, box)

      }
      
      index[0] = index[0] * 1 + face.x
      index[1] = index[1] * 1 + face.z
      index[2] = index[2] * 1 + face.y

      if( usingBlcok.split("_")[0] == 'glass' ){

        getGlassDirection(index,box)

      }

      if( usingBlcok.split("_")[0] == 'fence' ){

        addHandrail(index,box)

      }
      
      box.position.set(index[0] * 100, index[2] * 100, index[1] * 100)

      box.name = index[0] + "_" + index[1] + "_" + index[2] + "_" + usingBlcok
      scene.add(box)
      bitMap[index[0]][index[1]][index[2]] = true

    }


  }

  this.connect = function () {

    document.addEventListener("click", onClick, false)

  }

  this.disconnect = function () {

    document.removeEventListener("click", onClick, false)

  }

  function getStairDirection(face, index, box) {
    if (face.x == -1) {
      return;
    }
    if (face.x == 1) {
      box.rotation.set(0, Math.PI, 0, 'XYZ');
      return;
    }
    if (face.y == 1) {
      let direct = Math.floor(Math.random() * 4 - 2)
      box.rotation.set(0, Math.PI / 2 * direct, 0, 'XYZ')
      return;
    }
    if (face.y == -1) {
      let direct = checkAllSides(index)
      box.rotation.set(Math.PI, direct, 0, 'XYZ')
      return;
    }
    if (face.z == 1) {
      box.rotation.set(0, Math.PI / 2, 0, 'XYZ')
      return;
    }
    if (face.z == -1) {
      box.rotation.set(0, -Math.PI / 2, 0, 'XYZ')
      return;
    }
  }

  function getGlassDirection(index,box){
    let y = index[2]
    let x = index[0]
    let z = index[1] 
    if (bitMap[x-1] && bitMap[x-1][z] && bitMap[x-1][z][y] && bitMap[x+1] && bitMap[x+1][z] && bitMap[x+1][z][y]) {
      box.rotateY(Math.PI/2);
      return;
    }
    if (bitMap[x] && bitMap[x][z+1] && bitMap[x][z+1][y] && bitMap[x] && bitMap[x][z+1] && bitMap[x][z+1][y] ) {
      box.rotateY(0);
      return;
    }
  }

  function addHandrail(index,box){
    let y = index[2]
    let x = index[0]
    let z = index[1]
    let handrail = Blocks.handrail()    // blocks 全局变量 33 ,15
    if (bitMap[x+1] && bitMap[x+1][z] && bitMap[x+1][z][y]) {
      box.add(handrail.clone().translateX(33.3))
      box.add(handrail.clone().translateX(33.3))
    }
    if (bitMap[x-1] && bitMap[x-1][z] && bitMap[x-1][z][y]) {
      box.add(handrail.clone().translateX(-33.3))
      box.add(handrail.clone().translateX(-33.3))
    }
    if (bitMap[x] && bitMap[x][z+1] && bitMap[x][z+1][y]) {
      box.add(handrail.clone().translateZ(33.3).rotateY(Math.PI / 2))
      box.add(handrail.clone().translateZ(33.3).rotateY(Math.PI / 2))
    }
    if (bitMap[x] && bitMap[x][z-1] && bitMap[x][z-1][y]) {
      box.add(handrail.clone().translateZ(-33.3).rotateY(Math.PI / 2))
      box.add(handrail.clone().translateZ(-33.3).rotateY(Math.PI / 2))
    }
  }

  function checkAllSides(index) {
    let y = index[2] - 1
    let x = index[0]
    let z = index[1]
    if (bitMap[x] && bitMap[x][z + 1] && bitMap[x][z + 1][y]) {
      return Math.PI/2
    }
    if (bitMap[x] && bitMap[x][z - 1] && bitMap[x][z - 1][y]) {
      return -Math.PI/2
    }
    if (bitMap[x+1] && bitMap[x+1][z] && bitMap[x+1][z ][y]) {
      return  0
    }
    if (bitMap[x-1] && bitMap[x-1][z] && bitMap[x-1][z ][y]) {
      return Math.PI
    }
    return 0
  }

}
build.prototype = Object.create(THREE.EventDispatcher.prototype);
build.prototype.constructor = THREE.PointerLockControls;
window.build = build