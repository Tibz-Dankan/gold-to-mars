import { Scene } from "phaser";
import { EventBus } from "../EventBus";
import { TPlanet } from "../../types/planet";
import { TRocket } from "../../types/rocketStatus";
import { TRocketLocation } from "../../types/rocketLocation";

export class GalaxyScene extends Scene {
  private rocket!: Phaser.Physics.Arcade.Sprite;
  private mars!: Phaser.GameObjects.Image;
  private earth!: Phaser.GameObjects.Image;
  private particleEmitter!: Phaser.GameObjects.Particles.ParticleEmitter;
  private worldCenterX: number = 0;
  private worldCenterY: number = 0;
  private scaleFactor: number = 7.5;
  private galaxyWidthScaler: number = 0;
  private earthPositionX: number = 0;
  private earthPositionY: number = 0;
  private marsPositionX: number = 0;
  private marsPositionY: number = 0;
  private rocketPositionX: number = 0;
  private rocketPositionY: number = 0;
  private engineStatus: TRocket["rocketStatus"] = {
    isLoadGold: false,
    isTakeOff: false,
    isDropGold: false,
    isLanding: false,
  };
  private takeOffStartTime: number = 0;
  private rocketLocation: TRocketLocation = {
    location: "Earth",
    isApproachingEarth: false,
    isApproachingMars: false,
    distanceToEarthKm: 0,
    distanceToMarsKm: 0,
    distanceFromEarthToMarsKm: 0,
  };

  constructor() {
    super("GalaxyScene");
  }

  create() {
    // Scale the game world to 5 times the screen size
    const { width } = this.scale.gameSize;

    const worldWidth = this.scale.gameSize.width * this.scaleFactor;
    const worldHeight = this.scale.gameSize.height * this.scaleFactor;
    // galaxyScaleFactor

    this.worldCenterX = worldWidth / 2;
    this.worldCenterY = worldHeight / 2;

    this.galaxyWidthScaler = (width * 0.5) / 268;

    // Set world bounds
    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);
    this.physics.world.setBounds(0, 0, worldWidth, worldHeight);

    this.renderSpace(worldWidth, worldHeight); // Pass updated size to renderSpace()

    this.rocket = this.physics.add
      .sprite(this.rocketPositionX, this.rocketPositionY, "rocket")
      .setScale(0.25);
    this.rocket.setAngle(-Math.PI / 2);
    this.rocket.setDepth(10);
    this.rocket.setCollideWorldBounds(true);
    this.rocket.body!.debugShowBody = false;

    this.mars = this.add
      .image(this.marsPositionX, this.marsPositionY, "mars")
      .setScale(1);

    this.earth = this.add
      .image(this.earthPositionX, this.earthPositionY, "earth")
      .setScale(1);

    this.cameras.main.startFollow(this.rocket, false, 1, 1);

    // // Set camera follow based on rocket location
    // if (this.rocketLocation.location === "Earth") {
    //   this.cameras.main.startFollow(this.earth, false, 1, 1);
    // } else if (this.rocketLocation.location === "Mars") {
    //   this.cameras.main.startFollow(this.mars, false, 1, 1);
    // } else {
    //   this.cameras.main.startFollow(this.rocket, false, 1, 1);
    // }

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

    EventBus.on("padMove", (direction: { x: number; y: number }) =>
      this.handlePadMove(direction)
    );

    // EventBus.on("acceleration", ({ acceleration }: { acceleration: number }) =>
    //   this.handleAcceleration(acceleration)
    // );

    EventBus.on("planetPosition", (position: TPlanet["planetPosition"]) =>
      this.handlePlanetPosition(position)
    );

    EventBus.on("engineStatus", (status: TRocket["rocketStatus"]) =>
      this.handleRocketEngineStatus(status)
    );

    EventBus.on("rocketLocation", (location: TRocketLocation) =>
      this.handleRocketLocation(location)
    );
  }

  // handleAcceleration(acceleration: number) {
  //   const speedKmH = (acceleration / 100) * this.speedLimit;
  //   const rocketPixelsPerFrame = (speedKmH / 3600) * 0.005; //0.005 pixels per second
  // }

  handlePadMove = (direction: { x: number; y: number }) => {
    // Calculate magnitude (length) of direction vector
    const magnitude = Math.sqrt(direction.x ** 2 + direction.y ** 2);

    // Normalize direction vector to unit length
    const unitDirection =
      magnitude === 0
        ? { x: 0, y: 0 }
        : { x: direction.x / magnitude, y: direction.y / magnitude };

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
    this.earthPositionX =
      this.worldCenterX +
      position.earthPositionX * this.galaxyWidthScaler * this.scaleFactor;
    this.earthPositionY =
      this.worldCenterY +
      position.earthPositionY * this.galaxyWidthScaler * this.scaleFactor;
    this.marsPositionX =
      this.worldCenterX +
      position.marsPositionX * this.galaxyWidthScaler * this.scaleFactor;
    this.marsPositionY =
      this.worldCenterY +
      position.marsPositionY * this.galaxyWidthScaler * this.scaleFactor;
    this.rocketPositionX =
      this.worldCenterX +
      position.rocketPositionX * this.galaxyWidthScaler * this.scaleFactor;
    this.rocketPositionY =
      this.worldCenterY +
      position.rocketPositionY * this.galaxyWidthScaler * this.scaleFactor;

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

  handleRocketEngineStatus = (status: TRocket["rocketStatus"]) => {
    this.engineStatus = status;
    // set rocket face upwards on take off
    if (this.engineStatus.isTakeOff && this.takeOffStartTime === 0) {
      this.takeOffStartTime = Date.now();
      const elapsedTime = (Date.now() - this.takeOffStartTime) / 1000;

      if (this.takeOffStartTime > 0 && elapsedTime <= 10) {
        this.rocket.setAngle(-Math.PI / 2);
      }
    }
  };

  handleRocketLocation = (location: TRocketLocation) => {
    this.rocketLocation = location;
  };

  renderSpace(worldWidth: number, worldHeight: number) {
    // Ensure a solid black background
    this.add.rectangle(0, 0, worldWidth, worldHeight, 0x000000).setOrigin(0);

    const totalStars = 1250; // Increase stars for a larger space

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

      this.add.circle(x, y, size, color);
    }
  }

  update(_: number, __: number) {
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
