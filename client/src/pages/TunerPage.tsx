import { ProgressBar } from "../components/Tuner/ProgressBar.tsx";
import { Tuner } from "../components/Tuner/Tuner.tsx";
import { Headstock } from "../components/Tuner/Headstock.tsx";

export const TunerPage = () => {
  return (
    <section className="relative flex justify-center md:items-center w-full min-h-screen z-10 overflow-hidden">
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4 p-4">
        <div className="border p-2 h-15 w-full flex justify-center items-center col-start-2 md:col-span-2 md:col-start-1 md:order-last">
          tuner mode
        </div>

        <div className="col-span-2  md:col-span-1 flex flex-col
        items-center gap-2">
          <ProgressBar />
          <Tuner />
        </div>

        <div className="col-span-2 flex items-center justify-center md:col-span-1 border p-2">
            <Headstock />
        </div>
      </div>
    </section>
  );
};
