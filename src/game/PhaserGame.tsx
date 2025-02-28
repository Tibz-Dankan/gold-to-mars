import { useLayoutEffect } from "react";
import Phaser from "phaser";
import { Preloader } from "./scenes/Preloader";
import { Game } from "./scenes/Game";
// import { FireScene } from "./scenes/Fire";
import { ControlPadScene } from "./scenes/ControlPad";
// import { RocketStatusDisplayScene } from "./scenes/RocketStatusDisplay";
import { ControlLayout } from "../components/layout/ControlLayout";
// import { TravellingScene } from "./scenes/Travelling";
import { TakeOffScene } from "./scenes/TakeOff";
import { SpaceScene } from "./scenes/Space";
import { DropGoldScene } from "./scenes/DropGold";
import { GalaxyScene } from "./scenes/Galaxy";

export function PhaserGame() {
  useLayoutEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const config = {
      type: Phaser.AUTO,
      width,
      height,
      parent: "game-container",
      backgroundColor: "#212529",
      scene: [
        Preloader,
        Game,
        // FireScene,
        ControlPadScene,
        // RocketStatusDisplayScene,
        // TravellingScene,
        TakeOffScene,
        SpaceScene,
        DropGoldScene,
        GalaxyScene,
      ],
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 },
          debug: true,
          // debug: false,
        },
      },
    };

    const game = new Phaser.Game(config as any);

    game.events.once("ready", () => {
      game.scene.start("ControlPadScene");
      // game.scene.start("RocketStatusDisplayScene");
      // game.scene.start("TravellingScene");
      // game.scene.start("FireScene");
      // game.scene.start("TakeOffScene");
    });

    // Handle resizing without zoom animation
    const resizeGame = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      game.scale.resize(newWidth, newHeight); // Resize the canvas to fit the new dimensions
    };

    window.addEventListener("resize", resizeGame);

    return () => {
      game.destroy(true);
      window.removeEventListener("resize", resizeGame);
    };
  }, []);

  return (
    <div id="game-container" className="relative overflow-hidden">
      <div className="absolute top-2 left-2">Game controls here</div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <ControlLayout />
      </div>
    </div>
  );
}
