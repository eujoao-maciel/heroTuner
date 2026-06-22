import { ProgressBar } from "../components/Tuner/ProgressBar.tsx"
import { Tuner } from "../components/Tuner/Tuner.tsx"
import { Headstock } from "../components/Tuner/Headstock.tsx"
import { TunerMode } from "../components/ui/TunerMode.tsx"

const Note = ({
    children,
    style,
}: {
    children: string
    style: React.CSSProperties
}) => (
    <span
        className="absolute -translate-x-1/2 -translate-y-1/2 border rounded-full w-8 h-8 flex items-center justify-center text-xs bg-black/60"
        style={style}
    >
        {children}
    </span>
)

export const TunerPage = () => {
    return (
        <section className="relative flex justify-center md:items-center w-full min-h-screen z-10 overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 p-4">
                <div className="p-2 h-15 w-full flex justify-center items-center col-start-2 md:col-span-2 md:col-start-1 md:order-last">
                    <TunerMode />
                </div>

                <div
                    className="col-span-2  md:col-span-1 flex flex-col
        items-center gap-2"
                >
                    <ProgressBar />
                    <Tuner />
                </div>

                <div className="col-span-2 md:col-span-1 flex justify-center p-2">
                    <Headstock>
                        <div className="md:hidden absolute inset-0">
                            <Note style={{ top: "15%", left: "54%" }}>D</Note>
                            <Note style={{ top: "23%", left: "75%" }}>A</Note>
                            <Note style={{ top: "30%", left: "54%" }}>E</Note>
                            <Note style={{ top: "70%", left: "54%" }}>G</Note>
                            <Note style={{ top: "77%", left: "75%" }}>B</Note>
                            <Note style={{ top: "85%", left: "54%" }}>E</Note>
                        </div>

                        <div className="hidden md:block absolute inset-0">
                            <Note style={{ top: "4%", left: "54%" }}>D</Note>
                            <Note style={{ top: "4%", left: "66%" }}>A</Note>
                            <Note style={{ top: "4%", left: "78%" }}>E</Note>
                            <Note style={{ top: "96%", left: "54%" }}>E</Note>
                            <Note style={{ top: "96%", left: "66%" }}>B</Note>
                            <Note style={{ top: "96%", left: "78%" }}>G</Note>
                        </div>
                    </Headstock>
                </div>
            </div>
        </section>
    )
}
