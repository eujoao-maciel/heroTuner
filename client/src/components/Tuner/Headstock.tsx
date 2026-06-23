import headstock from "../../assets/headstock.webp";

export const Headstock = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="relative w-[370px] h-[400px] md:h-[320px]">
      <img
        src={headstock}
        alt="headstock"
        className="
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[420px] h-auto -rotate-90 md:rotate-0
        "
      />
      <div
        className="
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[160px] h-[320px]
          md:w-[420px] md:h-[210px]
        "
      >
        {children}
      </div>
    </div>
  );
};
