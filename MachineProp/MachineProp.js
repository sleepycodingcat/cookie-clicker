/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class MachineProp extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./MachineProp/costumes/costume1.svg", {
        x: 44.68859499999999,
        y: 45.85200999999998,
      }),
    ];

    this.sounds = [new Sound("pop", "./MachineProp/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "machine prop" },
        this.whenIReceiveMachineProp
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
    ];

    this.vars.clones = 0;
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.vars.clones = 0;
    this.moveBehind();
  }

  *whenIReceiveMachineProp() {
    this.goto(-84, -68);
    this.visible = true;
    this.createClone();
    this.vars.clones++;
    this.createClone();
    while (true) {
      this.direction += 1;
      yield;
    }
  }

  *startAsClone() {
    this.goto(78, 67);
    while (true) {
      if (this.compare(this.vars.clones, 1) > 0) {
        this.deleteThisClone();
      }
      this.direction += 1;
      yield;
    }
  }
}
