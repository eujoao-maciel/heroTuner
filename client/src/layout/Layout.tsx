  import background from "../assets/background.webp"
  import { Outlet } from "react-router-dom"

  export const Layout = () => {
      return (
          <main className="relative flex items-center justify-center min-h-screen bg-[var(--color-bg-primary)] overflow-hidden">
            <img
                src={background}
                alt="background"
                className="absolute w-full h-full inset-0 object-cover"
            />

            <div className="absolute inset-0 bg-black/40"></div>

            <div>
                <Outlet />
            </div>
        </main>
    )
}
