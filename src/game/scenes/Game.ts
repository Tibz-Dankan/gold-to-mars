import { Scene } from "phaser";
import { EventBus } from "../EventBus";

export class Game extends Scene {
  private rocket!: Phaser.Physics.Arcade.Sprite;
  private lastX: number = 0;
  private lastY: number = 0;
  private lastUpdateTime: number = 0;
  private earth!: Phaser.GameObjects.Image;
  private mars!: Phaser.GameObjects.Image;

  constructor() {
    super("Game");
  }

  create() {
    const { width, height } = this.scale.gameSize;

    // Set background
    const background = this.add.image(0, 0, "outer-space-1").setOrigin(0);
    background.setDisplaySize(width, height);

    // Add Earth and Mars
    this.earth = this.add
      .image(width * 0.15, height / 2, "earth")
      .setScale(0.5);
    this.mars = this.add.image(width * 0.85, height / 2, "mars").setScale(0.5);

    // Create the rocket
    this.rocket = this.physics.add
      .sprite(width * 0.2, height / 2, "rocket")
      .setScale(0.5);
    this.rocket.setCollideWorldBounds(true);

    // Make the rocket initially point toward Mars
    const angleToMars = Phaser.Math.Angle.Between(
      this.rocket.x,
      this.rocket.y,
      this.mars.x,
      this.mars.y
    );
    this.rocket.setRotation(angleToMars);

    // Store initial position for speed calculation
    this.lastX = this.rocket.x;
    this.lastY = this.rocket.y;
    this.lastUpdateTime = performance.now();

    this.game.events.on("padMove", this.handlePadMove, this);
    EventBus.on(
      "acceleration",
      ({ acceleration }: { acceleration: number }) => {
        console.log("acceleration:", acceleration);
      }
    );
  }

  handlePadMove(direction: { x: number; y: number }) {
    const acceleration = 150; // Increased for better movement
    this.rocket.setVelocity(
      direction.x * acceleration,
      direction.y * acceleration
    );
  }

  update() {
    const currentTime = performance.now();

    // Run the update logic only if at least 100ms have passed
    if (currentTime - this.lastUpdateTime < 100) return;

    const dt = (currentTime - this.lastUpdateTime) / 1000; // Convert to seconds

    if (dt === 0) return; // Avoid division by zero

    // Calculate speed (distance per second)
    const dx = this.rocket.x - this.lastX;
    const dy = this.rocket.y - this.lastY;
    const speed = Math.sqrt(dx * dx + dy * dy) / dt;

    // Calculate distances to planets
    const distanceToEarth = Phaser.Math.Distance.Between(
      this.rocket.x,
      this.rocket.y,
      this.earth.x,
      this.earth.y
    );
    const distanceToMars = Phaser.Math.Distance.Between(
      this.rocket.x,
      this.rocket.y,
      this.mars.x,
      this.mars.y
    );

    // Determine altitude
    const altitude = Math.min(distanceToEarth, distanceToMars);

    const planet = distanceToEarth === altitude ? "Earth" : "Mars";

    //  Emit real-time data
    this.game.events.emit("rocketStatus", { speed, altitude, planet });
    EventBus.emit("rocketStatus", { speed, altitude, planet });

    // Update last position and time
    this.lastX = this.rocket.x;
    this.lastY = this.rocket.y;
    this.lastUpdateTime = currentTime;
  }
}
