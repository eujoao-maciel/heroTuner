import headstock from "../../assets/headstock.webp"

export const Headstock = () => {
    return (
        <div
            className="
            flex items-center justify-center overflow-hidden
            w-[160px] h-[360px]
            lg:w-auto lg:h-auto lg:overflow-visible
        "
        >
            <img
                src={headstock}
                alt="headstock"
                className="
                    -rotate-90 w-[360px] max-w-none shrink-0
                    lg:rotate-0 lg:w-[360px] lg:max-w-[360px]
                "
            />
        </div>
    )
}
