import { Scene } from "phaser";
import { EventBus } from "../EventBus";

export class ControlPadScene extends Scene {
  private pad!: Phaser.GameObjects.Graphics;
  private ball!: Phaser.GameObjects.Image;
  private padCenter: Phaser.Math.Vector2;
  private maxDistance: number;

  constructor() {
    super({ key: "ControlPadScene" });
    this.padCenter = new Phaser.Math.Vector2(0, 0);
    this.maxDistance = 50;
  }

  preload() {
    // Create a graphics object to draw the ball
    const ballGraphics = this.add.graphics();
    ballGraphics.fillStyle(0x90ee90, 1);
    ballGraphics.fillCircle(15, 15, 15);
    ballGraphics.generateTexture("ballTexture", 30, 30);
    ballGraphics.destroy();
  }

  create() {
    // Make this scene persist and always be on top
    this.scene.setVisible(true);
    this.scene.bringToTop();
    this.scene.setActive(true);
    this.scene.setVisible(true);

    const { width, height } = this.scale.gameSize;
    const padX = width - 100;
    const padY = height - 100;
    this.padCenter.set(padX, padY);

    // Create the joystick pad (dark green)
    this.pad = this.add.graphics();
    this.pad.fillStyle(0x006400, 1);
    this.pad.fillCircle(padX, padY, 50);

    // Create the draggable ball (light green)
    this.ball = this.add.image(padX, padY, "ballTexture").setInteractive();
    this.ball.setDepth(1000); // Ensures it's on top

    // Enable dragging
    this.input.setDraggable(this.ball);

    this.input.on("drag", (_: any, __: any, dragX: number, dragY: number) => {
      this.onDrag(dragX, dragY);
    });

    this.input.on("dragend", () => {
      this.stopDrag();
    });

    // Always bring the control pad to the top
    this.scene.bringToTop();
  }

  private onDrag(x: number, y: number) {
    let dx = x - this.padCenter.x;
    let dy = y - this.padCenter.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > this.maxDistance) {
      const angle = Math.atan2(dy, dx);
      dx = Math.cos(angle) * this.maxDistance;
      dy = Math.sin(angle) * this.maxDistance;
    }

    this.ball.setPosition(this.padCenter.x + dx, this.padCenter.y + dy);

    const scaleFactor = 1; // Adjust as needed

    // Normalize values (-1 to 1 range)
    const normalizedX = (dx / this.maxDistance) * scaleFactor;
    const normalizedY = (dy / this.maxDistance) * scaleFactor;

    // Emit movement event to control the rocket
    this.game.events.emit("padMove", { x: normalizedX, y: normalizedY });
    EventBus.emit("padMove", { x: normalizedX, y: normalizedY });

    // Keep the pad scene always on top
    this.scene.bringToTop();
  }

  private stopDrag() {
    this.ball.setPosition(this.padCenter.x, this.padCenter.y);
    this.game.events.emit("padMove", { x: 0, y: 0 });

    // Keep the pad scene on top
    this.scene.bringToTop();
  }
}
