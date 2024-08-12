/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Cookie2 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("cookie", "./Cookie2/costumes/cookie.svg", {
        x: 79,
        y: 84.5,
      }),
    ];

    this.sounds = [new Sound("Coin", "./Cookie2/sounds/Coin.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "click" }, this.whenIReceiveClick),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
    ];

    this.vars.speedY = 0;
  }

  *whenGreenFlagClicked() {
    this.vars.speedY = 0;
    this.visible = false;
    this.size = 10;
  }

  *whenIReceiveClick() {
    yield* this.wait(0.1);
    this.createClone();
  }

  *startAsClone() {
    this.effects.clear();
    this.vars.speedY = 0;
    this.moveAhead();
    this.visible = true;
    this.goto(this.mouse.x, this.mouse.y);
    this.direction = this.random(-90, 90);
    for (let i = 0; i < 2; i++) {
      this.y += this.toNumber(this.vars.speedY);
      this.vars.speedY++;
      this.move(3);
      yield;
    }
    for (let i = 0; i < 5; i++) {
      this.y += this.toNumber(this.vars.speedY);
      this.vars.speedY -= 2;
      this.effects.ghost += 5;
      yield;
    }
    this.deleteThisClone();
  }
}
