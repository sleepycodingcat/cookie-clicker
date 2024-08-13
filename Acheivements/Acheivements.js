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
        x: 108.68749237060544,
        y: 38.2817687988281,
      }),
      new Costume("3", "./Acheivements/costumes/3.svg", {
        x: 108.68749,
        y: 38.281769999999995,
      }),
      new Costume("4", "./Acheivements/costumes/4.svg", {
        x: 108.68749,
        y: 38.281769999999995,
      }),
    ];

    this.sounds = [new Sound("Coin", "./Acheivements/sounds/Coin.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "ach1" }, this.whenIReceiveAch1),
      new Trigger(Trigger.BROADCAST, { name: "ach2" }, this.whenIReceiveAch2),
      new Trigger(Trigger.BROADCAST, { name: "ach3" }, this.whenIReceiveAch3),
      new Trigger(Trigger.BROADCAST, { name: "ach4" }, this.whenIReceiveAch4),
    ];

    this.vars.ach1done = "yes";
    this.vars.ach2done = "no";
    this.vars.ach3done = "no";
    this.vars.ach4done = "no";
  }

  *whenGreenFlagClicked() {
    this.goto(124, -139);
    this.vars.ach1done = "no";
    this.vars.ach2done = "no";
    this.vars.ach3done = "no";
    this.vars.ach4done = "no";
    this.visible = false;
    this.effects.clear();
    this.broadcast("ach1");
    this.broadcast("ach2");
    this.broadcast("ach3");
    this.broadcast("ach4");
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

  *whenIReceiveAch1() {
    while (!(this.toString(this.vars.ach1done) === "yes")) {
      if (this.toNumber(this.stage.vars.score) === 1) {
        this.vars.ach1done = "yes";
        yield* this.showAchievement(1);
      }
      yield;
    }
  }

  *whenIReceiveAch2() {
    while (!(this.toString(this.vars.ach2done) === "yes")) {
      if (this.toNumber(this.stage.vars.workers) === 1) {
        this.vars.ach2done = "yes";
        yield* this.showAchievement(2);
      }
      yield;
    }
  }

  *whenIReceiveAch3() {
    while (!(this.toString(this.vars.ach3done) === "yes")) {
      if (this.toNumber(this.stage.vars.machines) === 1) {
        this.vars.ach3done = "yes";
        yield* this.showAchievement(3);
      }
      yield;
    }
  }

  *whenIReceiveAch4() {
    while (!(this.toString(this.vars.ach4done) === "yes")) {
      if (this.toNumber(this.stage.vars.monsters) === 1) {
        this.vars.ach4done = "yes";
        yield* this.showAchievement(4);
      }
      yield;
    }
  }
}
