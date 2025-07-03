const Footer = () => (
  <footer className="w-full bg-primary-900 text-primary-100 py-6 mt-12 border-t border-primary-800">
    <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
      <div className="mb-2 md:mb-0">© {new Date().getFullYear()} BlockHommie. Todos los derechos reservados.</div>
      <div className="flex gap-4">
        <a href="/terms-and-conditions" className="hover:text-accent-400 transition">Términos y Condiciones</a>
        <a href="/privacy-policy" className="hover:text-accent-400 transition">Política de Privacidad</a>
      </div>
    </div>
  </footer>
)

export default Footer 