/**
 * @author mrdoob / http://mrdoob.com/
 * @author Mugen87 / https://github.com/Mugen87
 */

THREE.PointerLockControls = function (bitMap, camera, domElement, movekey, body) {
	this.bitMap = bitMap
	this.domElement = domElement || document.body;
	this.movekey = movekey || {
		go: 87,
		retreat: 83,
		left: 65,
		right: 68,
		jump: 32
	}
	this.body = body || {
		height: 180,
		width: 50,
		length: 50
	}
	this.isLocked = false;

	//
	// internals
	//

	var scope = this;

	var moveState = {
		go: false,
		retreat: false,
		left: false,
		right: false,
		jump: false,
		drop: false
	}
	var dropSpeed = 0
	var dropTime = 0
	var jumpSpeed = 0
	var jumpTime = 0

	var changeEvent = {
		type: 'change'
	};
	var lockEvent = {
		type: 'lock'
	};
	var unlockEvent = {
		type: 'unlock'
	};

	var euler = new THREE.Euler(0, 0, 0, 'YXZ');

	var PI_2 = Math.PI / 2;
	var raycaster = new THREE.Raycaster();
	raycaster.near = 5
	var direction = new THREE.Vector3();
	var origin = new THREE.Vector3();

	function keyToCode() {

		// waiting...

	}

	function checkCrash(position, motion) {

		var {
			height,
			width,
			length
		} = scope.body
		var foots = []
		var heads = []
		var elevation = {}

		position.z = position.z + 20 - height / 2
		foots.push({
			x: position.x - width / 2,
			y: position.y - height / 2,
			z: position.z - length / 2
		})
		foots.push({
			x: position.x + width / 2,
			y: position.y - height / 2,
			z: position.z - length / 2
		})
		foots.push({
			x: position.x - width / 2,
			y: position.y - height / 2,
			z: position.z + length / 2
		})
		foots.push({
			x: position.x + width / 2,
			y: position.y - height / 2,
			z: position.z + length / 2
		})
		heads.push({
			x: position.x - width / 2,
			y: position.y + height / 2,
			z: position.z - length / 2
		})
		heads.push({
			x: position.x + width / 2,
			y: position.y + height / 2,
			z: position.z - length / 2
		})
		heads.push({
			x: position.x - width / 2,
			y: position.y + height / 2,
			z: position.z + length / 2
		})
		heads.push({
			x: position.x + width / 2,
			y: position.y + height / 2,
			z: position.z + length / 2
		})

		foots.forEach(e => {
			e.x = parseInt((e.x -50) / 100) + 25
			e.y = parseInt(e.y / 100) - 1
			e.z = parseInt((e.z -50)  / 100) + 25
		})
		heads.forEach(e => {
			e.x = parseInt((e.x + 50) / 100) + 25
			e.y = parseInt(e.y / 100) - 1
			e.z = parseInt((e.z + 50) / 100) + 25
		})
		if (motion.z < 0) {
			if (bitMap[foots[0].x][foots[0].z - 1][foots[0].y] || bitMap[foots[1].x][foots[1].z - 1][foots[1].y] || bitMap[heads[1].x][heads[1].z - 1][heads[1].y] || bitMap[heads[0].x][heads[0].z - 1][heads[0].y]) {
				motion.z = 0
			}
		}
		if (motion.z > 0) {
			if (bitMap[foots[0].x][foots[0].z + 1][foots[0].y] || bitMap[foots[1].x][foots[1].z + 1][foots[1].y] || bitMap[heads[1].x][heads[1].z + 1][heads[1].y] || bitMap[heads[0].x][heads[0].z + 1][heads[0].y]) {
				motion.z = 0
			}
		}
		if (motion.x < 0) {
			if (bitMap[foots[0].x - 1][foots[0].z][foots[0].y] || bitMap[foots[1].x - 1][foots[1].z][foots[1].y] || bitMap[heads[1].x - 1][heads[1].z][heads[1].y] || bitMap[heads[0].x - 1][heads[0].z][heads[0].y]) {
				motion.x = 0
			}
		}
		if (motion.x > 0) {
			if (bitMap[foots[0].x + 1][foots[0].z][foots[0].y] || bitMap[foots[1].x + 1][foots[1].z][foots[1].y] || bitMap[heads[1].x + 1][heads[1].z][heads[1].y] || bitMap[heads[0].x + 1][heads[0].z][heads[0].y]) {
				motion.x = 0
			}
		}
		if (motion.y > 0) {
			if (bitMap[foots[0].x][foots[0].z][foots[0].y + 1] || bitMap[foots[1].x][foots[1].z][foots[1].y + 1] || bitMap[heads[1].x][heads[1].z][heads[1].y + 1] || bitMap[heads[0].x][heads[0].z][heads[0].y + 1]) {
				motion.y = 0
				moveState.jump = false
			}
		}

		if (bitMap[foots[0].x][foots[0].z][foots[0].y - 1] || bitMap[foots[1].x][foots[1].z][foots[1].y - 1] || bitMap[heads[1].x][heads[1].z][heads[1].y - 1] || bitMap[heads[0].x][heads[0].z][heads[0].y - 1]) {
			if (motion.y < 0) {
				motion.y = 0
			}

			moveState.drop = false
		} else {
			moveState.drop = true
		}


		// console.log(motion, elevation, position)
		return motion
	}

	this.motion = function (time) {

		var final = new THREE.Vector3(0, 0, 0);
		var directionZ = new THREE.Vector3(0, 0, 0);
		camera.getWorldDirection(directionZ); // 获取相机Z轴世界坐标
		directionZ.y = 0;
		directionZ.normalize().multiplyScalar(8); //归一，增长5倍

		if (moveState.go) {
			final.add(directionZ);
		}
		if (moveState.retreat) {
			final.add(directionZ.negate()); // 取反
		}

		if (moveState.left) {
			final.add(directionZ.applyEuler(new THREE.Euler(0, PI_2, 0, 'XYZ')))
		}
		if (moveState.right) {
			final.add(directionZ.applyEuler(new THREE.Euler(0, -PI_2, 0, 'XYZ')))
		}
		if (moveState.jump) {
			jumpTime += time
			jumpSpeed = jump( jumpTime, time)
			if (jumpSpeed < 0.1) {
				moveState.jump = false
				jumpSpeed = 0
				jumpTime = 0
			}
		}
		if (moveState.drop && !moveState.jump) {
			dropTime += time
			dropSpeed = drop( dropTime, time )
		}
		if (!moveState.drop) {
			dropTime = 0
			dropSpeed = 0
		}

		final.add({
			x: 0,
			y: jumpSpeed ? jumpSpeed : dropSpeed,
			z: 0
		});
		if (final.x != 0 || final.y != 0 || final.z != 0)

		BufferMovement.add(checkCrash(camera.position.clone(), final))

}
function jump (now, delta){
	return -1000*(now-0.45)*(now-0.45) + 1000*(now - delta - 0.45)*(now - delta - 0.45)
}
function drop (now, delta){
	return 1000*(now - delta )*(now - delta ) - 1000*now*now
}

function onMouseMove(event) {

	if (scope.isLocked === false) return;

	var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
	var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

	euler.setFromQuaternion(camera.quaternion);

	euler.y -= movementX * 0.002;
	euler.x -= movementY * 0.002;

	euler.x = Math.max(-PI_2, Math.min(PI_2, euler.x));

	camera.quaternion.setFromEuler(euler);

	scope.dispatchEvent(changeEvent);

}

function onPointerlockChange() {

	if (document.pointerLockElement === scope.domElement) {

		scope.dispatchEvent(lockEvent);

		scope.isLocked = true;

	} else {

		scope.dispatchEvent(unlockEvent);

		scope.isLocked = false;

	}

}

function onPointerlockError() {

	console.error('THREE.PointerLockControls: Unable to use Pointer Lock API');

}

function onKeyDown(event) {

	var e = event || window.event || arguments.callee.caller.arguments[0];

	if (!scope.isLocked || !e) return;

	var {
		go,
		retreat,
		left,
		right,
		jump
	} = scope.movekey

	switch (e.keyCode) {

		case go:
			moveState.go = true;
			break;
		case retreat:
			moveState.retreat = true;
			break;
		case left:
			moveState.left = true;
			break;
		case right:
			moveState.right = true;
			break;
		case jump:
			console.log(moveState.jump)
			if (!moveState.jump && !moveState.drop)
				moveState.jump = true;
			break;

	}

}

function onKeyUp(event) {

	var e = event || window.event || arguments.callee.caller.arguments[0];

	if (!scope.isLocked || !e) return;

	var {
		go,
		retreat,
		left,
		right
	} = scope.movekey

	switch (e.keyCode) {

		case go:
			moveState.go = false;
			break;
		case retreat:
			moveState.retreat = false;
			break;
		case left:
			moveState.left = false;
			break;
		case right:
			moveState.right = false;
			break;

	}

}

this.connect = function () {

	document.addEventListener('keyup', onKeyUp, false)
	document.addEventListener('keydown', onKeyDown, false);
	document.addEventListener('mousemove', onMouseMove, false);
	document.addEventListener('pointerlockchange', onPointerlockChange, false);
	document.addEventListener('pointerlockerror', onPointerlockError, false);

};

this.disconnect = function () {

	document.removeEventListener('keydown', onKeyDown, false);
	document.removeEventListener('mousemove', onMouseMove, false);
	document.removeEventListener('pointerlockchange', onPointerlockChange, false);
	document.removeEventListener('pointerlockerror', onPointerlockError, false);

};

this.dispose = function () {

	this.disconnect();

};

this.getObject = function () { // retaining this method for backward compatibility

	return camera;

};

this.getDirection = function () {

	var direction = new THREE.Vector3(0, 0, -1);

	return function (v) {

		return v.copy(direction).applyQuaternion(camera.quaternion);

	};

}();

this.lock = function () {

	this.domElement.requestPointerLock();

};

this.unlock = function () {

	document.exitPointerLock();

};

this.connect();

};

THREE.PointerLockControls.prototype = Object.create(THREE.EventDispatcher.prototype);
THREE.PointerLockControls.prototype.constructor = THREE.PointerLockControls;