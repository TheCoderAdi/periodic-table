import { useState, useEffect } from "react";
import { PeriodicTable } from "../components/PeriodicTable";

const Main = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showBackgroundParticles, setShowBackgroundParticles] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const flicker = () => {
      const title = document.querySelector(".title-flicker");
      if (title) {
        title.classList.add("animate-flicker");
        setTimeout(() => {
          title.classList.remove("animate-flicker");
        }, 300);
      }

      setTimeout(flicker, 3000 + Math.random() * 7000);
    };

    setTimeout(flicker, 2000);
  }, []);

  return (
    <div
      className={`min-h-screen flex flex-col relative overflow-hidden transition-opacity duration-1000 ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
    >
      {showBackgroundParticles && (
        <div className="fixed inset-0 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-neon-cyan rounded-full opacity-20"
              style={{
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                boxShadow: "0 0 8px rgba(0, 255, 255, 0.8)",
                animation: `float ${10 + Math.random() * 20}s linear infinite`,
                animationDelay: `-${Math.random() * 20}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_rgba(0,255,255,0.03)_0,_rgba(0,0,0,0)_70%)]"></div>

      <div className="container mx-auto px-4 py-8">
        <div className="title-flicker mb-4">
          <div className="text-center mb-8">
            <div className="inline-block font-title text-lg text-muted-foreground/50 border border-neon-cyan/20 px-3 py-1 rounded-sm bg-retroBlue/50">
              <span className="text-neon-green">Terminal:</span>{" "}
              <span className="text-neon-cyan">
                ../science/chemistry/periodic
              </span>
            </div>
          </div>
        </div>

        <PeriodicTable />
      </div>
    </div>
  );
};

export default Main;
