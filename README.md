HeroTuner

functionalRequirements
    - Identify musical notes 
    - Show if the note is in tune, sharp, or flat in real time
    - Allow the user to start and stop tuning (Open, Tune, Exit actions)
    - Provide authentication with login and register screens
    - Integrate a payment gateway
    - Request and manage browser microphone permissions
    - Capture Audio from the user's microhone and process sound frequency

nonFunctionalRequirements 
    - Clean, intuitive, and responsive interface with strong visual identity
    - Low latency audio processing for real-time tuning
    - Scalability and availability (not over)

techStack
   frontend: React, Vite, Tailwind CSS, CSS animations, React Router, Lucide,
   icons, JavaScript.
  
   backend: Node.js, Express, JWT, Bcrypt, Docker, Vitest, Swagger, Zod, 
   imageKit, AbacatePay

   dataBase: PostgreSQL with Prisma ORM, Optimized with indexing and query
   caching
 
   deploymnet: Scalable platforms such as Render, Vercel, or AWS.
   CI/CD pipeline with load balancing support.
