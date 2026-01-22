// src/games/MemoryGame.tsx
import { useEffect, useRef, useState } from "react"

type Card = {
  id: number
  emoji: string
  flipped: boolean
  matched: boolean
}

export default function MemoryGame() {
  const emojis = ["🎮", "🎯", "🎲", "🎪", "🎨", "🎭", "🎸", "🎺"]

  const createShuffledCards = (): Card[] => {
    const pairs = [...emojis, ...emojis]
    return pairs
      .sort(() => Math.random() - 0.5)
      .map((emoji, idx) => ({
        id: idx,
        emoji,
        flipped: false,
        matched: false,
      }))
  }

  const [gameCards, setGameCards] = useState<Card[]>(createShuffledCards)
  const [flipped, setFlipped] = useState<number[]>([])
  const [moves, setMoves] = useState(0)

  // ⏱️ Tiempo
  const startTimeRef = useRef<number | null>(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [endTime, setEndTime] = useState<number | null>(null)

  useEffect(() => {
    startTimeRef.current = Date.now()

    const interval = setInterval(() => {
      if (startTimeRef.current && endTime === null) {
        setElapsedTime(Math.floor((Date.now() - startTimeRef.current) / 1000))
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [endTime])

  const handleCardClick = (id: number) => {
    if (flipped.length === 2 || gameCards[id].flipped || gameCards[id].matched) return

    const newFlipped = [...flipped, id]
    setFlipped(newFlipped)

    setGameCards((prev) => prev.map((card) => (card.id === id ? { ...card, flipped: true } : card)))

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1)
      const [first, second] = newFlipped

      if (gameCards[first].emoji === gameCards[second].emoji) {
        // ✅ Coinciden
        setTimeout(() => {
          setGameCards((prev) => {
            const updated = prev.map((card) =>
              card.id === first || card.id === second ? { ...card, matched: true } : card
            )
            if (updated.every((c) => c.matched)) setEndTime(Date.now())
            return updated
          })
          setFlipped([])
        }, 600)
      } else {
        // ❌ No coinciden
        setTimeout(() => {
          setGameCards((prev) =>
            prev.map((card) =>
              card.id === first || card.id === second ? { ...card, flipped: false } : card
            )
          )
          setFlipped([])
        }, 1000)
      }
    }
  }

  const resetGame = () => {
    setGameCards(createShuffledCards())
    setFlipped([])
    setMoves(0)
    setElapsedTime(0)
    setEndTime(null)
    startTimeRef.current = Date.now()
  }

  const formattedTime = `${Math.floor(elapsedTime / 60)}:${(elapsedTime % 60)
    .toString()
    .padStart(2, "0")}`

  const allMatched = gameCards.every((card) => card.matched)

  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Memorama
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">Encuentra todas las parejas 🃏</p>
      </div>

      {/* Layout: mobile (columna) / desktop (2 columnas) */}
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 lg:gap-10 items-start">
        {/* LEFT: Stats + Actions */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl shadow-xl p-4 sm:p-6 border-2 border-purple-200">
            {/* En móvil: 3 columnas; en desktop: 1 columna */}
            <div className="grid grid-cols-3 lg:grid-cols-1 gap-3">
              <div className="bg-white rounded-2xl p-3 sm:p-4 text-center shadow-lg">
                <div className="text-2xl sm:text-3xl font-black text-purple-600">{moves}</div>
                <div className="text-xs sm:text-sm font-semibold text-gray-600">Movimientos</div>
              </div>

              <div className="bg-white rounded-2xl p-3 sm:p-4 text-center shadow-lg">
                <div className="text-2xl sm:text-3xl font-black text-pink-600">{formattedTime}</div>
                <div className="text-xs sm:text-sm font-semibold text-gray-600">Tiempo</div>
              </div>

              <div className="bg-white rounded-2xl p-3 sm:p-4 text-center shadow-lg">
                <div className="text-2xl sm:text-3xl font-black text-indigo-600">
                  {gameCards.filter((c) => c.matched).length / 2}/{emojis.length}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-gray-600">Parejas</div>
              </div>
            </div>

            <button
              onClick={resetGame}
              className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-3 rounded-xl font-bold shadow-lg hover:from-purple-700 hover:to-pink-700 text-sm sm:text-base"
            >
              Nuevo Juego 🔄
            </button>
          </div>
        </div>

        {/* RIGHT: Board */}
        <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-200">
          <div className="p-4 sm:p-6">
            {/* tope de ancho del tablero para que no se vea gigante */}
            <div className="mx-auto w-full max-w-[640px]">
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {gameCards.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => handleCardClick(card.id)}
                    className="aspect-square cursor-pointer perspective-1000"
                  >
                    <div
                      className={`relative w-full h-full transition-all duration-500 transform-style-3d ${
                        card.flipped || card.matched ? "rotate-y-180" : ""
                      }`}
                    >
                      {/* Back */}
                      <div className="absolute w-full h-full rounded-2xl flex items-center justify-center text-3xl sm:text-4xl backface-hidden bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-xl">
                        {!card.flipped && !card.matched && "?"}
                      </div>

                      {/* Front */}
                      <div className="absolute w-full h-full rounded-2xl flex items-center justify-center text-4xl sm:text-5xl backface-hidden rotate-y-180 bg-white border-4 border-purple-400 shadow-xl">
                        {card.emoji}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Win Modal */}
      {allMatched && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 text-center shadow-2xl w-full max-w-md">
            <div className="text-6xl sm:text-7xl mb-4">🎉</div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">¡Ganaste!</h3>
            <p className="text-base sm:text-lg mb-5 sm:mb-6">
              Movimientos: {moves} <br />
              Tiempo: {formattedTime}
            </p>
            <button
              onClick={resetGame}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-7 py-3 sm:px-8 sm:py-4 rounded-xl font-bold text-sm sm:text-base"
            >
              Jugar otra vez 🔄
            </button>
          </div>
        </div>
      )}

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  )
}
