// import * as THREE from "three"

function Block() {
  this.loader = new THREE.TextureLoader()
  this.MtlLoader = new THREE.MTLLoader()
  this.ObjLoader = new THREE.OBJLoader()
  this.mats = {}
  this.obj = {}
  this.blockMap = ["PlainBox", "soil", "bedrock", "grass", "brick", "planks_acacia", "planks_big_oak", "planks_birch", "planks_jungle", "planks_spruce", "stone", "stone_andesite", "stone_andesite_smooth", "stone_diorite", "stone_diorite_smooth", "stone_granite", "stone_granite_smooth", "stone_slab", "stonebrick", "stonebrick_carved", "stonebrick_cracked", "stonebrick_mossy"]
}

Block.prototype = {
  init: function () {
    // this.stairBox = new THREE.BufferGeometry()

    // var vertices = new Float32Array( [
    //   -1.0, -1.0,  1.0,
    //    1.0, -1.0,  1.0,
    //    1.0,  1.0,  1.0,

    //    1.0,  1.0,  1.0,
    //   -1.0,  1.0,  1.0,
    //   -1.0, -1.0,  1.0
    // ] );


    var loader = this.loader
    loader.setPath('./src/assets/BoxImg/')
    var MtlLoader = this.MtlLoader
    MtlLoader.setPath('./src/assets/BoxModel/')

    let cubetexture = loader.load('dirt.png')

    this.mats.grass_side = new THREE.MeshLambertMaterial({
      map: loader.load('grass_side.png')
    })
    this.mats.grass_top = new THREE.MeshLambertMaterial({
      map: loader.load('grass_top.png')
    })
    this.mats.bedrock = new THREE.MeshLambertMaterial({
      map: loader.load('bedrock.png')
    })
    this.mats.brick = new THREE.MeshLambertMaterial({
      map: loader.load('brick.png')
    })
    this.mats.dirt = new THREE.MeshLambertMaterial({
      map: loader.load('dirt.png')
    })
    this.mats.dirt_podzol_side = new THREE.MeshLambertMaterial({
      map: loader.load('dirt_podzol_side.png')
    })
    this.mats.dirt_podzol_top = new THREE.MeshLambertMaterial({
      map: loader.load('dirt_podzol_top.png')
    })
    this.mats.planks_acacia = new THREE.MeshLambertMaterial({
      map: loader.load('planks_acacia.png')
    })
    this.mats.planks_big_oak = new THREE.MeshLambertMaterial({
      map: loader.load('planks_big_oak.png')
    })
    this.mats.planks_birch = new THREE.MeshLambertMaterial({
      map: loader.load('planks_birch.png')
    })
    this.mats.planks_jungle = new THREE.MeshLambertMaterial({
      map: loader.load('planks_jungle.png')
    })
    this.mats.planks_spruce = new THREE.MeshLambertMaterial({
      map: loader.load('planks_spruce.png')
    })
    this.mats.stone = new THREE.MeshLambertMaterial({
      map: loader.load('stone.png')
    })
    this.mats.stone_andesite = new THREE.MeshLambertMaterial({
      map: loader.load('stone_andesite.png')
    })
    this.mats.stone_andesite_smooth = new THREE.MeshLambertMaterial({
      map: loader.load('stone_andesite_smooth.png')
    })
    this.mats.stone_diorite = new THREE.MeshLambertMaterial({
      map: loader.load('stone_diorite.png')
    })
    this.mats.stone_diorite_smooth = new THREE.MeshLambertMaterial({
      map: loader.load('stone_diorite_smooth.png')
    })
    this.mats.stone_granite = new THREE.MeshLambertMaterial({
      map: loader.load('stone_granite.png')
    })
    this.mats.stone_granite_smooth = new THREE.MeshLambertMaterial({
      map: loader.load('stone_granite_smooth.png')
    })
    this.mats.stone_slab_side = new THREE.MeshLambertMaterial({
      map: loader.load('stone_slab_side.png')
    })
    this.mats.stone_slab_top = new THREE.MeshLambertMaterial({
      map: loader.load('stone_slab_top.png')
    })
    this.mats.stonebrick = new THREE.MeshLambertMaterial({
      map: loader.load('stonebrick.png')
    })
    this.mats.stonebrick_carved = new THREE.MeshLambertMaterial({
      map: loader.load('stonebrick_carved.png')
    })
    this.mats.stonebrick_cracked = new THREE.MeshLambertMaterial({
      map: loader.load('stonebrick_cracked.png')
    })
    this.mats.stonebrick_mossy = new THREE.MeshLambertMaterial({
      map: loader.load('stonebrick_mossy.png'),
    })
    this.plainMaterial = new THREE.MeshLambertMaterial({
      map: cubetexture
    }),
    // 楼梯
    MtlLoader.load('stairs_plain.mtl', (materials) => {
      var ObjLoader = new THREE.OBJLoader()
      ObjLoader.setPath('./src/assets/BoxModel/')
      materials.preload();
      ObjLoader.setMaterials(materials);
      ObjLoader.load('stairs_plain.obj', (obj) => {
        this.obj.stairs_plain = obj.children[0]
      })
    }),
    //围栏
    MtlLoader.load('column.mtl', (materials) => {
      var ObjLoader = new THREE.OBJLoader()
      ObjLoader.setPath('./src/assets/BoxModel/')
      materials.preload();
      ObjLoader.setMaterials(materials);
      ObjLoader.load('column.obj', (obj) => {
        this.obj.fence = obj.children[0]
      })
    })
    MtlLoader.load('handrail.mtl', (materials) => {
      var ObjLoader = new THREE.OBJLoader()
      ObjLoader.setPath('./src/assets/BoxModel/')
      materials.preload();
      ObjLoader.setMaterials(materials);
      ObjLoader.load('handrail.obj', (obj) => {
        this.obj.handrail = obj.children[0]
      })
    })

    MtlLoader.load('glass.mtl', (materials) => {
      var ObjLoader = new THREE.OBJLoader()
      ObjLoader.setPath('./src/assets/BoxModel/')
      materials.preload();
      ObjLoader.setMaterials(materials);
      ObjLoader.load('glass.obj', (obj) => {
        this.obj.glass = obj.children[0]
      })
    })
    MtlLoader.load('leave.mtl', (materials) => {
      var ObjLoader = new THREE.OBJLoader()
      ObjLoader.setPath('./src/assets/BoxModel/')
      materials.preload();
      ObjLoader.setMaterials(materials);
      ObjLoader.load('leave.obj', (obj) => {
        this.obj.leave = obj.children[0]
      })
    })
    MtlLoader.load('water.mtl', (materials) => {
      var ObjLoader = new THREE.OBJLoader()
      ObjLoader.setPath('./src/assets/BoxModel/')
      materials.preload();
      ObjLoader.setMaterials(materials);
      ObjLoader.load('water.obj', (obj) => {
        this.obj.water = obj.children[0]
      })
    })
    MtlLoader.load('leaves_opaque.mtl', (materials) => {
      var ObjLoader = new THREE.OBJLoader()
      ObjLoader.setPath('./src/assets/BoxModel/')
      materials.preload();
      ObjLoader.setMaterials(materials);
      ObjLoader.load('leaves_opaque.obj', (obj) => {
        this.obj.leaves_opaque = obj.children[0]
      })
    })
    MtlLoader.load('log_jungle.mtl', (materials) => {
      var ObjLoader = new THREE.OBJLoader()
      ObjLoader.setPath('./src/assets/BoxModel/')
      materials.preload();
      ObjLoader.setMaterials(materials);
      ObjLoader.load('log_jungle.obj', (obj) => {
        this.obj.log_jungle = obj.children[0]
      })
    })

    this.Box = new THREE.BoxGeometry(100, 100, 100)
  },
  PlainBox: function () {
    return new THREE.Mesh(this.Box, this.plainMaterial)
  },
  soil: function () {
    var side = this.mats.dirt_podzol_side
    var top = this.mats.dirt_podzol_top
    return new THREE.Mesh(this.Box, [side, side, top, side, side, side])
  },
  bedrock: function () {
    return new THREE.Mesh(this.Box, this.mats.bedrock)
  },
  grass: function () {
    var side = this.mats.grass_side
    var top = this.mats.grass_top
    return new THREE.Mesh(this.Box, [side, side, top, side, side, side])
  },
  brick: function () {
    return new THREE.Mesh(this.Box, this.mats.brick)
  },
  planks_acacia: function () {
    return new THREE.Mesh(this.Box, this.mats.planks_acacia)
  },
  planks_big_oak: function () {
    return new THREE.Mesh(this.Box, this.mats.planks_big_oak)
  },
  planks_birch: function () {
    return new THREE.Mesh(this.Box, this.mats.planks_birch)
  },
  planks_jungle: function () {
    return new THREE.Mesh(this.Box, this.mats.planks_jungle)
  },
  planks_spruce: function () {
    return new THREE.Mesh(this.Box, this.mats.planks_spruce)
  },
  stone: function () {
    return new THREE.Mesh(this.Box, this.mats.stone)
  },
  stone_andesite: function () {
    return new THREE.Mesh(this.Box, this.mats.stone_andesite)
  },
  stone_andesite_smooth: function () {
    return new THREE.Mesh(this.Box, this.mats.stone_andesite_smooth)
  },
  stone_diorite: function () {
    return new THREE.Mesh(this.Box, this.mats.stone_diorite)
  },
  stone_diorite_smooth: function () {
    return new THREE.Mesh(this.Box, this.mats.stone_diorite_smooth)
  },
  stone_granite: function () {
    return new THREE.Mesh(this.Box, this.mats.stone_granite)
  },
  stone_granite_smooth: function () {
    return new THREE.Mesh(this.Box, this.mats.stone_granite_smooth)
  },
  stone_slab: function () {
    var side = this.mats.stone_slab_side
    var top = this.mats.stone_slab_top
    return new THREE.Mesh(this.Box, [side, side, top, side, side, side])
  },
  stonebrick: function () {
    return new THREE.Mesh(this.Box, this.mats.stonebrick)
  },
  stonebrick_carved: function () {
    return new THREE.Mesh(this.Box, this.mats.stonebrick_carved)
  },
  stonebrick_cracked: function () {
    return new THREE.Mesh(this.Box, this.mats.stonebrick_cracked)
  },
  stonebrick_mossy: function () {
    return new THREE.Mesh(this.Box, this.mats.stonebrick_mossy)
  },
  stairs_plain: function () {
    return this.obj.stairs_plain.clone()
  },
  handrail: function () {
    return this.obj.handrail.clone()
  },
  fence: function () {
    return this.obj.fence.clone()
  },
  glass: function () {
    return this.obj.glass.clone()
  },
  leave: function () {
    return this.obj.leave.clone()
  },
  leaves_opaque: function () {
    return this.obj.leaves_opaque.clone()
  },
  log_jungle: function () {
    return this.obj.log_jungle.clone()
  },
  water: function () {
    console.log(this.obj.water.clone())
    return this.obj.water.clone()
  },
}