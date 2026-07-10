import "./styles/TunerStarter.css";

export const TunerStarter = ({ handleStart }: { handleStart: () => void }) => {
  return (
    <>
      <button onClick={handleStart} className="tuner-starter">
        <div className="pointer-events-auto tuner-starter-label">AFINAR</div>
      </button>
    </>
  );
};
