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

  // ⏱️ Tiempo (sin funciones impuras en render)
  const startTimeRef = useRef<number | null>(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [endTime, setEndTime] = useState<number | null>(null)

  // Iniciar contador
  useEffect(() => {
    startTimeRef.current = Date.now()

    const interval = setInterval(() => {
      if (startTimeRef.current && endTime === null) {
        setElapsedTime(
          Math.floor((Date.now() - startTimeRef.current) / 1000)
        )
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [endTime])

  const handleCardClick = (id: number) => {
    if (
      flipped.length === 2 ||
      gameCards[id].flipped ||
      gameCards[id].matched
    ) {
      return
    }

    const newFlipped = [...flipped, id]
    setFlipped(newFlipped)

    setGameCards(prev =>
      prev.map(card =>
        card.id === id ? { ...card, flipped: true } : card
      )
    )

    if (newFlipped.length === 2) {
      setMoves(m => m + 1)
      const [first, second] = newFlipped

      if (gameCards[first].emoji === gameCards[second].emoji) {
        // ✅ Coinciden
        setTimeout(() => {
          setGameCards(prev => {
            const updated = prev.map(card =>
              card.id === first || card.id === second
                ? { ...card, matched: true }
                : card
            )

            if (updated.every(c => c.matched)) {
              setEndTime(Date.now())
            }

            return updated
          })
          setFlipped([])
        }, 600)
      } else {
        // ❌ No coinciden
        setTimeout(() => {
          setGameCards(prev =>
            prev.map(card =>
              card.id === first || card.id === second
                ? { ...card, flipped: false }
                : card
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

  const formattedTime = `${Math.floor(elapsedTime / 60)}:${(
    elapsedTime % 60
  )
    .toString()
    .padStart(2, "0")}`

  const allMatched = gameCards.every(card => card.matched)

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
          Memorama
        </h2>
        <p className="text-gray-600 text-lg">
          Encuentra todas las parejas 🃏
        </p>
      </div>

      {/* Stats */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl shadow-xl p-6 mb-8 border-2 border-purple-200">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-4 text-center shadow-lg">
            <div className="text-3xl font-black text-purple-600">
              {moves}
            </div>
            <div className="text-sm font-semibold text-gray-600">
              Movimientos
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 text-center shadow-lg">
            <div className="text-3xl font-black text-pink-600">
              {formattedTime}
            </div>
            <div className="text-sm font-semibold text-gray-600">
              Tiempo
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 text-center shadow-lg">
            <div className="text-3xl font-black text-indigo-600">
              {gameCards.filter(c => c.matched).length / 2}/{emojis.length}
            </div>
            <div className="text-sm font-semibold text-gray-600">
              Parejas
            </div>
          </div>
        </div>

        <button
          onClick={resetGame}
          className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:from-purple-700 hover:to-pink-700"
        >
          Nuevo Juego 🔄
        </button>
      </div>

      {/* Board */}
      <div className="bg-white rounded-3xl shadow-2xl p-4 sm:p-8 border-2 border-gray-200">
        <div className="grid grid-cols-4 gap-3">
          {gameCards.map(card => (
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
                <div className="absolute w-full h-full rounded-2xl flex items-center justify-center text-4xl backface-hidden bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-xl">
                  {!card.flipped && !card.matched && "?"}
                </div>

                <div className="absolute w-full h-full rounded-2xl flex items-center justify-center text-5xl backface-hidden rotate-y-180 bg-white border-4 border-purple-400 shadow-xl">
                  {card.emoji}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Win Modal */}
      {allMatched && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 text-center shadow-2xl">
            <div className="text-7xl mb-4">🎉</div>
            <h3 className="text-3xl font-bold mb-4">¡Ganaste!</h3>
            <p className="text-lg mb-6">
              Movimientos: {moves} <br />
              Tiempo: {formattedTime}
            </p>
            <button
              onClick={resetGame}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-bold"
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
