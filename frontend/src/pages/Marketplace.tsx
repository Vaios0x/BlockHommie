import PropertyList from '../components/PropertyList'

const Marketplace = () => (
  <div className="flex flex-col items-center justify-center min-h-[70vh] bg-dark">
    <div className="bg-gradient-to-br from-primary-900/80 to-primary-700/80 rounded-3xl shadow-2xl p-10 max-w-3xl w-full text-center border border-primary-800 mb-8">
      <h1 className="text-3xl md:text-4xl font-extrabold text-accent-400 mb-4 drop-shadow-lg">Marketplace</h1>
      <p className="text-lg text-primary-100 mb-6">Compra y venta de propiedades tokenizadas.</p>
    </div>
    <PropertyList />
  </div>
)

export default Marketplace 