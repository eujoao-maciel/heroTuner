import { useState } from "react"
import background from "./assets/background.webp"
import { LoadingPage } from "./pages/LoadingPage"
import { TunerPage } from "./pages/TunerPage"

function App() {
    const [isLoading, setIsLoading] = useState(true)

    setTimeout(() => {
        setIsLoading(false)
    }, 4000)

    return (
        <main className='relative w-full h-screen overflow-hidden' >
            <img
                src={background}
                alt="background"
                className="absolute inset-0 w-full h-full object-cover object-center"
            />

            <div className="absolute inset-0 bg-black/20" />

            {isLoading ? <LoadingPage /> : <TunerPage />}
        </main>
    )
}

export default App
