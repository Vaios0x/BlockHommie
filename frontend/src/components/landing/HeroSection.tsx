import React from 'react'

const HeroSection = () => (
  <section className="relative bg-gradient-to-br from-primary-800 via-primary-900 to-dark text-white py-20 px-4 overflow-hidden">
    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
      {/* Contenido Texto */}
      <div className="flex-1 text-center md:text-left max-w-xl">
        <h1 className="text-4xl md:text-6xl font-extrabold text-accent-400 mb-4 leading-tight drop-shadow-lg">
          Invierte en Inmuebles con Web3
        </h1>
        <p className="text-lg md:text-xl text-primary-100 mb-8">
          BlockHommie: La plataforma segura y transparente para tokenizar y comerciar propiedades en LATAM.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
          <a href="/marketplace" className="px-8 py-3 rounded-lg bg-accent-400 text-dark font-bold shadow-lg hover:bg-accent-500 transition transform hover:scale-105">
            Explorar Propiedades
          </a>
          <a href="/create-property" className="px-8 py-3 rounded-lg bg-primary-500 text-white font-bold shadow-lg hover:bg-primary-400 transition transform hover:scale-105">
            Tokeniza tu Propiedad
          </a>
        </div>
      </div>
      {/* Imagen Ilustrativa */}
      <div className="flex-1 flex justify-center md:justify-end mt-10 md:mt-0">
        <img
          src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // URL de Unsplash
          alt="Inversión Inmobiliaria Web3 - Casa Moderna"
          className="rounded-3xl shadow-2xl w-full max-w-md object-cover border-4 border-primary-700 transform transition duration-500 hover:scale-105"
        />
      </div>
    </div>
    {/* Efecto de fondo abstracto (opcional) */}
    <div className="absolute top-0 left-0 w-full h-full opacity-10 z-0">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute w-full h-full">
        <defs>
          <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" style={{stopColor: 'rgba(99, 102, 241, 0.3)', stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: 'rgba(99, 102, 241, 0)', stopOpacity: 1}} />
          </radialGradient>
        </defs>
        <circle cx="10" cy="10" r="40" fill="url(#grad1)" />
        <circle cx="90" cy="80" r="50" fill="url(#grad1)" transform="rotate(45 90 80)"/>
      </svg>
    </div>
  </section>
)

export default HeroSection 