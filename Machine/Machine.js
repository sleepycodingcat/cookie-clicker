/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Machine extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Machine/costumes/costume1.svg", {
        x: 42.29129129129126,
        y: 35.78304303303304,
      }),
      new Costume("costume2", "./Machine/costumes/costume2.svg", {
        x: 47.96313082811696,
        y: 42.847299072520144,
      }),
    ];

    this.sounds = [new Sound("Click", "./Machine/sounds/Click.wav")];

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
    this.costume = "costume1";
    this.goto(-64, -44);
    while (true) {
      if (
        this.touching("mouse") &&
        this.mouse.down &&
        this.toNumber(this.stage.vars.click) === 1 &&
        this.toNumber(this.stage.vars.machines) === 0
      ) {
        while (!!this.mouse.down) {
          yield;
        }
        yield* this.startSound("Click");
        if (
          this.toNumber(this.stage.vars.score) === 300 ||
          this.compare(this.stage.vars.score, 300) > 0
        ) {
          this.stage.vars.machines++;
          this.stage.vars.upgrades++;
          this.stage.vars.score -= 300;
          this.broadcast("machine prop");
        } else {
          this.broadcast("Not enough");
        }
      }
      if (this.toNumber(this.stage.vars.machines) === 1) {
        this.costume = "costume2";
      }
      yield;
    }
  }

  *whenIReceiveOpenShop() {
    this.visible = true;
  }

  *whenIReceiveCloseShop() {
    this.visible = false;
  }
}
