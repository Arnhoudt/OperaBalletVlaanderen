import * as THREE from "three";
import { POINTER, PLANE_DIFFERENCE, PLANE_PERSPECTIVE_CONSTANTE } from "../constants";

class Canary {
  constructor(length) {
    super();
    let textureLoader = new THREE.TextureLoader();
    let maxAnisotropy = component.renderer.capabilities.getMaxAnisotropy();
  }
  createPng = (component, path, x, y, z, width, height, planeZ, anisotropy, filter, name) => {
    let textureLoader = new THREE.TextureLoader();//TODO: volgens mij mogen deze twee functies weg aangezien we worden aangemaakt in de constructor
    let maxAnisotropy = component.renderer.capabilities.getMaxAnisotropy();// deze lijn mag ook weg, denk ik
    let planeAnisotropy;
    if (anisotropy === undefined || anisotropy < 1) {
      planeAnisotropy = 1;
    } else if (anisotropy > maxAnisotropy) {
      planeAnisotropy = maxAnisotropy;
    } else {
      planeAnisotropy = anisotropy;
    }
    if (planeZ !== 0) {
      z += -PLANE_DIFFERENCE * planeZ;
      width *= 1 + planeZ * PLANE_PERSPECTIVE_CONSTANTE;
      height *= 1 + planeZ * PLANE_PERSPECTIVE_CONSTANTE;
    }
    return textureLoader.load(path, texture => {
      let Geo = new THREE.PlaneBufferGeometry(width, height);
      let Material = new THREE.MeshLambertMaterial({
        map: texture,
        transparent: true
      });
      texture.anisotropy = planeAnisotropy;
      if (filter) {
        texture.minFilter = THREE.NearestFilter;
      }

      let plane = new THREE.Mesh(Geo, Material);
      plane.position.set(x, y, z);
      plane.name = name;
      component.scene.add(plane);
      return plane;
    });
  };

  createSound = (component, clip) => {
    let sound = new THREE.Audio(component.that.listener);
    let audioLoader = new THREE.AudioLoader();
    audioLoader.load(clip, buffer => {
      sound.setBuffer(buffer);
      sound.setLoop(true);
      sound.setVolume(0.5);
      component.sounds.push(sound);
    });
  };

  createRectangle = (component, x, y, z, width, height, planeZ, color, name) => {
    let geometry = new THREE.PlaneGeometry(width, height);
    let material = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide });
    let plane = new THREE.Mesh(geometry, material);
    if (planeZ !== 0) {
      z += -PLANE_DIFFERENCE * planeZ;
      width *= 1 + planeZ * PLANE_PERSPECTIVE_CONSTANTE;
      height *= 1 + planeZ * PLANE_PERSPECTIVE_CONSTANTE;
    }

    plane.position.set(x, y, z);
    plane.name = name;
    component.scene.add(plane);
  };

  rubberBand = (current, final, amount) => {
    return (final - current) * amount;
  };

  getClosestObjectWithName = (intersects, name) => {
    let zoomedObject;
    intersects.reverse();
    intersects.forEach(intersect => {
      if (intersect.object.name === name) {
        zoomedObject = intersect;
      }
    });
    return zoomedObject;
  };

  getPhotoData = intersect => {
    return {
      posX: intersect.object.position.x,
      posY: intersect.object.position.y,
      posZ: intersect.object.position.z,
      rotX: intersect.object.rotation.x,
      rotY: intersect.object.rotation.y,
      rotZ: intersect.object.rotation.z,
      scaleX: intersect.object.scale.x,
      scaleY: intersect.object.scale.y,
      scaleZ: intersect.object.scale.z
    };
  };

  loadPhotoData = (data, photo) => {
    photo.object.position.set(data.posX, data.posY, data.posZ);
    photo.object.rotation.set(data.rotX, data.rotY, data.rotZ);
    photo.object.scale.set(data.scaleX, data.scaleY, data.scaleZ);
  };

  createText = (that, message, textFont, size, color, x, y, z, planeZ, rotation = 0, name, center) => {
    that.fontLoader.load(textFont, font => {
      let textGeometry = new THREE.TextGeometry(message, {
        font: font,
        size: size,
        height: 0
      });
      if (center) {
        textGeometry.center();
      }
      if (planeZ !== 0) {
        z += -PLANE_DIFFERENCE * planeZ;
        size *= 1 + planeZ * PLANE_PERSPECTIVE_CONSTANTE;
      }

      let textMaterial = new THREE.MeshPhongMaterial({ color: color });
      let mesh = new THREE.Mesh(textGeometry, textMaterial);
      mesh.position.set(x, y, z);
      mesh.rotation.set(0, 0, rotation);
      mesh.name = name;
      that.scene.add(mesh);
    });
  };

  createPointer = path => {
    let pointer = document.createElement(`div`);
    pointer.innerHTML = `<img src=` + path + ` width="` + POINTER.width + `" height="` + POINTER.height + `" alt="">`;
    pointer.classList.add(`pointer`);
    pointer.style.transform = `translateX(-100px)`;
    pointer.style.position = `absolute`;
    pointer.style.userSelect = `none`;
    return pointer;
  };

  createScroll = () => {
    let scroll = document.createElement(`div`);
    scroll.classList.add(`icon-scroll`);
    return scroll;
  };

  changePointer = (pointer, path) => {
    pointer.innerHTML = `<img src=` + path + ` width="` + POINTER.width + `" height="` + POINTER.height + `" alt="">`;
    pointer.classList.add(`pointer`);
    pointer.style.transform = `translateX(-100px)`;
    pointer.style.position = `absolute`;
    pointer.style.userSelect = `none`;
  };
}

export default Canary;
