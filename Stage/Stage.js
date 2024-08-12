/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("backdrop1", "./Stage/costumes/backdrop1.svg", {
        x: 240.39999389648438,
        y: 195.60000500000004,
      }),
    ];

    this.sounds = [new Sound("pop", "./Stage/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
    ];

    this.vars.speed = 0;
    this.vars.score = 55;
    this.vars.workers = 5;
  }

  *whenGreenFlagClicked() {
    this.vars.workers = 0;
    while (true) {
      this.vars.score += this.toNumber(this.vars.workers);
      yield* this.wait(1);
      yield;
    }
  }
}
