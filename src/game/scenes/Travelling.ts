import { Scene } from "phaser";

export class TravellingScene extends Scene {
  private elapsedTime: number = 0;
  private phase: "earth" | "space" | "mars" = "earth";

  constructor() {
    super("TravellingScene");
  }

  create() {
    this.renderEarthAtmosphere(); // Start with Earth's atmosphere
    this.time.addEvent({
      delay: 1000,
      callback: this.updatePhase,
      callbackScope: this,
      loop: true,
    });
  }

  updatePhase() {
    this.elapsedTime += 1;

    if (this.elapsedTime === 30) {
      this.phase = "space";
      this.renderSpace();
    } else if (this.elapsedTime === 55) {
      this.phase = "mars";
      this.renderMarsAtmosphere();
    }
  }

  renderEarthAtmosphere() {
    const { width, height } = this.scale.gameSize;
    const canvas = this.textures.createCanvas(
      "earth-atmosphere",
      width,
      height
    );
    const ctx = canvas!.getContext();

    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "#001f3f"); // Dark blue
    gradient.addColorStop(0.3, "#0074D9"); // Lighter blue
    gradient.addColorStop(0.7, "#7FDBFF"); // Pale blue
    gradient.addColorStop(1, "#FFFFFF"); // White glow

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    canvas!.refresh();
    this.add.image(0, 0, "earth-atmosphere").setOrigin(0);
  }

  renderSpace() {
    const { width, height } = this.scale.gameSize;
    const canvas = this.textures.createCanvas("space", width, height);
    const ctx = canvas!.getContext();

    // Space background
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);

    // Add stars
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 2;
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    canvas!.refresh();
    this.add.image(0, 0, "space").setOrigin(0);
  }

  renderMarsAtmosphere() {
    const { width, height } = this.scale.gameSize;
    const canvas = this.textures.createCanvas("mars-atmosphere", width, height);
    const ctx = canvas!.getContext();

    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "#8B0000"); // Dark red
    gradient.addColorStop(0.3, "#B22222"); // Lighter red
    gradient.addColorStop(0.7, "#FF6347"); // Orange-red
    gradient.addColorStop(1, "#FFDAB9"); // Pale dusty color

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    canvas!.refresh();
    this.add.image(0, 0, "mars-atmosphere").setOrigin(0);
  }
}
