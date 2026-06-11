import { ProgressBar } from "../components/Tuner/ProgressBar.tsx";
import { Tuner } from "../components/Tuner/Tuner.tsx";

export const TunerPage = () => {
  return (
    <section className="relative flex items-center justify-center flex-col w-full h-screen z-10">
      <div className="flex flex-col md:flex-row items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <ProgressBar />
          <Tuner />
        </div>

        <div>headstock + notas</div>
      </div>

      <div>tunerMode</div>
    </section>
  );
};
