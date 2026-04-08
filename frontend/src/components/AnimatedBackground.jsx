import { useMemo } from "react";

export const AnimatedBackground = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 15}s`,
      duration: `${15 + Math.random() * 10}s`,
      size: `${2 + Math.random() * 4}px`,
      opacity: 0.3 + Math.random() * 0.4,
    }));
  }, []);

  return (
    <div className="animated-gradient-bg" data-testid="animated-bg">
      <div className="particles-container">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: particle.left,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
              width: particle.size,
              height: particle.size,
              opacity: particle.opacity,
            }}
          />
        ))}
      </div>
    </div>
  );
};
