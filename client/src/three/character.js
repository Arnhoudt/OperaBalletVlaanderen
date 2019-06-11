import * as THREE from "three";
import { BACKGROUND_COLORS, FONTS, WORLD_POSITION, ROUTES } from "../constants";
import Canary from "./Canary";

class Character {
  canary = new Canary();
  load = (that) => {
    that.cameraRubberBandingActive = false;
    console.log("test 9877");
  }

  animate = () => {
  }
}

export default Character;
