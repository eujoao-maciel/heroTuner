import { Routes, Route } from "react-router-dom"
import { Layout } from "./layout/Layout.tsx"
import { LoadingPage } from "./pages/LoadingPage"
import { TunerPage } from "./pages/TunerPage"

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<LoadingPage />} />
                <Route path="/tuner" element={<TunerPage />} />
            </Route>
        </Routes>
    )
}

export default App
