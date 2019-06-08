import React, { Component } from "react";
import * as THREE from "three";
import Canary from "../../three/Canary";
import styles from "./ThreeScene.module.css";
let canary = new Canary();

class ThreeScene extends Component {
  componentDidMount() {

    // INSTELLINGEN <- dit zijn de enige waarden die je mag aanpassen!
    {
      this.backgroundColors = {
        default: {
          position: 0,
          r: 0,
          g: 125,
          b: 125
        },
        background1: {
          position: -1000,
          r: 200,
          g: 0,
          b: 100
        },
        background2: {
          position: -2000,
          r: 50,
          g: 200,
          b: 50
        },
        background3: {
          position: -4000,
          r: 0,
          g: 100,
          b: 200
        },
        background4: {
          position: -6000,
          r: 200,
          g: 200,
          b: 200
        },
        background5: {
          position: -8000,
          r: 50,
          g: 200,
          b: 50
        },
        end: {
          position: -99999999,
          r: 255,
          g: 255,
          b: 255
        },
      };

      this.fonts = {
        helvetacaLight: `assets/fonts/helvetiker_regular.typeface.json`
      };

      this.POINTER = {
        image : "assets/img/whiteCircle.png",
        width : 50,
        height : 50
      };

      this.CAMERA = {
        fov: 45,
        aspect : window.innerWidth / window.innerHeight,
        near : 0.1,
        far : 10000,
        position : 1500
      }

      this.FOG = {
        near : 300,
        far : 1600
      }

      this.ANTIALIASING = true;
    }

    // Maken van een witte bol die de pointer volgt
    {
      this.pointer = document.createElement("div");
      this.pointer.innerHTML = '<img src='+this.POINTER.image+' width="'+this.POINTER.width+'" height="'+this.POINTER.height+'" alt="">';
      this.pointer.classList.add("pointer");
      this.pointer.style.transform = 'translateX(-100px)';
      this.pointer.style.position = "absolute";
      document.body.appendChild(this.pointer);
    }

    // variablelen aanmaken (hier mag GEEN data in zitten, dat doe je in de instellingen)
    {
    this.closeUpData = {};
    this.currentColor = {...this.backgroundColors.default};
    this.newColor = this.currentColor;

    this.mouseMoved = false;
    this.mousePosition = {
      x: 0,
      y: 0
    };//default waarde zonder betekenis
    this.lookPosition = {
      x: 0,
      y: 0
    };//default waarde zonder betekenis
    this.pointerPosition = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    }//default waarde zonder betekenis
  }

    //three variablen zoals loaders, camera's, raycasters en de scene
    {
      //ADD TEXTURE LOADER
      this.textureLoader = new THREE.TextureLoader();
      //ADD FONT LOADER
      this.fontLoader = new THREE.FontLoader();
      //ADD SCENE
      this.scene = new THREE.Scene();
      {
        const color =
            this.currentColor.b +
            this.currentColor.g * 256 +
            this.currentColor.r * 256 * 256,
            near = this.FOG.near,
            far = this.FOG.far;
        this.scene.fog = new THREE.Fog(color, near, far);
      }
      //ADD CAMERA
      this.camera = new THREE.PerspectiveCamera(
          this.CAMERA.fov,
          this.CAMERA.aspect,
          this.CAMERA.near,
          this.CAMERA.far
      );
      this.camera.position.z = this.CAMERA.position;
      //ADD RENDERER
      this.renderer = new THREE.WebGLRenderer({ antialias: this.ANTIALIASING });
      this.renderer.setClearColor(
          this.currentColor.b +
          this.currentColor.g * 256 +
          this.currentColor.r * 256 * 256
      );
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.mount.appendChild(this.renderer.domElement);
      //ADD RAYCASTER
      this.raycaster = new THREE.Raycaster();
      //ADD MOUSE
      this.mouse = new THREE.Vector2();
    }

    //aanmaken van de images
    {
      //CREATE IMAGES
      canary.createImage(
          this,
          `assets/img/pikachu.jpg`,
          200,
          100,
          -300,
          200,
          150
      );
      canary.createImage(
          this,
          `assets/img/pikachu.jpg`,
          -200,
          -100,
          -500,
          200,
          150
      );
      canary.createImage(this, `assets/img/pikachu.jpg`, 200, 0, -700, 200, 150);
      canary.createImage(
          this,
          `assets/img/pikachu.jpg`,
          -150,
          100,
          -800,
          200,
          150
      );
      //CREATE FONTS
      canary.createText(
          this,
          this.fonts.helvetacaLight,
          0xff6690,
          `Pikachu`,
          0,
          0,
          500,
          200
      );
      canary.createText(
          this,
          this.fonts.helvetacaLight,
          0xff6690,
          `Pika Pika`,
          0,
          0,
          -1800,
          200
      );
    }

    //eventlisteners
    {
      window.addEventListener(`resize`, this.onResize);
      window.addEventListener(`mousemove`, this.onMouseMove);
      window.addEventListener(`wheel`, this.handleMouseScroll);
      window.addEventListener(`keydown`, this.handleKeyDown);
      window.addEventListener(`click`, this.handleMouseClick);
    }

    this.start();
  }

  componentWillUnmount() {
    this.stop();
    window.removeEventListener(`resize`, this.onResize);
    window.removeEventListener(`mousemove`, this.onMouseMove);
    window.removeEventListener(`wheel`, this.handleMouseScroll);
    window.removeEventListener(`keydown`, this.handleKeyDown);
    window.removeEventListener(`click`, this.handleMouseClick);
    if (this.renderer) {
      this.mount.removeChild(this.renderer.domElement);
    }
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  }

  stop = () => {
    cancelAnimationFrame(this.frameId);
  }


  //animate en render

  animate = () => {
    //ANIMATION
    if(this.mouseMoved === true){
      const vx = canary.rubberBand(this.lookPosition.x, -(window.innerWidth/2 - this.mousePosition.x)/20, 0.03);
      const vy = canary.rubberBand((this.lookPosition.y) , ((window.innerHeight/2 - this.mousePosition.y)/20), 0.03);
      this.lookPosition.x += vx;
      this.lookPosition.y += vy;
      const z = this.camera.position.z-100;

      this.camera.lookAt(this.lookPosition.x ,this.lookPosition.y , z);

      const vpx = canary.rubberBand(this.pointerPosition.x, this.mousePosition.x, 0.06);
      const vpy = canary.rubberBand(this.pointerPosition.y,this.mousePosition.y, 0.06);
      this.pointerPosition.x += vpx;
      this.pointerPosition.y += vpy;

      this.pointer.style.transform =  'translate('+(this.pointerPosition.x+16)+'px,'+(this.pointerPosition.y+16)+'px)';
    }
    if(this.currentColor !== this.newColor){
      const rv = Math.round((this.newColor.r - this.currentColor.r) * 0.03);
      this.currentColor.r += rv;
      const gv = Math.round((this.newColor.g - this.currentColor.g) * 0.03);
      this.currentColor.g += gv;
      const bv = Math.round((this.newColor.b - this.currentColor.b) * 0.03);
      this.currentColor.b += bv;
      this.renderer.setClearColor(this.currentColor.b+256*this.currentColor.g+256*256*this.currentColor.r);
      this.scene.fog = new THREE.Fog(this.currentColor.b+this.currentColor.g*256+this.currentColor.r*256*256, 300, 1600);
    }
    //ANIMATION
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  }

  renderScene = () => {
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
        <div className={styles.div}
             ref={mount => {
               this.mount = mount;
             }}
        />
    );
  }


  //Handers

  handleMouseClick = e => {
    e.preventDefault();

    //De raycaster kijkt welke objecten er in het visier van de muis liggen
    this.mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    this.mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
    this.raycaster.setFromCamera( this.mouse, this.camera );
    var intersects = this.raycaster.intersectObjects( this.scene.children );
    //de elementen zitten in intersects

    if(intersects.length > 0){
      //er wordt gecontroleerd of er momenteel naar een object wordt gekeken
      if(this.closeUpObject === undefined){
        this.closeUpData = {
          posX: intersects[ 0 ].object.position.x,
          posY: intersects[ 0 ].object.position.y,
          posZ: intersects[ 0 ].object.position.z,
          rotX: intersects[ 0 ].object.rotation.x,
          rotY: intersects[ 0 ].object.rotation.y,
          rotZ: intersects[ 0 ].object.rotation.z,
          scaleX: intersects[ 0 ].object.scale.x,
          scaleY: intersects[ 0 ].object.scale.y,
          scaleZ: intersects[ 0 ].object.scale.z
        } // de waarden van de huidige foto worden opgeslagen TODO: dit kan efficienter
        intersects[ 0 ].object.position.set(0,0, this.camera.position.z - 100); //de foto wordt centraal op het scherm van de user geplaatst
        intersects[ 0 ].object.rotation.set(0,0,0);
        intersects[ 0 ].object.scale.set(60,40, intersects[ 0 ].object.scale.z);
        this.scene.fog = new THREE.Fog(this.currentColor.b+this.currentColor.g*256+this.currentColor.r*256*256, 105, 120);
        this.closeUpObject = intersects[ 0 ];
      }else{
        this.closeUpObject.object.position.set(this.closeUpData.posX, this.closeUpData.posY, this.closeUpData.posZ);
        this.closeUpObject.object.rotation.set(this.closeUpData.rotX, this.closeUpData.rotY, this.closeUpData.rotZ);
        this.closeUpObject.object.scale.set(this.closeUpData.scaleX, this.closeUpData.scaleY, this.closeUpData.scaleZ);
        this.scene.fog = new THREE.Fog(this.currentColor.b+this.currentColor.g*256+this.currentColor.r*256*256, 300, 1600);
        this.closeUpObject = undefined;
      }
    }
  };

  handleKeyDown = e => {
    console.log(`I have no idea why you pressed ` + e.key + ` but you did`);
  };

  onMouseMove = event => {
    event.preventDefault();
    this.mouseMoved = true;
    this.mousePosition = {
      x:event.clientX,
      y:event.clientY
    }
    if(this.closeUpObject === undefined){
      this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

      this.raycaster.setFromCamera( this.mouse, this.camera );
      var intersects = this.raycaster.intersectObjects( this.scene.children );

      if(intersects.length > 0){
        let image;
        for (let intersect of intersects){
          if(intersect.object.name === "image"){
            image = intersect;
            break;
          }
        }
        if(image){
          //intersects[ 0 ].object.scale.set(intersects[ 0 ].object.scale.x,intersects[ 0 ].object.scale.y+1, intersects[ 0 ].object.scale.z+1);
          image.object.scale.set(240,170, image.object.scale.z);
          this.zoomedObject = image;
        }
      }else {
        if(this.zoomedObject !== undefined){
          this.zoomedObject.object.scale.set(200,150, this.zoomedObject.object.scale.z);
          this.zoomedObject = undefined;
        }
      }
    }
  };

  handleMouseScroll = e =>{
    if(this.closeUpObject === undefined){
      this.camera.position.z -= e.deltaY/3;
      this.scene.children.forEach(child => {
        //alpha = Math.atan((child.position.x - camera.position.x)/(child.position.z - camera.position.z-450));
        //beta = Math.atan((child.position.y - camera.position.y)/(child.position.z -camera.position.z-450));
        //child.rotation.set(-Math.PI*beta, Math.PI*alpha, Math.PI*((camera.position.z)/child.position.z));
        child.lookAt(this.camera.position.x,this.camera.position.y,this.camera.position.z);
      });

      let afstand = -1000000000;
      let color = {};
      Object.entries(this.backgroundColors).forEach(backgroundColor => {
        const bc = {...backgroundColor[1]};
        if(bc.position < this.camera.position.z && bc.position > afstand){
          afstand = bc.position;
          color = bc;
        }
      });
      this.newColor = {
        r:color.r,
        g:color.g,
        b:color.b
      }
    }
  }

  onResize = () => {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  };
}

export default ThreeScene;
