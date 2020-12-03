// import * as THREE from "./node_modules/three/build/three"
// import * as THREE from "./node_modules/three/examples/js/loaders/MTLLoader"
// import * as THREE from "./node_modules/three/examples/js/loaders/OBJLoader"
let flyBoxloader = new THREE.CubeTextureLoader();
flyBoxloader.setPath('http://localhost:3160/shicun/stone/src/textures/');

textureCube = flyBoxloader.load([
	'sky__LF.jpg', 'sky__RT.jpg',
	'sky__UP.jpg', 'sky__DN.jpg',
	'sky__FR.jpg', 'sky__BK.jpg',
]);

{
	let scene = new THREE.Scene();
	scene.background = textureCube
	// let OBJLoader = new THREE.OBJLoader();
	// let MTLLoader = new THREE.MTLLoader();

	// MTLLoader.load('http://localhost:3160/shicun/stone/src/model/shimo_1.mtl', function(materials) {
	//   // 返回一个包含材质的对象MaterialCreator

	//   //obj的模型会和MaterialCreator包含的材质对应起来
	//   // materials.blinn1SG.side = THREE.FrontSide
	//   materials.preload();
	//   console.log(materials.materials)
	//   // setTimeout(() => {
	//   //   materials.materials.blinn1SG.side = THREE.DoubleSide;
	//   //   materials.materials.blinn1SG.needsUpdate = true
	//   // }, 500);
	//   OBJLoader.setMaterials(materials);
	//   OBJLoader.load('http://localhost:3160/shicun/stone/src/model/shimo_1.obj', function(obj) {
	//     console.log(obj);
	//     obj.scale.set(1, 1, 1); //放大obj组对象
	//     scene.add(obj);//返回的组对象插入场景中
	//   })
	// })
	let loader = new THREE.GLTFLoader();

	// Optional: Provide a DRACOLoader instance to decode compressed mesh data
	let dracoLoader = new THREE.DRACOLoader();
	dracoLoader.setDecoderPath('./node_modules/three/examples/js/libs/draco');
	loader.setDRACOLoader(dracoLoader);

	// Load a glTF resource
	loader.load(
		// resource URL
		'http://localhost:3160/shicun/stone/src/model/shimo_3.glb',
		// called when the resource is loaded
		(gltf) => {

			scene.add(gltf.scene.children[0]);
			scene.scale.set(0.8,0.8,0.8)
			gltf.animations; // Array<THREE.AnimationClip>
			gltf.scene; // THREE.Scene
			gltf.scenes; // Array<THREE.Scene>
			gltf.cameras; // Array<THREE.Camera>
			gltf.asset; // Object

			render();
		}
	);

	let point = new THREE.PointLight(0xffffff);
	point.position.set(300, 400, 200); //点光源位置
	scene.add(point); //点光源添加到场景中
	let ambient = new THREE.AmbientLight(0xcccccc);
	scene.add(ambient);

	let els = document.getElementsByClassName("el__bg")[0]
	let ctr_els = document.getElementsByClassName("el__content")[0]
	let width = els.offsetWidth; //窗口宽度
	let height = els.offsetHeight; //窗口高度
	let k = width / height; //窗口宽高比
	let s = 150; //三维场景显示范围控制系数，系数越大，显示的范围越大
	let camera = new THREE.PerspectiveCamera(90, k, 1, 2000); //相机
	camera.position.set(100, 100, 100)

	let renderer = new THREE.WebGLRenderer({
		antialias: true
	});
	renderer.setSize(width, height); //设置渲染区域尺寸
	// renderer.setClearColor(0xffffff, 1); //设置背景颜色
	els.appendChild(renderer.domElement); //body元素中插入canvas对象
	function render() {
		renderer.render(scene, camera); //执行渲染操作
		// mesh.rotateY(0.01);//每次绕y轴旋转0.01弧度
		// requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
	}
	render();

	let controls = new THREE.OrbitControls(camera, ctr_els);
	controls.addEventListener('change', render);
}
/*—————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————— */
{
	let scene = new THREE.Scene();
	scene.background = textureCube
	let loader = new THREE.GLTFLoader();

	let dracoLoader = new THREE.DRACOLoader();
	dracoLoader.setDecoderPath('./node_modules/three/examples/js/libs/draco');
	loader.setDRACOLoader(dracoLoader);
	loader.load(
		// resource URL
		'http://localhost:3160/shicun/stone/src/model/shimo_1.glb',
		// called when the resource is loaded
		function (gltf) {

			scene.add(gltf.scene);
			scene.scale.set(3, 3, 3);
			gltf.animations; // Array<THREE.AnimationClip>
			gltf.scene; // THREE.Scene
			gltf.scenes; // Array<THREE.Scene>
			gltf.cameras; // Array<THREE.Camera>
			gltf.asset; // Object
			render();
		}
	);

	let point = new THREE.PointLight(0xffffff);
	point.position.set(300, 400, 200); //点光源位置
	scene.add(point); //点光源添加到场景中
	let ambient = new THREE.AmbientLight(0xcccccc);
	scene.add(ambient);

	let els = document.getElementsByClassName("el__bg")[1]
	let ctr_els = document.getElementsByClassName("el__content")[1]
	let width = els.offsetWidth; //窗口宽度
	let height = els.offsetHeight; //窗口高度
	let k = width / height; //窗口宽高比
	let s = 150; //三维场景显示范围控制系数，系数越大，显示的范围越大
	let camera = new THREE.PerspectiveCamera(90, k, 1, 2000); //相机
	camera.position.set(100, 100, 100)

	let renderer = new THREE.WebGLRenderer({
		antialias: true
	});
	renderer.setSize(width, height); //设置渲染区域尺寸
	renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
	els.appendChild(renderer.domElement); //body元素中插入canvas对象
	function render() {
		renderer.render(scene, camera); //执行渲染操作
		// mesh.rotateY(0.01);//每次绕y轴旋转0.01弧度
		// requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
	}
	render();

	let controls = new THREE.OrbitControls(camera, ctr_els);
	controls.addEventListener('change', render);
} 
/*——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————-----*/
{
	let scene = new THREE.Scene();
	scene.background = textureCube
	let loader = new THREE.GLTFLoader();

	let dracoLoader = new THREE.DRACOLoader();
	dracoLoader.setDecoderPath('./node_modules/three/examples/js/libs/draco');
	loader.setDRACOLoader(dracoLoader);
	loader.load(
		// resource URL
		'http://localhost:3160/shicun/stone/src/model/shimo_2.glb',
		// called when the resource is loaded
		function (gltf) {

			scene.add(gltf.scene.children[0]);
			scene.scale.set(1.5,1.5,1.5)
			gltf.animations; // Array<THREE.AnimationClip>
			gltf.scene; // THREE.Scene
			gltf.scenes; // Array<THREE.Scene>
			gltf.cameras; // Array<THREE.Camera>
			gltf.asset; // Object
			render();
		}
	);

	let point = new THREE.PointLight(0xffffff);
	point.position.set(300, 400, 200); //点光源位置
	scene.add(point); //点光源添加到场景中
	let ambient = new THREE.AmbientLight(0xcccccc);
	scene.add(ambient);

	let els = document.getElementsByClassName("el__bg")[2]
	let ctr_els = document.getElementsByClassName("el__content")[2]
	let width = els.offsetWidth; //窗口宽度
	let height = els.offsetHeight; //窗口高度
	let k = width / height; //窗口宽高比
	let s = 150; //三维场景显示范围控制系数，系数越大，显示的范围越大
	let camera = new THREE.PerspectiveCamera(90, k, 1, 2000); //相机
	camera.position.set(100, 100, 100)

	let renderer = new THREE.WebGLRenderer({
		antialias: true
	});
	renderer.setSize(width, height); //设置渲染区域尺寸
	renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
	els.appendChild(renderer.domElement); //body元素中插入canvas对象
	function render() {
		renderer.render(scene, camera); //执行渲染操作
		// mesh.rotateY(0.01);//每次绕y轴旋转0.01弧度
		// requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
	}
	render();

	let controls = new THREE.OrbitControls(camera, ctr_els);
	controls.addEventListener('change', render);
}
/*———————————————————————————————————————————————————————————————————————————————————————————————— */
{
	let scene = new THREE.Scene();
	scene.background = textureCube
	let loader = new THREE.GLTFLoader();

	let dracoLoader = new THREE.DRACOLoader();
	dracoLoader.setDecoderPath('./node_modules/three/examples/js/libs/draco');
	loader.setDRACOLoader(dracoLoader);
	loader.load(
		// resource URL
		'http://localhost:3160/shicun/stone/src/model/shuijing.glb',
		// called when the resource is loaded
		function (gltf) {

			scene.add(gltf.scene.children[0]);
			scene.scale.set(4,4,4)
			gltf.animations; // Array<THREE.AnimationClip>
			gltf.scene; // THREE.Scene
			gltf.scenes; // Array<THREE.Scene>
			gltf.cameras; // Array<THREE.Camera>
			gltf.asset; // Object
			render();
		}
	);

	let point = new THREE.PointLight(0xffffff);
	point.position.set(300, 400, 200); //点光源位置
	scene.add(point); //点光源添加到场景中
	let ambient = new THREE.AmbientLight(0xcccccc);
	scene.add(ambient);

	let els = document.getElementsByClassName("el__bg")[3]
	let ctr_els = document.getElementsByClassName("el__content")[3]
	let width = els.offsetWidth; //窗口宽度
	let height = els.offsetHeight; //窗口高度
	let k = width / height; //窗口宽高比
	let s = 150; //三维场景显示范围控制系数，系数越大，显示的范围越大
	let camera = new THREE.PerspectiveCamera(90, k, 1, 2000); //相机
	camera.position.set(100, 100, 100)

	let renderer = new THREE.WebGLRenderer({
		antialias: true
	});
	renderer.setSize(width, height); //设置渲染区域尺寸
	renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
	els.appendChild(renderer.domElement); //body元素中插入canvas对象
	function render() {
		renderer.render(scene, camera); //执行渲染操作
		// mesh.rotateY(0.01);//每次绕y轴旋转0.01弧度
		// requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
	}
	render();

	let controls = new THREE.OrbitControls(camera, ctr_els);
	controls.addEventListener('change', render);
}