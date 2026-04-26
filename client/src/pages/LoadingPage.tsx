import background from "../assets/background.png"

export const LoadingPage = () => {
    console.log(background)

    return (
        <main>
            <img
                src={background}
                alt="Dark industrial metal background with a repeating pattern of skulls, pentagrams, and lightning bolts."
                className="w-full h-screen object-cover"
            />
        </main>
    )
}
