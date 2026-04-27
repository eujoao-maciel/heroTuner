import background from "../assets/background.png"
import herotuner from '../assets/herotuner.png'
import './styles/animations.css'

export const LoadingPage = () => {
    console.log(background)

    return (
        <main className='relative'>
            <img
                src={background}
                alt="Dark industrial metal background with a repeating pattern of skulls, pentagrams, and lightning bolts."
                className="w-full h-screen object-cover z-0"
            />

            <img 
               src={herotuner}
               alt='herotuner loading logo'
               className='absolute inset-0 m-auto z-50 animate-hero-pulse'
            />
        </main>
    )
}
