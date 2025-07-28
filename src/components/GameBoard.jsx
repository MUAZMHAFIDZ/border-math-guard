import { useState } from "react";
import Npc from "./Npc";

const generateQuestion = () => {
  const a = Math.floor(Math.random() * 5) + 1;
  const b = Math.floor(Math.random() * 5) + 1;
  const correct = a + b;
  const displayed =
    Math.random() > 0.5 ? correct : correct + (Math.random() > 0.5 ? 1 : -1);
  return {
    question: `${a} + ${b} = ${displayed}`,
    correct: displayed === correct,
  };
};

export default function GameBoard() {
  const [npc, setNpc] = useState(generateQuestion());
  const [status, setStatus] = useState("");

  const handleDecision = (isTrue) => {
    if (isTrue === npc.correct) {
      setStatus("Benar! NPC lewat.");
    } else {
      setStatus("Salah! Zombie terdeteksi!");
    }
    setTimeout(() => {
      setNpc(generateQuestion());
      setStatus("");
    }, 1500);
  };

  return (
    <div className="relative w-[800px] h-[400px] bg-[url('/bg.png')] bg-cover rounded-md overflow-hidden border-4 border-gray-700">
      {/* Penjaga */}
      <div className="absolute bottom-10 left-10 z-20">
        <img src="/guard.png" alt="Penjaga" className="w-32" />
      </div>

      {/* NPC */}
      <Npc key={npc.question} />

      {/* Soal */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white text-2xl bg-black bg-opacity-50 px-4 py-2 rounded">
        {npc.question}
      </div>

      {/* Tombol */}
      <div className="absolute bottom-5 right-5 space-x-4">
        <button
          onClick={() => handleDecision(true)}
          className="px-4 py-2 bg-green-500 rounded text-white"
        >
          Benar
        </button>
        <button
          onClick={() => handleDecision(false)}
          className="px-4 py-2 bg-red-500 rounded text-white"
        >
          Salah
        </button>
      </div>

      {/* Status */}
      {status && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 text-yellow-300 text-xl font-bold">
          {status}
        </div>
      )}
    </div>
  );
}
