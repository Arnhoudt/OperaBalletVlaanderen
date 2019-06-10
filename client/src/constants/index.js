export const ROUTES = {
  threeScene: `/`,
  loginAdmin: `/loginAdmin`,
  registerAdmin: `/registerAdmin`,
  loginUser: `/loginUser`,
  registerUser: `/registerUser`,
  dashboard: `/dashboard`
};

export const POINTER = {
  image: `assets/img/whiteCircle.png`,
  width: 50,
  height: 50
};

const FONT_PATH = `assets/fonts/`;

export const FONTS = {
  domaineDispSemibold: FONT_PATH + `DomaineSemibold.json`,
  domaineRegular: FONT_PATH + `DomaineRegular.json`,
  radikalRegular: FONT_PATH + `RadikalRegular.json`,
  radikalLight: FONT_PATH + `RadikalLight.json`,
  radikalThin: FONT_PATH + `RadikalThin.json`,
  radikalBold: FONT_PATH + `RadikalBold.json`,
  radikalMedium: FONT_PATH + `RadikalMedium.json`,

};

export const FOG = {
  near: 300,
  far: 1600
};

export const CAMERA_RUBBERBANDING_FORCE = 0.01;

export const ANTIALIASING = true;

export const WORLD_POSITION = {
  images: 1500,
  questions: 50000
};


export const CAMERA = {
  fov: 45,
  aspect: window.innerWidth / window.innerHeight,
  near: 0.1,
  far: 10000,
  position: WORLD_POSITION.questions,
  movementFreedom: 100 //20 voor bij de foto's is goed denk ik en voor de vragen is 50-100 beter
};


export const BACKGROUND_COLORS = {
  images: {
    default: {
      position: WORLD_POSITION.images,
      r: 214,
      g: 229,
      b: 255
    },
    background1: {
      position: WORLD_POSITION.images - 1000,
      r: 200,
      g: 0,
      b: 100
    },
    background2: {
      position: WORLD_POSITION.images - 2000,
      r: 50,
      g: 200,
      b: 50
    },
    background3: {
      position: WORLD_POSITION.images - 4000,
      r: 0,
      g: 100,
      b: 200
    },
    background4: {
      position: WORLD_POSITION.images - 6000,
      r: 200,
      g: 200,
      b: 200
    },
    background5: {
      position: WORLD_POSITION.images - 8000,
      r: 50,
      g: 200,
      b: 50
    },
    end: {
      position: WORLD_POSITION.images - 15000,
      r: 255,
      g: 255,
      b: 255
    }

  }
}