import "./styles/TunerStarter.css";

export const TunerStarter = ({ setIsTuningStarted }) => {
  return (
    <>
      <button
        onClick={() => {
          setIsTuningStarted(true);
        }}
        className=" tuner-starter"
      >
        <div className="pointer-events-auto tuner-starter-label">AFINAR</div>
      </button>
    </>
  );
};
