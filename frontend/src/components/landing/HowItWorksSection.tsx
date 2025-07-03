import React from 'react'

const steps = [
  {
    step: 1,
    icon: '📝',
    title: 'Regístrate y Verifica',
    description: 'Crea tu cuenta y completa el proceso KYC para asegurar la transparencia.',
  },
  {
    step: 2,
    icon: '🔍',
    title: 'Explora Propiedades',
    description: 'Navega por nuestro marketplace y encuentra la propiedad tokenizada ideal para ti.',
  },
  {
    step: 3,
    icon: '💰',
    title: 'Invierte Fácilmente',
    description: 'Compra tokens de propiedad usando criptomonedas de forma segura y rápida.',
  },
  {
    step: 4,
    icon: '📈',
    title: 'Gestiona tu Portafolio',
    description: 'Visualiza y gestiona tus inversiones inmobiliarias desde tu panel de usuario.',
  },
]

const HowItWorksSection = () => (
  <section className="py-16 px-4 bg-gradient-to-b from-dark to-primary-900">
    <div className="container mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-primary-100 mb-4">¿Cómo Funciona BlockHommie?</h2>
      <p className="text-lg text-primary-200 mb-12 max-w-2xl mx-auto">Invertir en bienes raíces nunca fue tan fácil y accesible.</p>
      <div className="relative">
        {/* Línea conectora (visible en pantallas grandes) */}
        <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-primary-700 transform -translate-y-1/2" aria-hidden="true"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative">
          {steps.map((step) => (
            <div key={step.step} className="flex flex-col items-center bg-primary-800 p-8 rounded-2xl shadow-lg border border-primary-700 z-10">
              <div className="relative mb-4">
                <div className="absolute -inset-2 bg-accent-400 rounded-full opacity-20 blur-lg"></div>
                <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-accent-400 text-dark text-2xl font-bold shadow-md">{step.step}</div>
              </div>
              <div className="text-5xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-bold text-primary-100 mb-2">{step.title}</h3>
              <p className="text-primary-200 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
)

export default HowItWorksSection 