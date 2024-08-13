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
      new Costume("Cookie2", "./Cookie/costumes/Cookie2.svg", {
        x: 16,
        y: 15.5,
      }),
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
      new Trigger(
        Trigger.BROADCAST,
        { name: "open shop" },
        this.whenIReceiveOpenShop
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "close shop" },
        this.whenIReceiveCloseShop
      ),
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
  }

  *whenIReceiveGameLoop() {
    while (true) {
      if (this.touching("mouse")) {
        yield* this.bounceToSizeForce(425, 2);
        if (this.mouse.down) {
          yield* this.startSound("Click");
          this.size += 20;
          this.broadcast("click");
          this.createClone();
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
    this.size = 80;
    if (this.compare(this.size, 80) > 0) {
      this.deleteThisClone();
    }
    this.effects.ghost = 10;
    this.moveBehind();
    this.direction = this.random(0, 360);
    this.goto(this.random(-230, 230), 170);
    while (!(this.compare(-30, this.y) > 0)) {
      this.y -= 10;
      this.effects.ghost += 4;
      if (this.compare(this.size, 80) > 0) {
        this.deleteThisClone();
      }
      yield;
    }
    this.deleteThisClone();
  }

  *whenIReceiveOpenShop() {
    /* TODO: Implement stop other scripts in sprite */ null;
    this.moveBehind(2);
  }

  *whenIReceiveCloseShop() {
    this.broadcast("game loop");
  }
}
