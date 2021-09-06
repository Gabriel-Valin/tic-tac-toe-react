import React, { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'

type Players = "O" | "X"

function App() {

  const [turn, setTurn] = useState<Players>("O")
  const [winner, setWinner] = useState<Players | null>(null)
  const [draw, setDraw] = useState<boolean | null>(null)
  const [marker, setMarkers] = useState<{ [key: string]: Players }>({})
  const gameOver = !!winner || !!draw 

  const getSquareds = () => {
    return new Array(9).fill(true)
  }

  const play = (index: number) => {

    if (marker[index] || gameOver) {
      return;
    }

    setMarkers(prev => ({  ...prev, [index]: turn }))
    setTurn(prev => prev === 'O' ? 'X' : "O")
  }

  const getCellPlayer = (index: number) => {
    if (!marker[index]) {
      return;
    }

    return marker[index]
  }

  const getWinner = () => {
    const victoryLines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],

      [0,4,8],
      [2,4,6],
      [0,3,6],

      [1,4,7],
      [2,5,8]
    ]

    for (const line of victoryLines) {
      const [a,b,c] = line

      if (marker[a] && marker[a] === marker[b] && marker[a] === marker[c]) {
        return marker[a]
      }

    }
  }

  const reset = () => {
    setTurn(marker[0] === "O" ? "X" : "O")
    setMarkers({})
    setWinner(null)
    setDraw(null)
  }

  useEffect(() => {
    const winner = getWinner()

    if (winner) {
      setWinner(winner)
    } else {
      if (Object.keys(marker).length === 9) {
        setDraw(true)
      }
    }
  }, [marker])

  return (
    <div className="container">
      {winner && <h1>{winner} ganhou</h1>}

      {draw && <h1>Empate</h1> }

      {gameOver && <button onClick={reset}>Jogar Novamente</button>}
      {!gameOver && <p>é a vez de {turn}</p>}

      <div className={`board ${gameOver ? "gameOver" : "board"}`}>
      {getSquareds().map((_, i) => (
        <div className={`cell ${getCellPlayer(i)}`} onClick={() => play(i)}>{marker[i]}</div>
      ))}
      </div>
    </div>
  )
}

export default App
