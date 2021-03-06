import * as THREE from "three";
import { ANTIALIASING, CAMERA } from "../constants";

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
        near = that.fog.near,
        far = that.fog.far;
      that.scene.fog = new THREE.Fog(color, near, far);
    }
    //ADD CAMERA
    that.camera = new THREE.PerspectiveCamera(CAMERA.fov, CAMERA.aspect, CAMERA.near, CAMERA.far);
    that.camera.position.z = CAMERA.position;
    that.camera.position.y = 0;
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
    let light = new THREE.AmbientLight(0xffffff); // soft white light
    that.scene.add(light);
    //ADD AUDIO
    that.listener = new THREE.AudioListener();
    that.camera.add(that.listener);
  };
}

export default ThreeSetup;
