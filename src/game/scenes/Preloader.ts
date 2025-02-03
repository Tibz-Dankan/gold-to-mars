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
    this.load.image("asset-name", "asset-name.extname");

    // Load complete handler
    this.load.on("complete", () => {
      this.scene.start("Game"); // Switch to Game scene
    });
  }
}
