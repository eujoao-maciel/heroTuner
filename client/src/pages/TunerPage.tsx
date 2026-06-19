import { ProgressBar } from "../components/Tuner/ProgressBar.tsx";
import { Tuner } from "../components/Tuner/Tuner.tsx";
import { Headstock } from "../components/Tuner/Headstock.tsx";
import { TunerMode } from "../components/ui/TunerMode.tsx";

export const TunerPage = () => {
  return (
    <section className="relative flex justify-center md:items-center w-full min-h-screen z-10 overflow-hidden">
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4 p-4">
        <div className="p-2 h-15 w-full flex justify-center items-center col-start-2 md:col-span-2 md:col-start-1 md:order-last">
          <TunerMode />
        </div>

        <div
          className="col-span-2  md:col-span-1 flex flex-col
        items-center gap-2"
        >
          <ProgressBar />
          <Tuner />
        </div>

        <div className="col-span-2 flex md:flex-col items-end justify-center md:col-span-1 p-2">
          <div className="border flex flex-col md:flex-row gap-3">
            <div className="border">D</div>
            <div className="border">A</div>
            <div className="border">E</div>
          </div>
          <Headstock />

          <div className="flex flex-col md:flex-row gap-3">
            <div className=" border">G</div>
            <div className=" border">B</div>
            <div className=" border">E</div>
          </div>
        </div>
      </div>
    </section>
  );
};
