import * as THREE from "three";
import { POINTER } from "../constants";
let SVGLoader = require(`three-svg-loader`);

class Canary {
  createPng = (component, path, x, y, z, width, height, anisotropy, name) => {
    let textureLoader = new THREE.TextureLoader();
    var maxAnisotropy = component.renderer.capabilities.getMaxAnisotropy();
    let planeAnisotropy;
    if (anisotropy === undefined || anisotropy < 1) {
      planeAnisotropy = 1;
    } else if (anisotropy > maxAnisotropy) {
      planeAnisotropy = maxAnisotropy;
    } else {
      planeAnisotropy = anisotropy;
    }

    textureLoader.load(path, function(texture) {
      let Geo = new THREE.PlaneBufferGeometry(width, height);
      let Material = new THREE.MeshLambertMaterial({
        map: texture,
        transparent: true
      });
      texture.anisotropy = planeAnisotropy;

      let plane = new THREE.Mesh(Geo, Material);
      plane.position.set(x, y, z);
      plane.name = name;
      component.scene.add(plane);
    });
  };

  rubberBand = (current, final, amount) => {
    return (final - current) * amount;
  };

  getClosestObjectWithName = (intersects, name) => {
    let zoomedObject;
    intersects.reverse();
    intersects.forEach(intersect => {
      if (intersect.object.name === name) {
        //TODO: als een gebruiker over een image en een andere aanraakt zonder dat hij 'niets' heeft aangeraakt zal de vorige foto niet kleiner worden
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

  createImage = (component, path, x, y, z, width, height, name) => {
    component.textureLoader.load(path, texture => {
      let img = new THREE.MeshBasicMaterial({
        map: texture
      });
      let plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), img);
      plane.overdraw = true;
      plane.position.set(x, y, z);
      plane.scale.set(width, height, 1);
      plane.name = name;

      component.scene.add(plane);
    });
  };

  createText = (component, textFont, textColor, textMessage, textPosX, textPosY, textPosZ, textSize) => {
    component.fontLoader.load(textFont, font => {
      let xMid;
      let color = new THREE.Color(textColor);
      let matDark = new THREE.MeshBasicMaterial({
        color: color,
        side: THREE.DoubleSide
      });
      // let matLite = new THREE.MeshBasicMaterial({
      //   color: color,
      //   transparent: true,
      //   opacity: 0.4,
      //   side: THREE.DoubleSide
      // });
      let shapes = font.generateShapes(textMessage, textSize);
      let geometry = new THREE.ShapeBufferGeometry(shapes);
      geometry.computeBoundingBox();
      xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
      geometry.translate(xMid, 0, 0);
      // make line shape ( N.B. edge view remains visible )
      let holeShapes = [];
      for (let i = 0; i < shapes.length; i++) {
        let shape = shapes[i];
        if (shape.holes && shape.holes.length > 0) {
          for (let j = 0; j < shape.holes.length; j++) {
            let hole = shape.holes[j];
            holeShapes.push(hole);
          }
        }
      }
      shapes.push.apply(shapes, holeShapes);
      let style = SVGLoader.getStrokeStyle(5, color.getStyle());
      let strokeText = new THREE.Group();
      for (let i = 0; i < shapes.length; i++) {
        let shape = shapes[i];
        let points = shape.getPoints();
        let geometry2 = SVGLoader.pointsToStroke(points, style);
        geometry2.translate(xMid, 0, 0);
        let strokeMesh = new THREE.Mesh(geometry2, matDark);
        strokeText.add(strokeMesh);
      }
      strokeText.position.set(textPosX, textPosY - textSize / 2, textPosZ);
      component.scene.add(strokeText);
    }); //end load function
  };

  createPointer = () => {
    let pointer = document.createElement(`div`);
    pointer.innerHTML = `<img src=` + POINTER.image + ` width="` + POINTER.width + `" height="` + POINTER.height + `" alt="">`;
    pointer.classList.add(`pointer`);
    pointer.style.transform = `translateX(-100px)`;
    pointer.style.position = `absolute`;
    pointer.style.userSelect = `none`;
    return pointer;
  };
}

export default Canary;
