import headstock from "../../assets/headstock.webp"

export const Headstock = () => {
    return (
        <div
            className="
            flex items-center justify-center overflow-hidden
            w-[160px] h-[360px]
            md:w-auto md:h-auto md:overflow-visible
        "
        >
            <img
                src={headstock}
                alt="headstock"
                className="
                    -rotate-90 w-[300px] sm:w-[360px] max-w-none shrink-0
                    md:rotate-0 md:w-[360px] md:max-w-[360px]
                "
            />
        </div>
    )
}
