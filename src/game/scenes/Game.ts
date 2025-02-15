// import { Scene } from "phaser";
// import { EventBus } from "../EventBus";

// export class Game extends Scene {
//   private rocket!: Phaser.Physics.Arcade.Sprite;

//   constructor() {
//     super("Game");
//   }

//   create() {
//     const { width, height } = this.scale.gameSize;

//     // Set background
//     const background = this.add.image(0, 0, "outer-space-1").setOrigin(0);
//     background.setDisplaySize(width, height);

//     // Add Earth and Mars
//     const earth = this.add
//       .image(width * 0.15, height / 2, "earth")
//       .setScale(0.5);
//     const mars = this.add.image(width * 0.85, height / 2, "mars").setScale(0.5);

//     // Create the rocket
//     this.rocket = this.physics.add
//       .sprite(width * 0.2, height / 2, "rocket")
//       .setScale(0.5);
//     this.rocket.setCollideWorldBounds(true);

//     // Listen to pad movement events from React
//     EventBus.on("padMove", this.handlePadMove, this);
//   }

//   handlePadMove(direction: { x: number; y: number }) {
//     const acceleration = 1.2;
//     this.rocket.setVelocity(
//       direction.x * acceleration,
//       direction.y * acceleration
//     );
//     this.rocket.rotation = Math.atan2(direction.y, direction.x);
//   }
// }

// import { Scene } from "phaser";
// import { EventBus } from "../EventBus";

// export class Game extends Scene {
//   private rocket!: Phaser.Physics.Arcade.Sprite;

//   constructor() {
//     super("Game");
//   }

//   create() {
//     const { width, height } = this.scale.gameSize;

//     // Set background
//     const background = this.add.image(0, 0, "outer-space-1").setOrigin(0);
//     background.setDisplaySize(width, height);

//     // Add Earth and Mars
//     const earth = this.add
//       .image(width * 0.15, height / 2, "earth")
//       .setScale(0.5);
//     const mars = this.add.image(width * 0.85, height / 2, "mars").setScale(0.5);

//     // Create the rocket
//     this.rocket = this.physics.add
//       .sprite(width * 0.2, height / 2, "rocket")
//       .setScale(0.5);
//     this.rocket.setCollideWorldBounds(true);

//     // Make the rocket initially point toward Mars
//     const angleToMars = Phaser.Math.Angle.Between(
//       this.rocket.x,
//       this.rocket.y,
//       mars.x,
//       mars.y
//     );
//     this.rocket.setRotation(angleToMars);

//     // Listen to pad movement events from React
//     EventBus.on("padMove", this.handlePadMove, this);
//   }

//   handlePadMove(direction: { x: number; y: number }) {
//     const acceleration = 1.2;
//     this.rocket.setVelocity(
//       direction.x * acceleration,
//       direction.y * acceleration
//     );
//   }
// }

import { Scene } from "phaser";
import { EventBus } from "../EventBus";

export class Game extends Scene {
  private rocket!: Phaser.Physics.Arcade.Sprite;

  constructor() {
    super("Game");
  }

  create() {
    const { width, height } = this.scale.gameSize;

    // Set background
    const background = this.add.image(0, 0, "outer-space-1").setOrigin(0);
    background.setDisplaySize(width, height);

    // Add Earth and Mars
    const earth = this.add
      .image(width * 0.15, height / 2, "earth")
      .setScale(0.5);
    const mars = this.add.image(width * 0.85, height / 2, "mars").setScale(0.5);

    // Create the rocket
    this.rocket = this.physics.add
      .sprite(width * 0.2, height / 2, "rocket")
      .setScale(0.5);
    this.rocket.setCollideWorldBounds(true);

    // Make the rocket initially point toward Mars
    const angleToMars = Phaser.Math.Angle.Between(
      this.rocket.x,
      this.rocket.y,
      mars.x,
      mars.y
    );
    this.rocket.setRotation(angleToMars);

    // Listen to pad movement events from PadControlScene
    EventBus.on("padMove", this.handlePadMove, this);
  }

  handlePadMove(direction: { x: number; y: number }) {
    const acceleration = 1.2;
    this.rocket.setVelocity(
      direction.x * acceleration,
      direction.y * acceleration
    );
  }
}
