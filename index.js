import {
  Project,
  Sprite,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Cookie from "./Cookie/Cookie.js";
import Score from "./Score/Score.js";
import Cookie2 from "./Cookie2/Cookie2.js";
import GoldCookie from "./GoldCookie/GoldCookie.js";
import Lights from "./Lights/Lights.js";
import Shop from "./Shop/Shop.js";
import Workers from "./Workers/Workers.js";
import Machine from "./Machine/Machine.js";
import Message from "./Message/Message.js";
import Monster from "./Monster/Monster.js";
import Acheivementssprite1 from "./Acheivementssprite1/Acheivementssprite1.js";
import WorkerProp from "./WorkerProp/WorkerProp.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  Cookie: new Cookie({
    x: 0,
    y: 0,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 399,
    visible: true,
    layerOrder: 1,
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
  GoldCookie: new GoldCookie({
    x: 36,
    y: 28,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 12,
  }),
  Lights: new Lights({
    x: 0,
    y: 0,
    direction: 130,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 2,
  }),
  Shop: new Shop({
    x: 0,
    y: 0,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 2,
    size: 100,
    visible: true,
    layerOrder: 5,
  }),
  Workers: new Workers({
    x: -172,
    y: -44,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.LEFT_RIGHT,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 8,
  }),
  Machine: new Machine({
    x: -64,
    y: -44,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 7,
  }),
  Message: new Message({
    x: 0,
    y: 0,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 9,
  }),
  Monster: new Monster({
    x: 44,
    y: -44,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 6,
  }),
  Acheivementssprite1: new Acheivementssprite1({
    x: 124,
    y: -139,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 4,
    size: 100,
    visible: false,
    layerOrder: 10,
  }),
  WorkerProp: new WorkerProp({
    x: -211,
    y: 68,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 11,
  }),
};

const project = new Project(stage, sprites, {
  frameRate: 30, // Set to 60 to make your project run faster
});
export default project;
