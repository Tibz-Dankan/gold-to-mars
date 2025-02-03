import "./App.css";
import { EventBridge } from "./game/bridge/EventBridge";
import { PhaserGame } from "./game/PhaserGame";
import { RocketFlame } from "./components/UI/RocketFlame";

function App() {
  return (
    <div>
      <RocketFlame />
      <EventBridge />
      <PhaserGame />
    </div>
  );
}

export default App;
