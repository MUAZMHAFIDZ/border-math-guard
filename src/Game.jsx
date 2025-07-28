import React, { useState } from "react";
import Npc from "./Npc";
const npcImages = [
  "/npc1.png",
  "/npc2.png",
  "/npc3.png",
  "/npc4.png",
  "/npc5.png",
  "/npc6.png",
  "/npc7.png",
  "/npc8.png",
  "/npc9.png",
  "/npc10.png",
];

function getDifferentImage(current) {
  let newImg = current;
  while (newImg === current) {
    newImg = npcImages[Math.floor(Math.random() * npcImages.length)];
  }
  return newImg;
}

function generateQuestion() {
  const operations = ["+", "-", "×", "÷"];
  const op = operations[Math.floor(Math.random() * operations.length)];
  let a = Math.floor(Math.random() * 10) + 1;
  let b = Math.floor(Math.random() * 10) + 1;

  let correctAnswer;
  switch (op) {
    case "+":
      correctAnswer = a + b;
      break;
    case "-":
      correctAnswer = a - b;
      break;
    case "×":
      correctAnswer = a * b;
      break;
    case "÷":
      correctAnswer = a;
      b = [1, 2, 5][Math.floor(Math.random() * 3)];
      a = b * correctAnswer;
      correctAnswer = a / b;
      break;
  }
  const isCorrect = Math.random() > 0.5;
  let displayedAnswer = correctAnswer;

  if (!isCorrect) {
    displayedAnswer += Math.random() > 0.5 ? 1 : -1;
  }

  return {
    question: `${a} ${op} ${b} = ${displayedAnswer}`,
    isHuman: isCorrect,
  };
}

export default function Game() {
  const [npcImage, setNpcImage] = useState(npcImages[0]);
  const [npcHidden, setNpcHidden] = useState(false);
  const [buttonsHidden, setButtonsHidden] = useState(false);
  const [npcData, setNpcData] = useState(generateQuestion());
  const [status, setStatus] = useState("");
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(3);

  const resetNpc = () => {
    setNpcHidden(true);
    setButtonsHidden(true);

    setTimeout(() => {
      setNpcImage(getDifferentImage(npcImage));
      setNpcData(generateQuestion());
      setNpcHidden(false);
      setButtonsHidden(false);
      setStatus("");
    }, 3000);
  };

  const checkAnswer = (isHuman) => {
    const correct = isHuman === npcData.isHuman;
    if (!correct) {
      if (health - 1 <= 0) {
        setHealth(0);
        setStatus("Game Over! A zombie attacked the citizens!");
        setFinished(true);
      } else {
        setHealth((h) => h - 1);
        setStatus("Wrong! -1 Health");
        resetNpc();
      }
    } else {
      setScore((prev) => prev + 1);
      setStatus("Correct!");
      resetNpc();
    }
  };

  if (finished) {
    return (
      <div className="text-center space-y-4 p-4 bg-black text-white h-screen flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold">{status}</h1>
        <h2 className="text-2xl">Score: {score}</h2>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-blue-500 rounded"
        >
          Back to Menu
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* NPC */}
      <div className="absolute inset-0 flex justify-center items-center z-20">
        <Npc image={npcImage} onClick={resetNpc} hidden={npcHidden} />
      </div>

      {/* Frame border */}
      <img
        src="/guard-station.png"
        alt="Guard Station"
        className="absolute inset-0 w-full h-full object-contain z-40"
      />

      {/* Pertanyaan */}
      {!npcHidden && (
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 z-50 bg-black/70 text-white text-xl px-6 py-3 rounded">
          {npcData.question}
        </div>
      )}

      {/* Tombol */}
      {!buttonsHidden && (
        <div className="absolute bottom-5 right-5 z-50 space-x-4">
          <button
            onClick={() => checkAnswer(true)}
            className="px-4 py-2 bg-green-500 rounded hover:bg-green-600"
          >
            It's a Human
          </button>
          <button
            onClick={() => checkAnswer(false)}
            className="px-4 py-2 bg-red-500 rounded hover:bg-red-600"
          >
            It's a Zombie
          </button>
        </div>
      )}

      {/* Status */}
      {status && !finished && (
        <div className="absolute bottom-[15%] w-full text-center text-white text-lg">
          {status}
        </div>
      )}

      {/* SCORE & HEALTH */}
      <div className="absolute top-5 left-5 z-50 text-white text-xl flex flex-col space-y-2">
        <span>Score: {score}</span>
        <span className="text-red-500 text-2xl">{"♥".repeat(health)}</span>
      </div>
    </div>
  );
}
