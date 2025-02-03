import { useEffect } from "react";
import { useControlsStore } from "../../store/controls";
import { EventBus } from "../EventBus";

export const useEventGameControlsBridget = () => {
  const isGameStart = useControlsStore((state) => state.start);
  const isGamePause = useControlsStore((state) => state.pause);
  const resetGame = useControlsStore((state) => state.resetGame);

  useEffect(() => {
    const gameStartHandler = () => {
      if (!isGameStart) return;
      EventBus.emit("startGame", isGameStart);
    };
    const gamePauseHandler = () => {
      if (!isGamePause) return;
      EventBus.emit("pauseGame", isGamePause);
    };

    gameStartHandler();
    gamePauseHandler();

    return () => resetGame();
  }, [isGameStart, isGamePause]);

  return {};
};
