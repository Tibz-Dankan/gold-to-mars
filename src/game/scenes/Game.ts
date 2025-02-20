// import { Scene } from "phaser";
// import { EventBus } from "../EventBus";

// export class Game extends Scene {
//   private rocket!: Phaser.Physics.Arcade.Sprite;
//   private lastX: number = 0;
//   private lastY: number = 0;
//   private lastUpdateTime: number = 0;
//   private earth!: Phaser.GameObjects.Image;
//   private mars!: Phaser.GameObjects.Image;
//   private direction = { x: 0, y: 0 }; // Stores the latest direction
//   private speedLimit: number = 20000 / 3.6; // Convert 20,000 km/hr to pixels per second
//   private currentSpeed: number = 0; // Stores current speed

//   constructor() {
//     super("Game");
//   }

//   create() {
//     const { width, height } = this.scale.gameSize;
//     const verticalPosition = height / 6; // Center of the first third of the screen

//     // Set background
//     const background = this.add.image(0, 0, "outer-space-1").setOrigin(0);
//     background.setDisplaySize(width, height);

//     // Add Earth and Mars
//     this.earth = this.add
//       .image(width * 0.15, verticalPosition, "earth")
//       .setScale(0.5);
//     this.mars = this.add
//       .image(width * 0.85, verticalPosition, "mars")
//       .setScale(0.5);

//     // Create the rocket
//     this.rocket = this.physics.add
//       .sprite(width * 0.2, verticalPosition, "rocket")
//       .setScale(0.5);
//     this.rocket.setCollideWorldBounds(true);

//     // Make the rocket initially point toward Mars
//     const angleToMars = Phaser.Math.Angle.Between(
//       this.rocket.x,
//       this.rocket.y,
//       this.mars.x,
//       this.mars.y
//     );
//     this.rocket.setRotation(angleToMars);

//     // Store initial position for speed calculation
//     this.lastX = this.rocket.x;
//     this.lastY = this.rocket.y;
//     this.lastUpdateTime = performance.now();

//     // Listen for direction change from virtual joystick
//     this.game.events.on("padMove", this.handlePadMove, this);

//     // Listen for acceleration control
//     EventBus.on(
//       "acceleration",
//       ({ acceleration }: { acceleration: number }) => {
//         this.handleAcceleration(acceleration);
//       }
//     );
//   }

//   /**
//    * Updates the direction of the rocket based on the joystick movement.
//    * This only controls the **direction** but does not alter the speed.
//    */
//   handlePadMove(direction: { x: number; y: number }) {
//     if (direction.x !== 0 || direction.y !== 0) {
//       this.direction = direction;
//       const angle = Phaser.Math.Angle.Between(0, 0, direction.x, direction.y);
//       this.rocket.setRotation(angle);
//     }
//   }

//   /**
//    * Updates the speed based on the acceleration input (0-100% of speed limit).
//    */
//   handleAcceleration(acceleration: number) {
//     this.currentSpeed = (acceleration / 100) * this.speedLimit;
//   }

//   update(_: number, delta: number) {
//     const currentTime = performance.now();

//     // Run the update logic only if at least 100ms have passed
//     if (currentTime - this.lastUpdateTime < 100) return;

//     const dt = delta / 1000; // Convert delta to seconds

//     if (dt === 0) return; // Avoid division by zero

//     // Apply speed and direction
//     this.rocket.setVelocity(
//       this.direction.x * this.currentSpeed,
//       this.direction.y * this.currentSpeed
//     );

//     // Calculate speed (distance per second)
//     const dx = this.rocket.x - this.lastX;
//     const dy = this.rocket.y - this.lastY;
//     const speed = Math.sqrt(dx * dx + dy * dy) / dt;

//     // Calculate distances to planets
//     const distanceToEarth = Phaser.Math.Distance.Between(
//       this.rocket.x,
//       this.rocket.y,
//       this.earth.x,
//       this.earth.y
//     );
//     const distanceToMars = Phaser.Math.Distance.Between(
//       this.rocket.x,
//       this.rocket.y,
//       this.mars.x,
//       this.mars.y
//     );

//     // Determine altitude
//     const altitude = Math.min(distanceToEarth, distanceToMars);
//     const planet = distanceToEarth === altitude ? "Earth" : "Mars";

//     // Emit real-time data
//     this.game.events.emit("rocketStatus", { speed, altitude, planet });
//     EventBus.emit("rocketStatus", { speed, altitude, planet });

//     // Update last position and time
//     this.lastX = this.rocket.x;
//     this.lastY = this.rocket.y;
//     this.lastUpdateTime = currentTime;
//   }
// }

import { Scene } from "phaser";
// import { EventBus } from "../EventBus";
export class Game extends Scene {
  constructor() {
    super("Game");
  }

  create() {
    // const { width, height } = this.scale.gameSize;

    // TODO: To become the scene controller based on rocket location and other events/actions
    this.scene.start("TakeOffScene");
  }
}
