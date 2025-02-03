import Phaser from "phaser";

export class FireScene extends Phaser.Scene {
  constructor() {
    super("FireScene");
  }

  //   preload() {
  //     // Set the asset path
  //     this.load.setPath("assets");
  //     this.load.image("fire", "fire.png"); // Load a flame texture
  //   }

  create() {
    // const emitter = this.add.particles(0, 0, "fire", {
    this.add.particles(0, 0, "fire", {
      x: this.cameras.main.width / 2,
      y: this.cameras.main.height - 50, // Position flame at bottom
      lifespan: { min: 600, max: 1000 }, // How long particles last
      speedY: { min: 50, max: 100 }, // Move downward
      scale: { start: 1.5, end: 0.3 }, // Shrink over time
      alpha: { start: 1, end: 0 }, // Fade out effect
      blendMode: "ADD", // Glow effect
      frequency: 20, // How often particles spawn
      quantity: 5, // More particles per cycle
      gravityY: 30, // Force pulling particles down
      tint: [0xff4500, 0xffa500, 0xffff00], // Fire colors (red-orange-yellow)
    });
  }
}
