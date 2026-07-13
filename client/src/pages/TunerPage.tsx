import { useState } from "react"
import { ProgressBar } from "../components/Tuner/ProgressBar.tsx"
import { Tuner } from "../components/Tuner/Tuner.tsx"
import { Headstock } from "../components/Tuner/Headstock.tsx"
import { TunerMode } from "../components/ui/TunerMode.tsx"
import { TunerStarter } from "../components/ui/TunerStarter.tsx"
import { useTuner } from "../hooks/useTuner.ts"
import { Note } from "../components/Tuner/Note.tsx"
import "./styles/TunerPage.css"

export const TunerPage = () => {
    const tuner = useTuner()
    const [isTuningStarted, setIsTuningStarted] = useState(false)

    const handleStart = async () => {
        await tuner.start()
        setIsTuningStarted(true)
    }

    return (
        <section className="relative flex justify-center md:items-center w-full min-h-screen z-10 overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 p-4">
                {!isTuningStarted && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm pointer-events-none z-20">
                        <TunerStarter handleStart={handleStart} />
                    </div>
                )}

                <div className="p-2 h-15 w-full flex justify-center items-center col-start-2 md:col-span-2 md:col-start-1 md:order-last">
                    <TunerMode mode={tuner.mode} setMode={tuner.setMode} />
                </div>

                <div
                    className="col-span-2  md:col-span-1 flex flex-col
        items-center gap-2"
                >
                    <ProgressBar litSegments={tuner.litSegments} />
                    <Tuner
                        needleRef={tuner.needleRef}
                        centerNote={tuner.centerNote}
                        leftNote={tuner.leftNote}
                        rightNote={tuner.rightNote}
                    />
                </div>

                <div className="col-span-2 md:col-span-1 flex justify-center p-2">
                    <Headstock>
                        <div className="md:hidden absolute inset-0">
                            <Note
                                label="D"
                                string="D3"
                                active={tuner.targetNote === "D3"}
                                onClick={tuner.selectString}
                                disabled={tuner.mode === "auto"}
                                style={{ top: "5%", left: "-10%" }}
                            />

                            <Note
                                label="A"
                                string="A2"
                                active={tuner.targetNote === "A2"}
                                onClick={tuner.selectString}
                                disabled={tuner.mode === "auto"}
                                style={{ top: "26%", left: "-10%" }}
                            />

                            <Note
                                label="E"
                                string="E2"
                                active={tuner.targetNote === "E2"}
                                onClick={tuner.selectString}
                                disabled={tuner.mode === "auto"}
                                style={{ top: "47%", left: "-10%" }}
                            />
                            <Note
                                label="G"
                                string="G3"
                                active={tuner.targetNote === "G3"}
                                onClick={tuner.selectString}
                                disabled={tuner.mode === "auto"}
                                style={{ top: "5%", left: "107%" }}
                            />

                            <Note
                                label="B"
                                string="B3"
                                active={tuner.targetNote === "B3"}
                                onClick={tuner.selectString}
                                disabled={tuner.mode === "auto"}
                                style={{ top: "26%", left: "107%" }}
                            />

                            <Note
                                label="E"
                                string="E4"
                                active={tuner.targetNote === "E4"}
                                onClick={tuner.selectString}
                                disabled={tuner.mode === "auto"}
                                style={{ top: "47%", left: "107%" }}
                            />
                        </div>
                        <div className="hidden md:block absolute inset-0">
                            <Note
                                label="E"
                                string="E2"
                                active={tuner.targetNote === "E2"}
                                onClick={tuner.selectString}
                                disabled={tuner.mode === "auto"}
                                style={{ top: "4%", left: "48%" }}
                            />

                            <Note
                                label="A"
                                string="A2"
                                active={tuner.targetNote === "A2"}
                                onClick={tuner.selectString}
                                disabled={tuner.mode === "auto"}
                                style={{ top: "4%", left: "66%" }}
                            />

                            <Note
                                label="D"
                                string="D3"
                                active={tuner.targetNote === "D3"}
                                onClick={tuner.selectString}
                                disabled={tuner.mode === "auto"}
                                style={{ top: "4%", left: "84%" }}
                            />
                            <Note
                                label="E"
                                string="E4"
                                active={tuner.targetNote === "E4"}
                                onClick={tuner.selectString}
                                disabled={tuner.mode === "auto"}
                                style={{ top: "96%", left: "48%" }}
                            />

                            <Note
                                label="B"
                                string="B3"
                                active={tuner.targetNote === "B3"}
                                onClick={tuner.selectString}
                                disabled={tuner.mode === "auto"}
                                style={{ top: "96%", left: "66%" }}
                            />

                            <Note
                                label="G"
                                string="G3"
                                active={tuner.targetNote === "G3"}
                                onClick={tuner.selectString}
                                disabled={tuner.mode === "auto"}
                                style={{ top: "96%", left: "84%" }}
                            />
                        </div>
                    </Headstock>
                </div>
            </div>
        </section>
    )
}
