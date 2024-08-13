/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class GoldCookie extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Golden Cookie", "./GoldCookie/costumes/Golden Cookie.svg", {
        x: 30.285850524902344,
        y: 30.285850524902344,
      }),
    ];

    this.sounds = [
      new Sound("Magic Spell", "./GoldCookie/sounds/Magic Spell.wav"),
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked),
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    while (true) {
      yield* this.wait(this.random(50, 110));
      this.moveAhead();
      this.createClone();
      yield;
    }
  }

  *startAsClone() {
    this.visible = true;
    this.goto(this.random(-230, 230), this.random(-170, 170));
    for (let i = 0; i < 7; i++) {
      for (let i = 0; i < 5; i++) {
        this.direction += 3;
        yield;
      }
      for (let i = 0; i < 5; i++) {
        this.direction -= 3;
        yield;
      }
      yield;
    }
    yield* this.wait(0.3);
    this.visible = false;
  }

  *whenthisspriteclicked() {
    yield* this.startSound("Magic Spell");
    this.stage.vars.goldCookies++;
    this.stage.vars.score += 1000;
    this.visible = false;
  }
}
