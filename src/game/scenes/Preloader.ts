import { Scene } from "phaser";

export class Preloader extends Scene {
  constructor() {
    super("Preloader");
  }

  preload() {
    const { width, height } = this.sys.game.canvas;

    const centerX = width / 2;
    const centerY = height / 2;

    // Display a loading message
    this.add
      .text(centerX, centerY, "Loading...", { fontSize: "32px", color: "#fff" })
      .setOrigin(0.5);

    // Set the asset path
    this.load.setPath("assets");

    // Load game assets
    // Set the asset path
    this.load.image("fire", "fire.png"); // Load a flame texture
    this.load.image("earth", "earth.png");
    this.load.image("mars", "mars.png");
    this.load.image("rocket", "rocket.png");
    this.load.image("outer-space-1", "outer-space-1.png");
    this.load.image("gold", "gold.png");
    this.load.image("gold-2", "gold-2.png");
    // Load complete handler
    this.load.on("complete", () => {
      this.scene.start("Game"); // Switch to Game scene
    });
  }
}
