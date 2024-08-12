/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Workers extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Workers/costumes/costume1.svg", {
        x: 42.29129129129126,
        y: 35.78304303303304,
      }),
    ];

    this.sounds = [new Sound("Click", "./Workers/sounds/Click.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
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

  *whenGreenFlagClicked() {
    this.visible = false;
    this.goto(-172, -44);
    this.stage.vars.click = 0;
    while (true) {
      if (
        this.touching("mouse") &&
        this.mouse.down &&
        this.toNumber(this.stage.vars.click) === 1
      ) {
        while (!!this.mouse.down) {
          yield;
        }
        yield* this.startSound("Click");
        if (
          this.toNumber(this.stage.vars.score) === 50 ||
          this.compare(this.stage.vars.score, 50) > 0
        ) {
          this.stage.vars.workers++;
          this.stage.vars.upgrades++;
          this.stage.vars.score -= 50;
        } else {
          this.broadcast("Not enough");
        }
      }
      yield;
    }
  }

  *whenIReceiveOpenShop() {
    this.visible = true;
    this.stage.vars.click = 1;
  }

  *whenIReceiveCloseShop() {
    this.visible = false;
    this.stage.vars.click = 0;
  }
}
