import { ProgressBar } from "../components/Tuner/ProgressBar.tsx"
import { Tuner } from "../components/Tuner/Tuner.tsx"
import { Headstock } from "../components/Tuner/Headstock.tsx"

export const TunerPage = () => {
    return (
        <section className="relative flex items-center justify-center flex-col w-full min-h-screen py-4 z-10 overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-20">
                <div className="flex flex-col items-center justify-center">
                    <ProgressBar />
                    <Tuner />
                </div>

                <div className="relative flex items-center justify-center">
                    <Headstock />
                </div>
            </div>

            <div className="mt-6">tunerMode</div>
        </section>
    )
}
