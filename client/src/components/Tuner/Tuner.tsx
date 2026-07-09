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
        className="absolute left-48 w-[2px] h-[80px] 
        bg-red-500 origin-bottom pointer-events-none
        bg-linear-to-t from-stone-900 to-red-400
        "
        style={{
          transform: "translateX(-50%) rotate(0deg)",
          bottom: "35%",
          transition: "none",
        }}
      />

      <div className="flex items-center justify-center gap-9 pointer-events-none">
        <span className="absolute top-29 left-32 opacity-50 text-xl">{leftNote}</span>
        <span className="absolute top-23 left-46 text-3xl font-bold">{centerNote}</span>
        <span className="absolute top-29 left-62  opacity-50 text-xl">{rightNote}</span>
      </div>
    </div>
  );
};
