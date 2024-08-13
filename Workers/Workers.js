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
        x: 42.291290000000004,
        y: 35.78304499999999,
      }),
      new Costume("costume2", "./Workers/costumes/costume2.svg", {
        x: 47.96313000000001,
        y: 42.84728999999999,
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
    this.costume = "costume1";
    this.goto(-172, -44);
    this.rotationStyle = Sprite.RotationStyle.LEFT_RIGHT;
    this.stage.vars.click = 0;
    while (true) {
      if (
        this.touching("mouse") &&
        this.mouse.down &&
        this.toNumber(this.stage.vars.click) === 1 &&
        !(this.toNumber(this.stage.vars.workers) === 5)
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
          this.stage.vars.idworker++;
          this.sprites["WorkerProp"].createClone();
        } else {
          if (this.toNumber(this.stage.vars.workers) === 5) {
            this.broadcast("buy maximum");
          } else {
            this.broadcast("Not enough");
          }
        }
      }
      if (this.toNumber(this.stage.vars.workers) === 5) {
        this.costume = "costume2";
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
