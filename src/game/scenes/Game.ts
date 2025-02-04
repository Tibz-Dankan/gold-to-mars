import { Scene } from "phaser";
import { EventBus } from "../EventBus";

export class Game extends Scene {
  private rocket!: Phaser.GameObjects.Image;

  constructor() {
    super("Game");
  }

  create() {
    const { width, height } = this.sys.game.canvas;

    // Set the background image to cover the entire game canvas
    const background = this.add.image(0, 0, "outer-space-1").setOrigin(0);
    background.setDisplaySize(width, height); // Stretch to fit canvas

    // Place Earth on the left side
    const earth = this.add
      .image(width * 0.2, height / 2, "earth")
      .setOrigin(0.5);

    // Place Mars on the right side
    const mars = this.add.image(width * 0.8, height / 2, "mars").setOrigin(0.5);

    // Place Rocket above Earth
    this.rocket = this.add
      .image(earth.x, earth.y - 100, "rocket")
      .setOrigin(0.5);
  }
}
