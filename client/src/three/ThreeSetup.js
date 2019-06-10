import * as THREE from "three";
import { ANTIALIASING, CAMERA, FOG } from "../constants";

class ThreeSetup {
  setup = that => {
    //three variablen zoals loaders, camera's, raycasters en de scene
    //LOADERS
    that.textureLoader = new THREE.TextureLoader();
    that.fontLoader = new THREE.FontLoader();
    //ADD SCENE
    that.scene = new THREE.Scene();
    {
      const color = that.currentColor.b + that.currentColor.g * 256 + that.currentColor.r * 256 * 256,
        near = FOG.near,
        far = FOG.far;
      that.scene.fog = new THREE.Fog(color, near, far);
    }
    //ADD CAMERA
    that.camera = new THREE.PerspectiveCamera(CAMERA.fov, CAMERA.aspect, CAMERA.near, CAMERA.far);
    that.camera.position.z = CAMERA.position;
    that.camera.position.y = 400;
    that.cameraRubberBanding = new THREE.PerspectiveCamera(CAMERA.fov, CAMERA.aspect, CAMERA.near, CAMERA.far);
    //ADD RENDERER
    that.renderer = new THREE.WebGLRenderer({ antialias: ANTIALIASING });
    that.renderer.setClearColor(that.currentColor.b + that.currentColor.g * 256 + that.currentColor.r * 256 * 256);
    that.renderer.setSize(window.innerWidth, window.innerHeight);
    that.mount.appendChild(that.renderer.domElement);
    //ADD RAYCASTER
    that.raycaster = new THREE.Raycaster();
    that.raycaster = new THREE.Raycaster();
    //ADD MOUSE
    that.mouse = new THREE.Vector2();
    //ADD LIGHT
    var light = new THREE.AmbientLight(0xffffff); // soft white light
    that.scene.add(light);
  };
}

export default ThreeSetup;
