import background from "../assets/background.webp"
import herotuner from "../assets/herotuner.webp"
import "./styles/animations.css"

export const LoadingPage = () => {
    return (
        <main className="relative w-full h-screen overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center z-10">
                <img
                    src={herotuner}
                    alt="herotuner loading logo"
                    className="animate-hero-pulse"
                />
            </div>
        </main>
    )
}
