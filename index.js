import {
  Project,
  Sprite,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Cookiesprite1 from "./Cookiesprite1/Cookiesprite1.js";
import Score from "./Score/Score.js";
import Lights from "./Lights/Lights.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  Cookiesprite1: new Cookiesprite1({
    x: -3,
    y: -1,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 350,
    visible: true,
    layerOrder: 2,
  }),
  Score: new Score({
    x: 240,
    y: 134,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 11,
    size: 50,
    visible: false,
    layerOrder: 1,
  }),
  Lights: new Lights({
    x: 36,
    y: 28,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 3,
  }),
};

const project = new Project(stage, sprites, {
  frameRate: 30, // Set to 60 to make your project run faster
});
export default project;
