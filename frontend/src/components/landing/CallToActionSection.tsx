import React from 'react'

const CallToActionSection = () => (
  <section className="py-16 px-4 bg-gradient-to-tr from-primary-800 via-primary-900 to-dark">
    <div className="container mx-auto text-center bg-primary-800/50 backdrop-blur-sm p-10 rounded-3xl shadow-2xl border border-primary-700 max-w-3xl">
      <h2 className="text-3xl md:text-4xl font-bold text-accent-400 mb-4">¿Listo para Invertir en tu Futuro?</h2>
      <p className="text-lg text-primary-100 mb-8">Únete a BlockHommie hoy mismo y empieza a construir tu portafolio inmobiliario en la Web3.</p>
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <a href="/marketplace" className="px-8 py-3 rounded-lg bg-accent-400 text-dark font-bold shadow-lg hover:bg-accent-500 transition transform hover:scale-105">
          Explorar Propiedades
        </a>
        <a href="/create-property" className="px-8 py-3 rounded-lg bg-dark text-primary-100 border-2 border-primary-500 font-bold shadow-lg hover:bg-primary-500 hover:text-white transition transform hover:scale-105">
          Tokenizar Propiedad
        </a>
      </div>
    </div>
  </section>
)

export default CallToActionSection 