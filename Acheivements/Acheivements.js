/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Acheivements extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("1", "./Acheivements/costumes/1.svg", {
        x: 108.68749237060547,
        y: 38.281768798828125,
      }),
      new Costume("2", "./Acheivements/costumes/2.svg", {
        x: 108.68749237060547,
        y: 40.8082389831543,
      }),
    ];

    this.sounds = [new Sound("Coin", "./Acheivements/sounds/Coin.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
    ];

    this.vars.ach1done = "no";
    this.vars.ach2done = "no";
  }

  *whenGreenFlagClicked() {
    this.vars.ach1done = "no";
    this.vars.ach2done = "no";
    this.visible = false;
    this.effects.clear();
    while (!(this.toString(this.vars.ach1done) === "yes")) {
      if (this.toNumber(this.stage.vars.score) === 1) {
        this.vars.ach1done = "yes";
        yield* this.showAchievement(1);
      }
      yield;
    }
    while (!(this.toString(this.vars.ach2done) === "yes")) {
      if (this.toNumber(this.stage.vars.upgrades) === 1) {
        this.vars.ach2done = "yes";
        yield* this.showAchievement(2);
      }
      yield;
    }
  }

  *showAchievement(achNo) {
    yield* this.startSound("Coin");
    this.effects.clear();
    this.costume = achNo;
    this.visible = true;
    yield* this.wait(1);
    for (let i = 0; i < 20; i++) {
      this.effects.ghost += 5;
      yield;
    }
    this.visible = false;
  }
}
