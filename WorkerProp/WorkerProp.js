/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class WorkerProp extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./WorkerProp/costumes/costume1.svg", {
        x: 20.732765,
        y: 31.426604999999995,
      }),
    ];

    this.sounds = [new Sound("pop", "./WorkerProp/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.stage.vars.idworker = 0;
  }

  *startAsClone() {
    this.visible = true;
    this.rotationStyle = Sprite.RotationStyle.LEFT_RIGHT;
    if (this.toNumber(this.stage.vars.idworker) === 1) {
      this.goto(-208, 137);
    }
    if (this.toNumber(this.stage.vars.idworker) === 2) {
      this.goto(-150, 137);
    }
    if (this.toNumber(this.stage.vars.idworker) === 3) {
      this.goto(-110, 137);
    }
    if (this.toNumber(this.stage.vars.idworker) === 4) {
      this.goto(-208, 68);
    }
    if (this.toNumber(this.stage.vars.idworker) === 5) {
      this.goto(-150, 68);
    }
    while (true) {
      yield* this.wait(1);
      this.direction = 90;
      yield* this.wait(1);
      this.direction = -90;
      yield;
    }
  }
}
