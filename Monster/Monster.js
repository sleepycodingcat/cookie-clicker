/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Monster extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Monster/costumes/costume1.svg", {
        x: 42.291290000000004,
        y: 35.783015000000006,
      }),
      new Costume("costume2", "./Monster/costumes/costume2.svg", {
        x: 47.96313000000001,
        y: 42.84729999999999,
      }),
    ];

    this.sounds = [new Sound("Click", "./Monster/sounds/Click.wav")];

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
    this.goto(44, -44);
    this.costume = "costume1";
    while (true) {
      if (
        this.touching("mouse") &&
        this.mouse.down &&
        this.toNumber(this.stage.vars.click) === 1 &&
        !(this.toNumber(this.stage.vars.monsters) === 4)
      ) {
        while (!!this.mouse.down) {
          yield;
        }
        yield* this.startSound("Click");
        if (
          this.toNumber(this.stage.vars.score) === 1000 ||
          this.compare(this.stage.vars.score, 1000) > 0
        ) {
          this.stage.vars.monsters++;
          this.stage.vars.upgrades++;
          this.stage.vars.score -= 1000;
          this.stage.vars.idmonster++;
          this.sprites["MonsterProp"].createClone();
        } else {
          this.broadcast("Not enough");
        }
      }
      if (this.toNumber(this.stage.vars.monsters) === 4) {
        this.costume = "costume1";
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
