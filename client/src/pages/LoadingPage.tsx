import herotuner from "../assets/herotuner.webp"
import "./styles/animations.css"

export const LoadingPage = () => {
    return (
        <div className="flex items-center justify-center">
            <img
                src={herotuner}
                alt="herotuner loading logo"
                className="animate-hero-pulse"
            />
        </div>
    )
}
