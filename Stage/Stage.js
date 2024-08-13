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

    this.sounds = [new Sound("music", "./Stage/sounds/music.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
    ];

    this.vars.speed = 0;
    this.vars.score = 12;
    this.vars.workers = 0;
    this.vars.machines = 0;
    this.vars.monsters = 0;
    this.vars.click = 0;
    this.vars.upgrades = 0;
    this.vars.idworker = 0;
    this.vars.goldCookies = 0;

    this.watchers.workers = new Watcher({
      label: "workers",
      style: "large",
      visible: false,
      value: () => this.vars.workers,
      x: 282,
      y: 17,
    });
    this.watchers.machines = new Watcher({
      label: "machines",
      style: "large",
      visible: false,
      value: () => this.vars.machines,
      x: 392,
      y: 17,
    });
    this.watchers.monsters = new Watcher({
      label: "monsters",
      style: "large",
      visible: false,
      value: () => this.vars.monsters,
      x: 498,
      y: 18,
    });
  }

  *whenGreenFlagClicked() {
    this.vars.workers = 0;
    this.vars.monsters = 0;
    this.vars.machines = 0;
    this.vars.upgrades = 0;
    this.vars.goldCookies = 0;
    while (true) {
      this.vars.score += this.toNumber(this.vars.workers);
      this.vars.score += this.toNumber(this.vars.monsters) * 50;
      if (this.toNumber(this.vars.machines) === 1) {
        this.vars.score += this.toNumber(this.vars.monsters) * 50;
        this.vars.score += this.toNumber(this.vars.workers);
      }
      yield* this.wait(1);
      yield;
    }
  }

  *whenGreenFlagClicked2() {
    while (true) {
      yield* this.playSoundUntilDone("music");
      yield;
    }
  }
}
