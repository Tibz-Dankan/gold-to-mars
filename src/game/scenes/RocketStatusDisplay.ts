import { Scene } from "phaser";

export class RocketStatusDisplayScene extends Scene {
  private speedText!: Phaser.GameObjects.Text;
  private altitudeText!: Phaser.GameObjects.Text;
  private planetText!: Phaser.GameObjects.Text;

  constructor() {
    super("RocketStatusDisplayScene");
  }

  create() {
    const { width, height } = this.scale.gameSize;

    // Assuming ControlPadScene is at the rightmost position
    const controlPadWidth = 200; // Adjust based on actual width
    const panelX = width - controlPadWidth - 220; // Position to the left of ControlPadScene
    const panelY = height - 180; // Position near bottom (adjust if needed)

    // Table Headers
    this.add
      .text(panelX + 80, panelY - 20, "Rocket Status", {
        fontSize: "20px",
        color: "#ffffff",
      })
      .setOrigin(0.5);
    this.add.text(panelX, panelY, "Property", {
      fontSize: "16px",
      color: "#ffff00",
    });
    this.add.text(panelX + 150, panelY, "Value", {
      fontSize: "16px",
      color: "#ffff00",
    });

    // Table Rows
    this.add.text(panelX, panelY + 30, "Speed:", {
      fontSize: "16px",
      color: "#ffffff",
    });
    this.add.text(panelX, panelY + 60, "Altitude:", {
      fontSize: "16px",
      color: "#ffffff",
    });
    this.add.text(panelX, panelY + 90, "Near:", {
      fontSize: "16px",
      color: "#ffffff",
    });

    // Dynamic text fields
    this.speedText = this.add.text(panelX + 150, panelY + 30, "0 km/hr", {
      fontSize: "16px",
      color: "#00ff00",
    });
    this.altitudeText = this.add.text(panelX + 150, panelY + 60, "0 km", {
      fontSize: "16px",
      color: "#00ff00",
    });
    this.planetText = this.add.text(panelX + 150, panelY + 90, "Earth", {
      fontSize: "16px",
      color: "#00ff00",
    });

    this.game.events.on("rocketStatus", this.updateStatus, this);
  }

  updateStatus({
    speed,
    altitude,
    planet,
  }: {
    speed: number;
    altitude: number;
    planet: string;
  }) {
    this.speedText.setText(`${speed.toFixed(2)} km/hr`);
    this.altitudeText.setText(`${altitude.toFixed(2)} km`);
    this.planetText.setText(planet);
  }

  shutdown() {
    this.game.events.off("rocketStatus", this.updateStatus, this);
  }
}
