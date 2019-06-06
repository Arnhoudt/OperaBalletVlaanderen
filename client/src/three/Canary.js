import * as THREE from "three";
import * as SVGLoader from "three-svg-loader";

class Canary {
  createImage = (component, path, x, y, z, width, height) => {
    component.textureLoader.load(
      path,
      texture => {
        let img = new THREE.MeshBasicMaterial({
          map: texture
        });
        let plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), img);
        plane.overdraw = true;
        plane.position.set(x, y, z);
        plane.scale.set(width, height, 1);

        component.scene.add(plane);
      },
      xhr => {
        console.log((xhr.loaded / xhr.total) * 100 + `% loaded`);
      },
      xhr => {
        console.log(`An error happened`);
      }
    );
  };

  createText = (
    component,
    textFont,
    textColor,
    textMessage,
    textPosX,
    textPosY,
    textPosZ,
    textSize
  ) => {
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
}

export default Canary;
