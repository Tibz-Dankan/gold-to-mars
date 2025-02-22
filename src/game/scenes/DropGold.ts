import { Scene } from "phaser";
import { EventBus } from "../EventBus";

export class DropGoldScene extends Scene {
  private rocket!: Phaser.Physics.Arcade.Sprite;
  private mars!: Phaser.GameObjects.Image;
  private background!: Phaser.GameObjects.Image;
  private currentSpeed: number = 0;
  private speedLimit: number = 20000 / 3.6;
  private particleEmitter!: Phaser.GameObjects.Particles.ParticleEmitter;

  constructor() {
    super("DropGoldScene");
  }

  create() {
    const { width, height } = this.scale.gameSize;
    const verticalPosition = (height / 3) * 1.25;

    this.background = this.add.image(0, 0, "outer-space-1").setOrigin(0);
    this.background.setDisplaySize(width, height);

    this.mars = this.add
      .image(width * 0.85, verticalPosition, "mars")
      .setScale(1);

    // Initial position set to the center of the range (50%)
    const initialX = width * 0.5;
    const initialY = (height / 3) * 0.5;

    this.rocket = this.physics.add
      .sprite(initialX, initialY, "rocket")
      .setScale(0.25);
    this.rocket.setAngle(90);
    this.rocket.setCollideWorldBounds(true);
    this.rocket.body!.debugShowBody = false;

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

    EventBus.on(
      "acceleration",
      ({ acceleration }: { acceleration: number }) => {
        this.handleAcceleration(acceleration);
      }
    );

    EventBus.on("rocketLocation", this.handleRocketLocation, this);
  }

  handleAcceleration(acceleration: number) {
    const speedKmH = (acceleration / 100) * this.speedLimit;
    const pixelsPerFrame = (speedKmH / 3600) * 25;
    this.currentSpeed = pixelsPerFrame;
  }

  private handleRocketLocation(rocketLocation: {
    location: string;
    isApproachingEarth: boolean;
    isApproachingMars: boolean;
    distanceToEarthKm: number;
    distanceToMarsKm: number;
    distanceFromEarthToMarsKm: number;
  }) {
    const { width } = this.scale.gameSize;

    // Calculate the percentage position within the allowed range (15% to 85% of width)
    const rocketLocationPercentage =
      ((rocketLocation.distanceFromEarthToMarsKm -
        rocketLocation.distanceToMarsKm * 10) /
        rocketLocation.distanceFromEarthToMarsKm) *
      100;

    const minX = width * 0.15; // 15% of screen width
    const maxX = width * 0.85; // 85% of screen width

    // Interpolate rocket position based on travel progress
    this.rocket.x = minX + (rocketLocationPercentage / 100) * (maxX - minX);
    // console.log("this.rocket.x: ", this.rocket.x);
  }

  update(_: number, __: number) {
    let velocityX = this.currentSpeed;
    let velocityY = 0;

    this.rocket.setVelocity(velocityX, velocityY);
    this.updateParticlePosition(); // Update flame position
  }

  private updateParticlePosition() {
    const rocketBottomY = this.rocket.y + this.rocket.displayHeight / 2;
    const halfRocketHeight = this.rocket.displayHeight / 2;

    this.particleEmitter.setPosition(
      this.rocket.x - halfRocketHeight - 4, // Shift left
      rocketBottomY - halfRocketHeight // Move up
    );

    this.particleEmitter.setAngle(
      this.rocket.rotation * Phaser.Math.RAD_TO_DEG
    );
  }
}
