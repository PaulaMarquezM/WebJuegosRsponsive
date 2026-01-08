interface HomeProps {
  onStart: () => void
}

export default function Home({ onStart }: HomeProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 py-8">
      <div className="text-center max-w-3xl">
        {/* Título con animación de gradiente */}
        <div className="mb-8">
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 animate-pulse">
            PiensaPues
          </h2>
          <div className="text-6xl sm:text-7xl md:text-8xl mb-6">🧠✨</div>
        </div>

        {/* Descripción */}
        <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-4 font-medium">
          Ejercita tu mente con juegos lógicos
        </p>
        <p className="text-base sm:text-lg text-gray-600 mb-10 px-4">
          Plataforma web diseñada con React y Tailwind CSS.
          <br className="hidden sm:block" />
          Totalmente responsive para cualquier dispositivo.
        </p>

        {/* Botón principal con efecto hover */}
        <button
          onClick={onStart}
          className="group relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-5 rounded-2xl text-xl font-bold hover:from-indigo-700 hover:to-purple-700 active:scale-95 transition-all duration-300 shadow-2xl hover:shadow-indigo-500/50"
        >
          <span className="relative z-10">Empezar a jugar 🎮</span>
          <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
        </button>

        {/* Características */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
            <div className="text-4xl mb-3">📱</div>
            <h3 className="font-bold text-lg mb-2">100% Responsive</h3>
            <p className="text-sm text-gray-600">Funciona perfecto en todos los dispositivos</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-bold text-lg mb-2">Rápido y Fluido</h3>
            <p className="text-sm text-gray-600">Animaciones suaves y rendimiento óptimo</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="font-bold text-lg mb-2">Fácil de Usar</h3>
            <p className="text-sm text-gray-600">Interfaz intuitiva y amigable</p>
          </div>
        </div>
      </div>
    </div>
  )
}