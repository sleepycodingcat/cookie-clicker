/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Cookie extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Cookie2", "./Cookie/costumes/Cookie2.png", { x: 32, y: 31 }),
    ];

    this.sounds = [new Sound("Click", "./Cookie/sounds/Click.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "game loop" },
        this.whenIReceiveGameLoop
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
    ];
  }

  *bounceToSizeForce(targetSize, force) {
    this.stage.vars.speed =
      this.toNumber(this.stage.vars.speed) * 0.9 + this.toNumber(force);
    this.size += this.toNumber(this.stage.vars.speed);
    if (
      this.compare(
        this.compare(this.size, targetSize) > 0,
        this.compare(force, 0) > 0
      ) === 0
    ) {
      this.size = this.toNumber(targetSize);
      this.stage.vars.speed = -0.8 * this.toNumber(this.stage.vars.speed);
      if (this.compare(Math.abs(this.toNumber(this.stage.vars.speed)), 4) < 0) {
        this.stage.vars.speed = 0;
      }
    }
  }

  *whenGreenFlagClicked() {
    this.stage.vars.score = 0;
    this.size = 350;
    this.goto(0, 0);
    this.broadcast("game loop");
    this.createClone();
  }

  *whenIReceiveGameLoop() {
    while (true) {
      if (this.touching("mouse")) {
        yield* this.bounceToSizeForce(425, 2);
        if (this.mouse.down) {
          yield* this.startSound("Click");
          this.size += 20;
          while (!!this.mouse.down) {
            yield;
          }
          this.stage.vars.score++;
          this.size -= 20;
        }
      } else {
        yield* this.bounceToSizeForce(350, -2);
      }
      yield;
    }
  }

  *startAsClone() {
    this.size = 100;
    this.goto(0, 97);
  }
}
