import { Scene } from "phaser";
import { EventBus } from "../EventBus";

export class SpaceScene extends Scene {
  private rocket!: Phaser.GameObjects.Image; // Reference to the rocket
  private particleEmitter!: Phaser.GameObjects.Particles.ParticleEmitter;
  private stars!: Phaser.GameObjects.Arc[]; // Using Arc for color customization
  private currentSpeed: number = 0;
  private speedLimit: number = 20000; // Adjust as needed

  constructor() {
    super("SpaceScene");
  }

  create() {
    this.renderSpace(); // Initialize moving stars

    // Add rocket positioned at the bottom of the first third of the screen
    const rocketX = this.scale.width / 2; // Center horizontally
    const rocketY = (this.scale.height / 3) * 0.5; // Bottom of the first third vertically
    this.rocket = this.add.image(rocketX, rocketY, "rocket").setScale(0.25);
    this.rocket.setOrigin(0.5); // Center origin for the rocket
    this.rocket.setAngle(90); // Facing towards the right

    const particles = this.add.particles(0, 0, "fire", {
      lifespan: { min: 600, max: 1000 },
      speedY: { min: 50, max: 100 },
      scale: { start: 0.125, end: 0.015 },
      alpha: { start: 1, end: 0 },
      blendMode: "ADD",
      frequency: 20,
      quantity: 5,
      gravityY: 30,
      tint: [0xff4500, 0xffa500, 0xffff00],
    });

    this.particleEmitter = particles;
    this.updateParticlePosition(); // Initial position

    // Listen for acceleration events
    EventBus.on(
      "acceleration",
      ({ acceleration }: { acceleration: number }) => {
        this.handleAcceleration(acceleration);
      }
    );
  }

  renderSpace() {
    const { width, height } = this.scale.gameSize;

    // Ensure a solid black background
    this.add.rectangle(0, 0, width, height, 0x000000).setOrigin(0);

    // Create stars with realistic Earth-view colors
    this.stars = [];
    const totalStars = 200;

    for (let i = 0; i < totalStars; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 2;

      let color: number;
      const rand = Math.random();

      if (rand < 0.55) {
        color = 0xffffff; // ⚪ White (55%)
      } else if (rand < 0.85) {
        color = 0xfff5e1; // 🟡⚪ Yellow-White (30%)
      } else if (rand < 0.95) {
        color = 0xffa500; // 🟠 Orange (10%)
      } else if (rand < 0.99) {
        color = 0x87ceeb; // 🔵 Blue (4%)
      } else {
        color = 0xff0000; // 🔴 Red (1%)
      }

      const star = this.add.circle(x, y, size, color);
      this.stars.push(star);
    }
  }

  private updateParticlePosition() {
    const rocketBottomY = this.rocket.y + this.rocket.displayHeight / 2;
    const halfRocketHeight = this.rocket.displayHeight / 2;

    this.particleEmitter.setPosition(
      this.rocket.x - halfRocketHeight - 4,
      rocketBottomY - halfRocketHeight
    );

    this.particleEmitter.setAngle(1.57 * Phaser.Math.RAD_TO_DEG);
  }

  private handleAcceleration(acceleration: number) {
    const speedKmH = (acceleration / 100) * this.speedLimit;
    const pixelsPerFrame = (speedKmH / 3600) * 0.05; // Convert to pixels per frame
    this.currentSpeed = pixelsPerFrame;
  }

  update() {
    this.moveStars();
  }

  private moveStars() {
    const screenWidth = this.scale.width;

    this.stars.forEach((star) => {
      star.x -= this.currentSpeed; // Move stars left based on acceleration speed

      // Reset star if it moves off-screen
      if (star.x < 0) {
        star.x = screenWidth;
        star.y = Math.random() * this.scale.height;
      }
    });
  }
}
