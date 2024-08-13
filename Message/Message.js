/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Message extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Message/costumes/costume1.svg", {
        x: 36.91593140121549,
        y: -155.62964172840117,
      }),
      new Costume("costume2", "./Message/costumes/costume2.svg", {
        x: 162.00366953287076,
        y: -149.17306557527388,
      }),
    ];

    this.sounds = [new Sound("pop", "./Message/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Not enough" },
        this.whenIReceiveNotEnough
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "buy maximum" },
        this.whenIReceiveBuyMaximum
      ),
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.goto(0, 0);
  }

  *whenIReceiveNotEnough() {
    this.costume = "costume1";
    for (let i = 0; i < 3; i++) {
      yield* this.wait(0.3);
      this.visible = true;
      yield* this.wait(0.3);
      this.visible = false;
      yield;
    }
  }

  *whenIReceiveBuyMaximum() {
    this.costume = "costume2";
    for (let i = 0; i < 3; i++) {
      yield* this.wait(0.3);
      this.visible = true;
      yield* this.wait(0.3);
      this.visible = false;
      yield;
    }
  }
}
