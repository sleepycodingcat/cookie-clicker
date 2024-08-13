/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class MonsterProp extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./MonsterProp/costumes/costume1.svg", {
        x: 40.03915100287037,
        y: 27.274558600000006,
      }),
      new Costume("costume2", "./MonsterProp/costumes/costume2.svg", {
        x: 40.03915200574073,
        y: 27.274552199999988,
      }),
      new Costume("costume3", "./MonsterProp/costumes/costume3.svg", {
        x: 40.03915300861112,
        y: 27.274555799999973,
      }),
      new Costume("costume4", "./MonsterProp/costumes/costume4.svg", {
        x: 40.03915401148154,
        y: 27.274549399999955,
      }),
    ];

    this.sounds = [new Sound("Click", "./MonsterProp/sounds/Click.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.goto(44, -44);
    this.stage.vars.idmonster = 0;
  }

  *startAsClone() {
    this.visible = true;
    if (this.toNumber(this.stage.vars.idmonster) === 1) {
      this.goto(190, 119);
    }
    if (this.toNumber(this.stage.vars.idmonster) === 2) {
      this.goto(190, 55);
    }
    if (this.toNumber(this.stage.vars.idmonster) === 3) {
      this.goto(190, -10);
    }
    if (this.toNumber(this.stage.vars.idmonster) === 4) {
      this.goto(190, -80);
    }
    while (true) {
      this.costume = "costume1";
      yield* this.wait(0.1);
      this.costume = "costume2";
      yield* this.wait(0.1);
      this.costume = "costume3";
      yield* this.wait(0.1);
      this.costume = "costume4";
      yield* this.wait(0.1);
      yield;
    }
  }
}
