import { useEffect } from 'react'
import { createContext, useContext, useState } from 'react'
import allPlayers from '../data/players.json'
import shuffle from '../utils/shuffle'
import { useTiles } from './TileProvider'

export const PlayersContext = createContext({})

export default function PlayersProvider({ strings, children }) {
  const tilesProvider = useTiles()
  const [players, setPlayers] = useState([])
  const [playerToMove, setPlayerToMove] = useState(null)

  // const updatePlayer = (playerToUpdate) => {
  //   setTimeout(() => {
  //     console.log('UPDATING PLAYER: ', playerToUpdate.name)
  //     console.log("PLAYERS: ", players)

  //     let newArray = players.filter((player) => player.name !== playerToUpdate.name)

  //     // console.log(newArray);

  //     setPlayers([
  //       ...newArray,
  //       playerToUpdate,
  //     ])
  //   }, 200)
  // }

  useEffect(() => {
    // console.log(sessionStorage.getItem('initialized'));
    // if (!sessionStorage.getItem('initialized')) {
    console.log('RUNNING USE EFFECT')
    let activePlayers = []
    allPlayers.forEach((player) => {
      if (player.active) {
        activePlayers.push({ ...player, tile: tilesProvider.startTile })
      }
    })

    setPlayers(activePlayers)

    setTimeout(() => {
      sessionStorage.setItem('initialized', true)
    }, [1000])
    // }
  }, [])

  useEffect(() => {
    if (playerToMove && playerToMove.name && playerToMove.name !== '') {
      console.log('MOVING PLAYER: ', playerToMove)
      tilesProvider.setPlayerMoving(true)
    }
  }, [playerToMove])

  useEffect(() => {
    if (tilesProvider.tileToMoveTo) {
      setPlayers([
        ...players.filter((player) => player.name !== playerToMove.name),
        { ...playerToMove, tile: tilesProvider.tileToMoveTo },
      ])
      setPlayerToMove(null)
      tilesProvider.setPlayerMoving(false)
      tilesProvider.setTileToMoveTo(null)
    }
  }, [tilesProvider.tileToMoveTo])

  return (
    <PlayersContext.Provider
      value={{
        players: players,
        setPlayerToMove: setPlayerToMove,
        playerToMove: playerToMove,
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
