import { useState } from "react"
import Home from "./pages/Home"
import Menu from "./pages/Menu"
import WordSearch from "./games/WordSearch"
import MemoryGame from "./games/MemoryGame"

type Page = "home" | "menu" | "word" | "memory"

function App() {
  const [page, setPage] = useState<Page>("home")

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Navbar mejorado */}
      <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-4 shadow-2xl sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-2xl">🧠</span>
            <h1 className="font-black text-xl sm:text-2xl tracking-tight">
              BrainPlay
            </h1>
          </div>
          
          {/* Botones de navegación */}
          <div className="flex gap-2 sm:gap-3">
            <button
              onClick={() => setPage("home")}
              className={`px-4 py-2 sm:px-6 sm:py-2 rounded-xl font-bold transition-all duration-300 ${
                page === "home"
                  ? "bg-white text-indigo-600 shadow-lg scale-105"
                  : "bg-white/20 hover:bg-white/30 active:scale-95"
              }`}
            >
              <span className="hidden sm:inline">Home</span>
              <span className="sm:hidden">🏠</span>
            </button>
            <button
              onClick={() => setPage("menu")}
              className={`px-4 py-2 sm:px-6 sm:py-2 rounded-xl font-bold transition-all duration-300 ${
                page === "menu"
                  ? "bg-white text-purple-600 shadow-lg scale-105"
                  : "bg-white/20 hover:bg-white/30 active:scale-95"
              }`}
            >
              <span className="hidden sm:inline">Juegos</span>
              <span className="sm:hidden">🎮</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Contenido de las páginas */}
      <div className="min-h-[calc(100vh-80px)]">
        {page === "home" && <Home onStart={() => setPage("menu")} />}
        {page === "menu" && (
          <Menu
            onWordSearch={() => setPage("word")}
            onMemory={() => setPage("memory")}
          />
        )}
        {page === "word" && <WordSearch />}
        {page === "memory" && <MemoryGame />}
      </div>

      {/* Footer opcional */}
      {page === "home" && (
        <footer className="text-center py-6 text-gray-500 text-sm">
          <p>Hecho con ❤️ usando React + TypeScript + Tailwind CSS</p>
        </footer>
      )}
    </div>
  )
}

export default App