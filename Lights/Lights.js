/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Lights extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Lights/costumes/costume1.svg", { x: 0, y: 0 }),
    ];

    this.sounds = [new Sound("pop", "./Lights/sounds/pop.wav")];

    this.triggers = [];
  }
}
