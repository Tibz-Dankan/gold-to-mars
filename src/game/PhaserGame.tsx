import { useLayoutEffect } from "react";
import Phaser from "phaser";
import { Preloader } from "./scenes/Preloader";
import { Game } from "./scenes/Game";

export function PhaserGame() {
  useLayoutEffect(() => {
    const width = window.innerWidth * 0.8;
    const height = window.innerHeight * 0.6;

    const config = {
      type: Phaser.AUTO,
      width,
      height,
      parent: "game-container",
      backgroundColor: "#212529",
      scene: [Preloader, Game],
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 },
          debug: true,
        },
      },
    };

    const game = new Phaser.Game(config as any);

    // Handle resizing without zoom animation
    const resizeGame = () => {
      const newWidth = window.innerWidth * 0.8;
      const newHeight = window.innerHeight * 0.6;
      game.scale.resize(newWidth, newHeight); // Resize the canvas to fit the new dimensions
    };

    window.addEventListener("resize", resizeGame);

    game.events.on("ready", () => {
      const canvas = document.querySelector("canvas");
      if (canvas) {
        canvas.style.borderRadius = "8px";
      }
    });

    return () => {
      game.destroy(true);
      window.removeEventListener("resize", resizeGame);
    };
  }, []);

  return (
    <div id="game-container" className="relative">
      <div className="">Game controls here</div>
    </div>
  );
}
