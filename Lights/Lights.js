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
      new Costume("Glow", "./Lights/costumes/Glow.svg", {
        x: 16.78359499999999,
        y: 16.779255000000006,
      }),
    ];

    this.sounds = [new Sound("pop", "./Lights/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
    ];
  }

  *whenGreenFlagClicked() {
    while (true) {
      this.goto(this.sprites["Cookie"].x, this.sprites["Cookie"].y);
      this.size = 800;
      this.direction += 1;
      this.moveBehind();
      yield;
    }
  }
}
