/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Shop extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Shop/costumes/costume1.svg", {
        x: 254.39999389648438,
        y: -116.51996153114317,
      }),
      new Costume("costume2", "./Shop/costumes/costume2.svg", {
        x: 274.399995,
        y: 19.60000500000001,
      }),
      new Costume("costume3", "./Shop/costumes/costume3.svg", {
        x: 254.399995,
        y: -116.5199576346588,
      }),
    ];

    this.sounds = [new Sound("Click", "./Shop/sounds/Click.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "close shop" },
        this.whenIReceiveCloseShop
      ),
    ];
  }

  *whenGreenFlagClicked() {
    this.goto(0, 0);
    this.costume = "costume1";
    while (true) {
      if (
        this.touching("mouse") &&
        this.mouse.down &&
        this.costumeNumber === 1
      ) {
        while (!!this.mouse.down) {
          yield;
        }
        yield* this.startSound("Click");
        this.costume = "costume2";
        this.createClone();
        this.broadcast("open shop");
      }
      yield;
    }
  }

  *startAsClone() {
    this.visible = true;
    this.moveAhead();
    this.costume = "costume3";
    while (true) {
      if (this.touching("mouse") && this.mouse.down) {
        while (!!this.mouse.down) {
          yield;
        }
        this.broadcast("close shop");
        yield* this.startSound("Click");
        this.deleteThisClone();
      }
      yield;
    }
  }

  *whenIReceiveCloseShop() {
    this.costume = "costume1";
  }
}
