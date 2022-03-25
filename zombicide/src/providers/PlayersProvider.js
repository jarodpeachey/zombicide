import { useEffect } from 'react'
import { createContext, useContext, useState } from 'react'
import allPlayers from '../data/players.json'
import shuffle from '../utils/shuffle'

export const PlayersContext = createContext({})

export default function PlayersProvider({ strings, children }) {
  const [players, setPlayers] = useState([])
  useEffect(() => {
    let activePlayers = []
    allPlayers.forEach((player) => {
      if (player.active) {
        activePlayers.push(player)
      }
    })

    setPlayers(activePlayers)
  }, [])

  return (
    <PlayersContext.Provider value={{ players: players }}>
      {children}
    </PlayersContext.Provider>
  )
}

export function usePlayers() {
  const context = useContext(PlayersContext)
  if (context === undefined) {
    throw new Error('usePlayers() must be used within an PlayersProvider')
  }
  return context
}
