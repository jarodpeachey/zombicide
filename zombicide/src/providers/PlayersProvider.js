import { useEffect } from 'react'
import { createContext, useContext, useState } from 'react'
import allPlayers from '../data/players.json'
import shuffle from '../utils/shuffle'
import { useTiles } from './TileProvider'

export const PlayersContext = createContext({})

export default function PlayersProvider({ strings, children }) {
  const tilesProvider = useTiles()
  const [players, setPlayers] = useState([])
  const [playerMoving, setPlayerMoving] = useState(false)
  const [activePlayerIndex, setActivePlayerIndex] = useState(0)
  const [activePlayer, setActivePlayer] = useState({})

  useEffect(() => {
    console.log('RUNNING USE EFFECT')
    let activePlayers = []
    allPlayers.forEach((player) => {
      if (player.active) {
        activePlayers.push({ ...player, tile: tilesProvider.startTile })
      }
    })

    setPlayers(activePlayers)
    setActivePlayerIndex(0)
    setActivePlayer(activePlayers[0])
    // console.log(activePlayers[0]);

    setTimeout(() => {
      sessionStorage.setItem('initialized', true)
    }, [1000])
    // }
  }, [])

  useEffect(() => {
    if (players && players.length > 0 && activePlayerIndex) {
      console.log('ACTIVE PLAYER INDEX: ', activePlayerIndex)
      console.log('ACTIVE PLAYER INDEX PLAYER: ', players[activePlayerIndex])
    }
  }, [activePlayerIndex])

  useEffect(() => {
    console.log('ACTIVE PLAYER: ', activePlayer)
  }, [activePlayer])

  useEffect(() => {
    if (playerMoving) {
      console.log('MOVING PLAYER: ', activePlayer)
      tilesProvider.setPlayerMoving(true)
      tilesProvider.setTileToMoveFrom(activePlayer.tile)
    }
  }, [playerMoving])

  useEffect(() => {
    if (tilesProvider.tileToMoveTo) {
      setPlayers([
        ...players.filter((player) => player.name !== activePlayer.name),
        { ...activePlayer, tile: tilesProvider.tileToMoveTo },
      ])
      setPlayerMoving(false)
      tilesProvider.setPlayerMoving(false)
      tilesProvider.setTileToMoveTo(null)
    }
  }, [tilesProvider.tileToMoveTo])

  return (
    <PlayersContext.Provider
      value={{
        players: players,
        playerMoving: playerMoving,
        setPlayerMoving: setPlayerMoving,
        activePlayer: activePlayer,
        setActivePlayer: setActivePlayer,
      }}
    >
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
