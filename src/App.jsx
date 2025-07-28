import { useState } from "react";
import Game from "./Game";

export default function App() {
  const [started, setStarted] = useState(false);

  return (
    <div className="w-screen h-screen bg-gray-900 flex items-center justify-center text-white">
      {!started ? (
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold">Border Intelligence Check</h1>
          <p className="text-lg max-w-md mx-auto">
            You are the border guard. Identify if those passing are humans or
            zombies by solving their intelligence test.
          </p>
          <button
            onClick={() => setStarted(true)}
            className="px-6 py-3 bg-green-500 rounded hover:bg-green-600"
          >
            Start Game
          </button>
        </div>
      ) : (
        <Game />
      )}
    </div>
  );
}
