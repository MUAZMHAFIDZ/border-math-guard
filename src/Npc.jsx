import React from "react";

export default function Npc({ image, onClick, hidden }) {
  if (hidden) {
    return (
      <div
        className="absolute flex flex-col items-center justify-center 
                   w-[50%] h-[50%] text-white text-xl animate-pulse"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin mb-4"></div>
        <span>Wait...</span>
      </div>
    );
  }

  return (
    <img
      src={image}
      alt="NPC"
      onClick={onClick}
      className="absolute w-[70%] h-[70%] md:w-[50%] md:h-[50%] object-contain cursor-pointer"
      style={{
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
}
