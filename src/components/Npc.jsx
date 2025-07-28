import { useEffect, useState } from "react";

export default function Npc() {
  const [pos, setPos] = useState(-100);

  useEffect(() => {
    const interval = setInterval(() => setPos((p) => p + 5), 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <img
      src="/npc.png"
      alt="NPC"
      className="absolute bottom-10 w-24 z-10 transition-all"
      style={{ left: `${pos}px` }}
    />
  );
}
