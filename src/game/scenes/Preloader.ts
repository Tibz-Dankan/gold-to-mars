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
    // this.load.audio(
    //   "ambientSound001",
    //   "sound/ambient-soundscapes-001-space-atmosphere.mp3"
    // );
    // this.load.audio(
    //   "ambientSound003",
    //   "sound/ambient-soundscapes-003-space-atmosphere.mp3"
    // );
    // this.load.audio(
    //   "ambientSound004",
    //   "sound/ambient-soundscapes-004-space-atmosphere.mp3"
    // );
    this.load.audio(
      "ambientSound007",
      "sound/ambient-soundscapes-007-space-atmosphere.mp3"
    );
    // this.load.audio(
    //   "interstellarTurbulenceSound",
    //   "sound/interstellar-turbulence-galactic-roar-fnx-sound.mp3"
    // );
    // this.load.audio(
    //   "burningRocketSound",
    //   "sound/fx-looking-straight-into-a-burning-rocket-engine.mp3"
    // );
    this.load.audio("explosionSound", "sound/bad-explosion.mp3");
    this.load.audio("blockSound", "sound/block.mp3");

    // Load complete handler
    this.load.on("complete", () => {
      this.scene.start("Game"); // Switch to Game scene
    });
  }
}
