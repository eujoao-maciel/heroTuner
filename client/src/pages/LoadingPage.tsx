import background from "../assets/background.png";
import herotuner from "../assets/herotuner.png";
import "./styles/animations.css";

export const LoadingPage = () => {
  return (
    <main className="relative w-full h-screen bg-[var(--color-bg-primary)] overflow-hidden">
      <img
        src={background}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute inset-0 flex items-center justify-center z-10">
        <img
          src={herotuner}
          alt="herotuner loading logo"
          className="animate-hero-pulse"
        />
      </div>
    </main>
  );
};
