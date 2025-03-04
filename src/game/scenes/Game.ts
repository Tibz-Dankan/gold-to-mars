import { Scene } from "phaser";

export class Game extends Scene {
  constructor() {
    super("Game");
  }

  create() {
    // Ensure the control pad scene is always active
    this.scene.launch("ControlPadScene");
    this.scene.bringToTop("ControlPadScene");
    this.scene.start("GalaxyScene");
  }
}
