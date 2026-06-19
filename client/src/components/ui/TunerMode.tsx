import { useState } from "react";
import "./styles/TunerMode.css";

export enum TunerModeType {
  AUTO = "AUTO",
  MANUAL = "MANUAL",
}

const Screw = ({ className = "" }: { className?: string }) => (
  <span className={`tuner-screw ${className}`}>
    <span className="tuner-screw-slot" />
  </span>
);

const MetalPlate = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <div
    className="tuner-metal-plate tuner-metal-plate-clickable"
    onClick={onClick}
  >
    <Screw className="left" />
    <Screw className="right" />

    <div className="tuner-metal-inner" />

    <span className="tuner-metal-title">{children}</span>
  </div>
);

type ModeButtonProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

const ModeButton = ({ label, active, onClick }: ModeButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`tuner-mode-button ${active ? "active" : ""}`}
    >
      <div className="glass-overlay" />
      <div className="grunge-overlay" />

      <span className="tuner-mode-label">{label}</span>
    </button>
  );
};

export const TunerMode = () => {
  const [mode, setMode] = useState<TunerModeType>(TunerModeType.AUTO);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleModeChange = (selectedMode: TunerModeType) => {
    setMode(selectedMode);
    setIsMenuOpen(false);
  };

  return (
    <div className="tuner-mode-container">
      <MetalPlate onClick={toggleMenu}>TUNER MODE</MetalPlate>

      {isMenuOpen && (
        <div className="tuner-mode-dropdown">
          <ModeButton
            label="AUTO"
            active={mode === TunerModeType.AUTO}
            onClick={() => handleModeChange(TunerModeType.AUTO)}
          />

          <ModeButton
            label="MANUAL"
            active={mode === TunerModeType.MANUAL}
            onClick={() => handleModeChange(TunerModeType.MANUAL)}
          />
        </div>
      )}
    </div>
  );
};

export default TunerMode;
