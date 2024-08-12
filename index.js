import {
  Project,
  Sprite,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Cookie from "./Cookie/Cookie.js";
import Score from "./Score/Score.js";
import Lights from "./Lights/Lights.js";
import Cookie2 from "./Cookie2/Cookie2.js";
import Shop from "./Shop/Shop.js";
import Workers from "./Workers/Workers.js";
import Message from "./Message/Message.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  Cookie: new Cookie({
    x: 0,
    y: 0,
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
    layerOrder: 3,
  }),
  Lights: new Lights({
    x: 0,
    y: 0,
    direction: 149,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 1,
  }),
  Cookie2: new Cookie2({
    x: 45,
    y: -25,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 10,
    visible: false,
    layerOrder: 4,
  }),
  Shop: new Shop({
    x: 0,
    y: 0,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 5,
  }),
  Workers: new Workers({
    x: -172,
    y: -44,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 6,
  }),
  Message: new Message({
    x: 0,
    y: 0,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 7,
  }),
};

const project = new Project(stage, sprites, {
  frameRate: 30, // Set to 60 to make your project run faster
});
export default project;
