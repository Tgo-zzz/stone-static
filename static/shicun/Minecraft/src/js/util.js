Math.seed = 10 

Math.seededRandom = function (max, min) {
  max = max || 1;
  min = min || 0;
  Math.seed = (Math.seed * 9301 + 49297) % 233280;
  var rnd = Math.seed / 233280.0;
  return min + rnd * (max - min)
};

Math.setSeed = function (seed) {
  Math.seed =seed
}

Math.dot = function (vector1, vector2) {
  return vector1.x * vector2.x + vector1.y * vector2.y
}


var stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );
 
// function animate() {
 
//     stats.begin();
 
//     // monitored code goes here
 
//     stats.end();
 
//     requestAnimationFrame( animate );
 
// }
 
// requestAnimationFrame( animate );
