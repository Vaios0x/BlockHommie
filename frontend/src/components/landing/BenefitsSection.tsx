import React from 'react'

const benefits = [
  {
    icon: '🔒',
    title: 'Seguridad Blockchain',
    description: 'Transacciones transparentes y seguras gracias a la tecnología blockchain.',
  },
  {
    icon: '💸',
    title: 'Fraccionalización',
    description: 'Invierte desde montos pequeños en propiedades de alto valor.',
  },
  {
    icon: '🌐',
    title: 'Acceso Global',
    description: 'Oportunidades de inversión inmobiliaria en LATAM para todos.',
  },
  {
    icon: '⏱️',
    title: 'Liquidez Mejorada',
    description: 'Compra y vende tus tokens de propiedad más fácilmente en nuestro marketplace.',
  },
]

const BenefitsSection = () => (
  <section className="py-16 px-4 bg-dark">
    <div className="container mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-primary-100 mb-4">Beneficios de BlockHommie</h2>
      <p className="text-lg text-primary-200 mb-12 max-w-2xl mx-auto">Descubre por qué somos la mejor opción para invertir en bienes raíces tokenizados.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {benefits.map((benefit) => (
          <div key={benefit.title} className="bg-primary-900 p-8 rounded-2xl shadow-lg border border-primary-800 transform transition duration-300 hover:scale-105 hover:border-accent-400">
            <div className="text-5xl mb-4 text-accent-400">{benefit.icon}</div>
            <h3 className="text-xl font-bold text-primary-100 mb-2">{benefit.title}</h3>
            <p className="text-primary-200 text-sm">{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default BenefitsSection 