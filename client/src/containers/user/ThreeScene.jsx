import React, { Component } from "react";
import * as THREE from "three";

class ThreeScene extends Component {
  componentDidMount() {
    //ADD SCENE
    this.scene = new THREE.Scene();
    {
      const color = 0xe5e5e5,
        near = 300,
        far = 1000;
      this.scene.fog = new THREE.Fog(color, near, far);
    }
    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );
    this.camera.position.z = 5;
    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor(`#e5e5e5`);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.mount.appendChild(this.renderer.domElement);
    //ADD RAYCASTER
    this.raycaster = new THREE.Raycaster();
    //ADD MOUSE
    this.mouse = new THREE.Vector2();
    //CREATE IMAGES
    this.createImage(`assets/img/pikachu.jpg`, 200, 100, -300, 200, 150);
    this.createImage(`assets/img/pikachu.jpg`, -200, -100, -500, 200, 150);
    this.createImage(`assets/img/pikachu.jpg`, 200, 0, -700, 200, 150);
    this.createImage(`assets/img/pikachu.jpg`, -150, 100, -800, 200, 150);
    //ADD LIGHT
    this.light = new THREE.PointLight(0xffffff, 1, 500);
    this.light.position.set(50, 10, 25);
    this.scene.add(this.light);
    //ADD EVENTLISTENERS
    window.addEventListener(`resize`, this.onResize);
    window.addEventListener(`mousemove`, this.onMouseMove);
    window.addEventListener(`wheel`, this.handleMouseScroll);

    this.start();
  }

  componentWillUnmount() {
    this.stop();
    window.removeEventListener(`resize`, this.onResize);
    window.removeEventListener(`mousemove`, this.onMouseMove);
    window.removeEventListener(`wheel`, this.handleMouseScroll);
    this.mount.removeChild(this.renderer.domElement);
  }

  onMouseMove = event => {
    event.preventDefault();
    this.camera.lookAt(
      -(window.innerWidth / 2 - event.clientX) / 20,
      (window.innerHeight / 2 - event.clientY) / 20,
      this.camera.position.z - 100
    );
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  };

  handleMouseScroll = e => {
    this.camera.position.z -= e.deltaY / 3;
  };

  onResize = () => {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  };

  createImage = (path, x, y, z, width, height) => {
    // instantiate a loader
    var loader = new THREE.TextureLoader();
    // load a resource
    loader.load(
      // resource URL
      path,
      // Function when resource is loaded
      texture => {
        // do something with the texture
        let img = new THREE.MeshBasicMaterial({
          map: texture
        });
        let plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), img);
        plane.overdraw = true;
        plane.position.set(x, y, z);
        plane.scale.set(width, height, 1);

        this.scene.add(plane);
      },
      // Function called when download progresses
      xhr => {
        console.log((xhr.loaded / xhr.total) * 100 + `% loaded`);
      },
      // Function called when download errors
      xhr => {
        console.log(`An error happened`);
      }
    );
  };

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  };

  stop = () => {
    cancelAnimationFrame(this.frameId);
  };

  animate = () => {
    //ANIMATION
    this.raycaster.setFromCamera(this.mouse, this.camera);
    let intersects = this.raycaster.intersectObjects(this.scene.children);
    if (intersects.length > 0) {
      intersects[0].object.scale.set(240, 170, intersects[0].object.scale.z);
      this.zoomedObject = intersects[0];
    } else {
      if (this.zoomedObject !== undefined) {
        this.zoomedObject.object.scale.set(
          200,
          150,
          this.zoomedObject.object.scale.z
        );
        this.zoomedObject = undefined;
      }
    }
    //ANIMATION
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  };

  renderScene = () => {
    this.renderer.render(this.scene, this.camera);
  };

  render() {
    return (
      <div
        ref={mount => {
          this.mount = mount;
        }}
      />
    );
  }
}

export default ThreeScene;
