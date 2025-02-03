import "./App.css";
import { EventBridge } from "./game/bridge/EventBridge";
import { PhaserGame } from "./game/PhaserGame";

function App() {
  return (
    <div>
      <EventBridge />
      <PhaserGame />
    </div>
  );
}

export default App;
