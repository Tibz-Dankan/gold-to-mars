import { Scene } from "phaser";
import { EventBus } from "../EventBus";
import { TPlanet } from "../../types/planet";

export class GalaxyScene extends Scene {
  private rocket!: Phaser.Physics.Arcade.Sprite;
  private mars!: Phaser.GameObjects.Image;
  private earth!: Phaser.GameObjects.Image;
  private currentRocketSpeed: number = 0;
  private currentStarsSpeed: number = 0;
  private speedLimit: number = 20000 / 3.6;
  private particleEmitter!: Phaser.GameObjects.Particles.ParticleEmitter;
  private stars!: Phaser.GameObjects.Arc[]; // Using Arc for color customization
  private galaxyWidthScaler: number = 0;
  private earthPositionX: number = 0;
  private earthPositionY: number = 0;
  private marsPositionX: number = 0;
  private marsPositionY: number = 0;
  private rocketPositionX: number = 0;
  private rocketPositionY: number = 0;

  constructor() {
    super("GalaxyScene");
  }

  create() {
    // Scale the game world to 5 times the screen size
    const { width, height } = this.scale.gameSize;

    const worldWidth = this.scale.gameSize.width * 5;
    const worldHeight = this.scale.gameSize.height * 5;

    // this.galaxyWidthScaler = (width * 0.8) / 268;
    this.galaxyWidthScaler = (width * 0.5) / 268;

    // Set world bounds
    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);
    this.physics.world.setBounds(0, 0, worldWidth, worldHeight);

    this.renderSpace(worldWidth, worldHeight); // Pass updated size to renderSpace()

    // Initial position set to the center of the range (50%)
    const initialX = width * 0.5;
    const initialY = (height / 3) * 0.5;

    const centerX = (width * 0.5 * 5) / 2;
    const centerY = height / 2;

    // this.rocket = this.physics.add
    //   .sprite(initialX, initialY, "rocket")
    //   .setScale(0.25);
    // this.rocket = this.physics.add
    //   .sprite(centerX, centerY, "rocket")
    //   .setScale(0.25);
    this.rocket = this.physics.add
      .sprite(this.rocketPositionX, this.rocketPositionY, "rocket")
      .setScale(0.25);
    this.rocket.setAngle(90);
    this.rocket.setCollideWorldBounds(true);
    this.rocket.body!.debugShowBody = false;

    // Set camera follow on the rocket
    // this.cameras.main.startFollow(this.rocket, true, 0.05, 0.05);
    this.cameras.main.startFollow(this.rocket, false, 1, 1);

    // this.renderSpace(); // Initialize moving stars

    // this.mars = this.add
    //   .image(width * 0.85, verticalPosition, "mars")
    //   .setScale(1);
    this.mars = this.add
      .image(this.marsPositionX, this.marsPositionY, "mars")
      .setScale(1);

    this.earth = this.add
      .image(this.earthPositionX, this.earthPositionY, "earth")
      .setScale(1);

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

    // EventBus.on("padMove", this.handlePadMove);
    EventBus.on("padMove", (direction: { x: number; y: number }) =>
      this.handlePadMove(direction)
    );

    EventBus.on("acceleration", ({ acceleration }: { acceleration: number }) =>
      this.handleAcceleration(acceleration)
    );

    // EventBus.on("planetPosition", this.handlePlanetPosition);
    EventBus.on("planetPosition", (position: TPlanet["planetPosition"]) =>
      this.handlePlanetPosition(position)
    );
  }

  handleAcceleration(acceleration: number) {
    const speedKmH = (acceleration / 100) * this.speedLimit;
    const rocketPixelsPerFrame = (speedKmH / 3600) * 0.005; //0.005 pixels per second
    const starsPixelsPerFrame = (speedKmH / 3600) * 0.03125;
    this.currentRocketSpeed = rocketPixelsPerFrame * this.galaxyWidthScaler * 5;
    this.currentStarsSpeed = starsPixelsPerFrame;
  }

  handlePadMove = (direction: { x: number; y: number }) => {
    // Calculate magnitude (length) of direction vector
    const magnitude = Math.sqrt(direction.x ** 2 + direction.y ** 2);

    // Normalize direction vector to unit length
    const unitDirection =
      magnitude === 0
        ? { x: 0, y: 0 }
        : { x: direction.x / magnitude, y: direction.y / magnitude };

    // // Set rocket velocity using the normalized direction
    // this.rocket.setVelocity(
    //   unitDirection.x * this.currentRocketSpeed,
    //   unitDirection.y * this.currentRocketSpeed
    // );

    // Only update rotation if there is movement
    if (magnitude > 0) {
      // Calculate angle in radians and convert to degrees
      const angle = Phaser.Math.RadToDeg(
        Math.atan2(unitDirection.y, unitDirection.x)
      );

      // Adjust by adding 90 degrees so the rocket faces the movement direction correctly
      this.rocket.setAngle(angle + 90);
    }
  };

  handlePlanetPosition(position: TPlanet["planetPosition"]) {
    this.earthPositionX = position.earthPositionX * this.galaxyWidthScaler * 5;
    this.earthPositionY = position.earthPositionY * this.galaxyWidthScaler * 5;
    this.marsPositionX = position.marsPositionX * this.galaxyWidthScaler * 5;
    this.marsPositionY = position.marsPositionY * this.galaxyWidthScaler * 5;
    this.rocketPositionX =
      position.rocketPositionX * this.galaxyWidthScaler * 5;
    this.rocketPositionY =
      position.rocketPositionY * this.galaxyWidthScaler * 5;

    // Update the actual positions of the rocket images
    if (this.rocket) {
      this.rocket.setPosition(this.rocketPositionX, this.rocketPositionY);
    }
    // Update the actual positions of the planet images
    if (this.earth) {
      this.earth.setPosition(this.earthPositionX, this.earthPositionY);
    }
    if (this.mars) {
      this.mars.setPosition(this.marsPositionX, this.marsPositionY);
    }
  }

  renderSpace(worldWidth: number, worldHeight: number) {
    // Ensure a solid black background
    this.add.rectangle(0, 0, worldWidth, worldHeight, 0x000000).setOrigin(0);

    // Create stars within the extended world size
    this.stars = [];
    const totalStars = 1000; // Increase stars for a larger space

    for (let i = 0; i < totalStars; i++) {
      const x = Math.random() * worldWidth;
      const y = Math.random() * worldHeight;
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

      // const star = this.add.circle(x, y, size, color);
      this.add.circle(x, y, size, color);
      // this.stars.push(star);
    }
  }

  update(_: number, __: number) {
    // Calculate the rocket's velocity based on the current speed

    const velocityX = this.currentRocketSpeed;
    const velocityY = 0;

    // Set the rocket's velocity to make it move
    this.rocket.setVelocity(velocityX, velocityY);
    this.updateParticlePosition(); // Update flame position

    // Check for camera transition
    // this.checkCameraTransition();
    // this.cameras.main.centerOn(this.rocket.x, this.rocket.y);
  }

  // New method for camera position adjustment
  private checkCameraTransition() {
    const cam = this.cameras.main;
    const buffer = 80; // Distance from edges to trigger camera shift

    // Calculate edges of the camera view
    const leftEdge = cam.worldView.x;
    const rightEdge = cam.worldView.x + cam.width;
    const topEdge = cam.worldView.y;
    const bottomEdge = cam.worldView.y + cam.height;

    // Update camera position based on rocket's position
    let newX = cam.worldView.x;
    let newY = cam.worldView.y;

    if (this.rocket.x >= rightEdge - buffer) {
      newX = this.rocket.x - cam.width + buffer;
    } else if (this.rocket.x <= leftEdge + buffer) {
      newX = this.rocket.x - buffer;
    }

    if (this.rocket.y >= bottomEdge - buffer) {
      newY = this.rocket.y - cam.height + buffer;
    } else if (this.rocket.y <= topEdge + buffer) {
      newY = this.rocket.y - buffer;
    }

    // Only update camera position if it needs adjustment
    if (newX !== cam.worldView.x || newY !== cam.worldView.y) {
      cam.setScroll(newX, newY);
    }
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
