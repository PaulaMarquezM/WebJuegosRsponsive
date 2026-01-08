interface MenuProps {
  onWordSearch: () => void
  onMemory: () => void
}

export default function Menu({ onWordSearch, onMemory }: MenuProps) {
  return (
    <div className="p-4 sm:p-8 min-h-[85vh]">
      {/* Título */}
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
          Elige tu juego
        </h2>
        <p className="text-gray-600 text-lg">Selecciona un desafío para tu mente 🎯</p>
      </div>

      {/* Grid de juegos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        
        {/* Card Sopa de Letras */}
        <div className="group bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-indigo-200">
          <div className="text-center">
            {/* Icono animado */}
            <div className="text-7xl mb-6 group-hover:scale-110 transition-transform duration-300">
              🔤
            </div>
            
            <h3 className="text-3xl font-bold text-indigo-900 mb-4">
              Sopa de Letras
            </h3>
            
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              Encuentra palabras escondidas en el tablero.
              <br />
              Desliza tu dedo o mouse para seleccionarlas.
            </p>

            {/* Etiquetas de características */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <span className="bg-white/70 px-3 py-1 rounded-full text-sm font-medium text-indigo-700">
                👆 Touch friendly
              </span>
              <span className="bg-white/70 px-3 py-1 rounded-full text-sm font-medium text-indigo-700">
                🎨 Visual
              </span>
            </div>

            {/* Botón */}
            <button
              onClick={onWordSearch}
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:from-indigo-700 hover:to-blue-700 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Jugar Ahora →
            </button>
          </div>
        </div>

        {/* Card Memorama */}
        <div className="group bg-gradient-to-br from-purple-50 to-pink-100 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-purple-200">
          <div className="text-center">
            {/* Icono animado */}
            <div className="text-7xl mb-6 group-hover:scale-110 transition-transform duration-300">
              🃏
            </div>
            
            <h3 className="text-3xl font-bold text-purple-900 mb-4">
              Memorama
            </h3>
            
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              Encuentra todas las parejas de cartas.
              <br />
              Pon a prueba tu memoria y concentración.
            </p>

            {/* Etiquetas de características */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <span className="bg-white/70 px-3 py-1 rounded-full text-sm font-medium text-purple-700">
                🧠 Memoria
              </span>
              <span className="bg-white/70 px-3 py-1 rounded-full text-sm font-medium text-purple-700">
                ⚡ Rápido
              </span>
            </div>

            {/* Botón */}
            <button
              onClick={onMemory}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:from-purple-700 hover:to-pink-700 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Jugar Ahora →
            </button>
          </div>
        </div>

      </div>

      {/* Footer decorativo */}
      <div className="text-center mt-16">
        <p className="text-gray-500 text-sm">
          Más juegos próximamente... 🎮✨
        </p>
      </div>
    </div>
  )
}