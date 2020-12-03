var ViewData = {}
$.ajaxSettings.async = false
$.getJSON('http://localhost:3160/shicun/fullview/src/view.json', function (obj) {
  ViewData = obj
})

/**
 * 创建场景对象Scene
 */
var scene = new THREE.Scene();
var loader = new THREE.CubeTextureLoader();
loader.setPath('http://localhost:3160/shicun/fullview/src/img/panorama/');
/**
 * 光源设置
 */
//点光源
var point = new THREE.PointLight(0xffffff);
point.position.set(100, 100, 100); //点光源位置
scene.add(point); //点光源添加到场景中
//环境光
var ambient = new THREE.AmbientLight(0x444444);
scene.add(ambient);
/**
 * 相机设置
 */
var width = $("#fullView").width(); //窗口宽度
var height = $("#fullView").height(); //窗口高度
var k = width / height; //窗口宽高比
var s = 150; //三维场景显示范围控制系数，系数越大，显示的范围越大
//创建相机对象
var camera = new THREE.PerspectiveCamera(60, k, 0.1, 1000);
camera.position.set(1, 0, 0); //设置相机位置
camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
/**
 * 创建渲染器对象
 */
var renderer = new THREE.WebGLRenderer({
  antialias: true,
  preserveDrawingBuffer: true
});
renderer.setSize(width, height); //设置渲染区域尺寸
renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
document.getElementById("fullView").appendChild(renderer.domElement); //body元素中插入canvas对象
// 渲染函数
function render() {
  renderer.render(scene, camera); //执行渲染操作
}
//创建控件对象  相机对象camera作为参数   控件可以监听鼠标的变化，改变相机对象的属性
var controls = new THREE.OrbitControls(camera, document.getElementById("fullView"));
//监听鼠标事件，触发渲染函数，更新canvas画布渲染效果
controls.addEventListener('change', render);
controls.rotateSpeed = 0.5

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

function onMouseMove(event) {

  // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

}

window.addEventListener('mousemove', onMouseMove, false);