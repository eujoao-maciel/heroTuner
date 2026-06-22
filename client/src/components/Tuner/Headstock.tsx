import headstock from "../../assets/headstock.webp";

export const Headstock = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="relative w-[220px] h-[420px] md:w-[520px] md:h-[280px]">
      <img
        src={headstock}
        alt="headstock"
        className="
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[320px] h-[160px] -rotate-90
          md:w-[420px] md:h-[210px] md:rotate-0
        "
      />
      {children}
    </div>
  );
};
