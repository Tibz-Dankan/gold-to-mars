import { Scene } from "phaser";
import { EventBus } from "../EventBus";

export class TakeOffScene extends Scene {
  private rocket!: Phaser.Physics.Arcade.Sprite;
  private earth!: Phaser.GameObjects.Image;
  private background!: Phaser.GameObjects.Image;
  private currentSpeed: number = 0;
  private speedLimit: number = 20000 / 3.6;
  private isTakingOff: boolean = false;
  private takeOffStartTime: number = 0;
  private particleEmitter!: Phaser.GameObjects.Particles.ParticleEmitter;
  //   private previousRotation: number = 0; // Track previous rotation

  constructor() {
    super("TakeOffScene");
  }

  create() {
    const { width, height } = this.scale.gameSize;
    const verticalPosition = height * (2 / 3);

    this.background = this.add.image(0, 0, "outer-space-1").setOrigin(0);
    this.background.setDisplaySize(width, height);

    this.earth = this.add
      .image(width * 0.15, verticalPosition, "earth")
      .setScale(1);

    this.rocket = this.physics.add
      .sprite(this.earth.x, verticalPosition - 50, "rocket")
      .setScale(0.25);
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

    EventBus.on("takeOff", ({ takeOff }: { takeOff: boolean }) => {
      if (takeOff) {
        this.isTakingOff = true;
        this.takeOffStartTime = this.time.now;
      }
    });

    EventBus.on(
      "acceleration",
      ({ acceleration }: { acceleration: number }) => {
        this.handleAcceleration(acceleration);
      }
    );
  }

  handleAcceleration(acceleration: number) {
    const speedKmH = (acceleration / 100) * this.speedLimit;
    const pixelsPerFrame = (speedKmH / 3600) * 25;
    this.currentSpeed = pixelsPerFrame;
  }

  //   update(time: number, delta: number) {
  update(time: number, _: number) {
    if (!this.isTakingOff) return;

    const elapsed = time - this.takeOffStartTime;

    let velocityX = 0;
    let velocityY = 0;

    if (elapsed < 4000) {
      velocityY = -this.currentSpeed;
    } else if (elapsed < 7000) {
      const progress = (elapsed - 4000) / 3000;
      const angle = Phaser.Math.Interpolation.Linear([-90, 0], progress);
      this.rocket.setRotation(Phaser.Math.DegToRad(angle));

      velocityX = this.currentSpeed * progress;
      velocityY = -this.currentSpeed * (1 - progress);
    } else {
      velocityX = this.currentSpeed;
    }

    this.rocket.setVelocity(velocityX, velocityY);
    this.updateParticlePosition(); // Update flame position

    if (velocityX !== 0 || velocityY !== 0) {
      const angleRad = Math.atan2(velocityY, velocityX);
      this.rocket.setRotation(angleRad + Math.PI / 2); // Offset by 90 degrees to align top
    }
  }

  private updateParticlePosition() {
    const rocketBottomY = this.rocket.y + this.rocket.displayHeight / 2;
    const halfRocketHeight = this.rocket.displayHeight / 2;
    const rocketRotationAngleStr = this.rocket.rotation.toString();

    const hasRotated90Deg = rocketRotationAngleStr.startsWith("1.5");

    // if (this.previousRotation !== this.rocket.rotation) {
    if (hasRotated90Deg) {
      //   this.previousRotation = this.rocket.rotation; // Update previous rotation

      // Position the flame upward by half the rocket's height and left by half the rocket's height only when direction changes
      this.particleEmitter.setPosition(
        this.rocket.x - halfRocketHeight - 4, // Shift left
        rocketBottomY - halfRocketHeight // Move up
      );
    } else {
      // Position the flame normally when direction hasn't changed
      this.particleEmitter.setPosition(this.rocket.x, rocketBottomY + 4); // Regular position
    }

    this.particleEmitter.setAngle(
      this.rocket.rotation * Phaser.Math.RAD_TO_DEG
    );
  }
}
