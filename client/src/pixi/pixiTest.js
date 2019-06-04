import * as PIXI from "pixi.js";

class pixiTest {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  showPikachu = () => {
    let app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight
    });
    document.body.appendChild(app.view);

    let img = new PIXI.Sprite.from(`assets/img/pikachu.jpg`);
    img.width = window.innerWidth;
    img.height = window.innerHeight;
    app.stage.addChild(img);
    let depthMap = new PIXI.Sprite.from(`assets/img/pikaMap.png`);
    app.stage.addChild(depthMap);
    depthMap.width = window.innerWidth;
    depthMap.height = window.innerHeight;

    let displacementFilter = new PIXI.filters.DisplacementFilter(depthMap);
    app.stage.filters = [displacementFilter];
    window.onmousemove = function(e) {
      displacementFilter.scale.x = (window.innerWidth / 2 - e.clientX) / 30;
      displacementFilter.scale.y = (window.innerHeight / 2 - e.clientY) / 30;
    };
  };
}

export default pixiTest;
