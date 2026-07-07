import amp from "../../assets/amp.webp";

type Props = {
  needleRef: React.RefObject<HTMLDivElement | null>;
  centerNote: string;
  leftNote: string;
  rightNote: string;
  onStart: () => void;
};

export const Tuner = ({
  needleRef,
  centerNote,
  leftNote,
  rightNote,
  onStart,
}: Props) => {
  return (
    <div className="relative w-full max-w-[407px] min-w-[405px]">
      <img src={amp} alt="tuner icon" className="w-full h-auto" />

      <div
        ref={needleRef}
        className="absolute left-48 w-[2px] h-[80px] bg-red-500 origin-bottom pointer-events-none"
        style={{
          transform: "translateX(-50%) rotate(0deg)",
          bottom: "35%",
          transition: "none",
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center gap-6 text-white pointer-events-none">
        <span className="opacity-50 text-sm">{leftNote}</span>
        <span className="text-3xl font-bold">{centerNote}</span>
        <span className="opacity-50 text-sm">{rightNote}</span>
      </div>
    </div>
  );
};
