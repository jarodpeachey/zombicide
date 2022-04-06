import { useEffect } from 'react'
import { createContext, useContext, useState } from 'react'
import allPlayers from '../data/players.json'
import { createPlayerElement } from '../utils/createPlayerElement'
import shuffle from '../utils/shuffle'
import { useTiles } from './TileProvider'

export const PlayersContext = createContext({})

export default function PlayersProvider({ strings, children }) {
  const tilesProvider = useTiles()
  const [players, setPlayers] = useState([])
  const [playerMoving, setPlayerMoving] = useState(false)
  const [activePlayerIndex, setActivePlayerIndex] = useState(0)
  // const [actionsRemaining, setActivePlayerIndex] = useState(0)
  const [activePlayer, setActivePlayer] = useState({})

  useEffect(() => {
    let activePlayers = []
    allPlayers.forEach((player) => {
      if (player.active) {
        activePlayers.push({ ...player, tile: tilesProvider.startTile })
      }
    })

    setPlayers(activePlayers)
    setActivePlayerIndex(0)
    setActivePlayer(activePlayers[0])
  }, [])

  const endRound = () => {
    setPlayers([
      ...players.filter((item, index) => index !== 0),
      {
        ...players[0],
      },
    ])
    setActivePlayerIndex(0)
    alert('A new round begins!')
  }

  const decrementAction = () => {
    let newPlayers = [...players]
    let updatedPlayer = {
      ...activePlayer,
      actions: activePlayer.actions - 1,
    }

    console.log('Players before move: ', players)
    newPlayers.splice(activePlayerIndex, 1, updatedPlayer)
    console.log('Players after splice: ', newPlayers)

    setPlayers(newPlayers)
    // setActivePlayer(updatedPlayer)
  }

  useEffect(() => {
    console.log(players[activePlayerIndex])

    if (activePlayerIndex) {
      setActivePlayer({ ...players[activePlayerIndex], actions: 4 })
    }
  }, [activePlayerIndex])

  useEffect(() => {
    if (playerMoving) {
      tilesProvider.setPlayerMoving(true)
      // tilesProvider.setTileToMoveFrom(activePlayer.tile)
    } else {
      tilesProvider.setPlayerMoving(false)
      tilesProvider.setTileToMoveTo(null)
    }
  }, [playerMoving])

  useEffect(() => {
    if (tilesProvider.tileToMoveTo) {
      let newPlayers = [...players]
      let updatedPlayer = {
        ...activePlayer,
        tile: tilesProvider.tileToMoveTo,
        actions: activePlayer.actions - 1,
      }

      // newPlayers.push(newPlayers.pop(activePlayerIndex))

      console.log('Players before move: ', players)
      // newPlayers.splice(activePlayerIndex, 1)
      // console.log("Players after pop: ", newPlayers)
      newPlayers.splice(activePlayerIndex, 1, updatedPlayer)
      console.log('Players after splice: ', newPlayers)

      setPlayers(newPlayers)
      // setActivePlayer(updatedPlayer)

      setPlayerMoving(false)
      setActivePlayer({ ...activePlayer, tile: tilesProvider.tileToMoveTo })
    } else {
      console.log(activePlayer)
    }
  }, [tilesProvider.tileToMoveTo])

  useEffect(() => {
    if (players && players.length > 0) {
      // SET ACTIVE PLAYER
      setActivePlayer(players[activePlayerIndex])

      // SET PLAYER POSITION
      // const playerElements = document.querySelectorAll('.player')
      players.forEach((player) => {
        createPlayerElement(players, player)
      })
    }
  }, [players])

  return (
    <PlayersContext.Provider
      value={{
        players: players,
        playerMoving: playerMoving,
        setPlayerMoving: setPlayerMoving,
        activePlayer: activePlayer,
        setActivePlayer: setActivePlayer,
        activePlayerIndex: activePlayerIndex,
        setActivePlayerIndex: setActivePlayerIndex,
        endRound: endRound,
        decrementAction: decrementAction,
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
