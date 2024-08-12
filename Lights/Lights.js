/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Lights extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Lights/costumes/costume1.svg", {
        x: 103.99302999999998,
        y: 107.60000499999998,
      }),
    ];

    this.sounds = [new Sound("pop", "./Lights/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
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

  *whenGreenFlagClicked() {
    this.direction = 90;
    this.goto(this.sprites["Cookie"].x, this.sprites["Cookie"].y);
    this.effects.ghost = 50;
    this.moveBehind();
    this.createClone();
    while (true) {
      this.goto(this.sprites["Cookie"].x, this.sprites["Cookie"].y);
      this.direction += 1;
      yield;
    }
  }

  *startAsClone() {
    while (true) {
      this.goto(this.sprites["Cookie"].x, this.sprites["Cookie"].y);
      this.direction -= 1;
      yield;
    }
  }

  *whenIReceiveOpenShop() {
    /* TODO: Implement stop other scripts in sprite */ null;
    this.deleteThisClone();
  }

  *whenIReceiveCloseShop() {
    this.direction = 90;
    this.goto(this.sprites["Cookie"].x, this.sprites["Cookie"].y);
    this.effects.ghost = 50;
    this.moveBehind();
    this.createClone();
    while (true) {
      this.goto(this.sprites["Cookie"].x, this.sprites["Cookie"].y);
      this.direction += 1;
      yield;
    }
  }
}
