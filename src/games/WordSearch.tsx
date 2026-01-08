import { useState } from "react"

export default function WordSearch() {
  const words = ["REACT", "TAILWIND", "TYPESCRIPT", "HTML", "CSS"]
  const gridSize = 10
  
  // Generar el tablero
  const [grid] = useState(() => {
    const g: string[][] = Array(gridSize).fill(null).map(() => Array(gridSize).fill(""))
    
    // Colocar palabras horizontalmente
    words.forEach((word, idx) => {
      const row = idx * 2
      const startCol = Math.floor(Math.random() * (gridSize - word.length))
      for (let i = 0; i < word.length; i++) {
        g[row][startCol + i] = word[i]
      }
    })
    
    // Rellenar con letras aleatorias
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (!g[i][j]) {
          g[i][j] = letters[Math.floor(Math.random() * letters.length)]
        }
      }
    }
    
    return g
  })
  
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [found, setFound] = useState<Set<string>>(new Set())
  const [selecting, setSelecting] = useState(false)

  const handleStart = (row: number, col: number) => {
    setSelecting(true)
    setSelected(new Set([`${row}-${col}`]))
  }

  const handleMove = (row: number, col: number) => {
    if (selecting) {
      setSelected(prev => new Set(prev).add(`${row}-${col}`))
    }
  }

  const handleEnd = () => {
    // Verificar si se encontró una palabra
    const selectedLetters = Array.from(selected).sort().map(pos => {
      const [r, c] = pos.split("-").map(Number)
      return grid[r][c]
    }).join("")
    
    const foundWord = words.find(w => selectedLetters.includes(w))
    if (foundWord && !found.has(foundWord)) {
      setFound(prev => new Set(prev).add(foundWord))
    }
    
    setSelecting(false)
    setSelected(new Set())
  }

  const resetGame = () => {
    setFound(new Set())
    setSelected(new Set())
  }

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto">
      {/* Encabezado */}
      <div className="text-center mb-8">
        <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
          Sopa de Letras
        </h2>
        <p className="text-gray-600 text-lg">
          Arrastra para seleccionar las palabras 🔤
        </p>
      </div>

      {/* Panel de palabras */}
      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl shadow-xl p-6 mb-8 border-2 border-indigo-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-xl text-indigo-900">
            Palabras a encontrar:
          </h3>
          <button
            onClick={resetGame}
            className="bg-white hover:bg-gray-50 px-4 py-2 rounded-xl font-semibold text-indigo-600 transition-all active:scale-95 shadow-md"
          >
            Reiniciar 🔄
          </button>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {words.map(word => (
            <div
              key={word}
              className={`px-5 py-3 rounded-xl text-base font-bold transition-all duration-300 ${
                found.has(word)
                  ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white scale-105 shadow-lg"
                  : "bg-white text-indigo-700 shadow-md"
              }`}
            >
              {found.has(word) && "✓ "}
              {word}
            </div>
          ))}
        </div>

        {/* Progreso */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-indigo-700 font-medium mb-2">
            <span>Progreso</span>
            <span>{found.size} / {words.length}</span>
          </div>
          <div className="w-full bg-indigo-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-blue-500 h-full transition-all duration-500 rounded-full"
              style={{ width: `${(found.size / words.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Tablero */}
      <div 
        className="bg-white rounded-3xl shadow-2xl p-4 sm:p-8 overflow-auto border-2 border-gray-200"
        onMouseLeave={handleEnd}
        onTouchEnd={handleEnd}
      >
        <div 
          className="grid gap-1 sm:gap-2" 
          style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
        >
          {grid.map((row, i) =>
            row.map((letter, j) => {
              const isSelected = selected.has(`${i}-${j}`)
              return (
                <div
                  key={`${i}-${j}`}
                  className={`aspect-square flex items-center justify-center text-sm sm:text-base md:text-lg font-black rounded-lg cursor-pointer select-none transition-all duration-200 ${
                    isSelected
                      ? "bg-gradient-to-br from-indigo-500 to-blue-500 text-white scale-95 shadow-lg"
                      : "bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700 hover:from-gray-100 hover:to-gray-200 hover:scale-105 shadow-md"
                  }`}
                  onMouseDown={() => handleStart(i, j)}
                  onMouseEnter={() => handleMove(i, j)}
                  onTouchStart={() => handleStart(i, j)}
                  onTouchMove={(e) => {
                    const touch = e.touches[0]
                    const element = document.elementFromPoint(touch.clientX, touch.clientY)
                    if (element && element.getAttribute("data-pos")) {
                      const [r, c] = element.getAttribute("data-pos")!.split("-").map(Number)
                      handleMove(r, c)
                    }
                  }}
                  data-pos={`${i}-${j}`}
                >
                  {letter}
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* Modal de victoria */}
      {found.size === words.length && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center animate-bounce">
            <div className="text-7xl mb-4">🎉</div>
            <h3 className="text-3xl font-bold text-green-600 mb-4">
              ¡Felicidades!
            </h3>
            <p className="text-xl text-gray-700 mb-6">
              Encontraste todas las palabras
            </p>
            <button
              onClick={resetGame}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-xl font-bold hover:from-green-600 hover:to-emerald-600 active:scale-95 transition-all shadow-lg text-lg"
            >
              Jugar de nuevo 🔄
            </button>
          </div>
        </div>
      )}
    </div>
  )
}