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
  const [isPlayerMoving, setIsPlayerMoving] = useState(false)
  const [activePlayerIndex, setActivePlayerIndex] = useState(0)
  const [activePlayer, setActivePlayer] = useState({})

  ///////////////////////////////////////////////////
  ////////// CREATE PLAYERS FROM DATA FILE //////////
  ///////////////////////////////////////////////////
  useEffect(() => {
    let activePlayers = []

    allPlayers.forEach((player) => {
      if (player.active) {
        activePlayers.push({ ...player, tile: tilesProvider.startTile })
      }
    })

    setPlayers(activePlayers)
    setActivePlayerIndex(0)
    console.log('SETTING ACTIVE PLAYER FROM LINE 31')
    setActivePlayer(activePlayers[0])

    // CREATE PLAYER ELEMENTS ON THE BOARD IF TILES ARE INITIALIZED
    let interval = setInterval(() => {
      if (document.getElementById('tile-0')) {
        activePlayers.forEach((player) => {
          createPlayerElement(activePlayers, player)
        })

        clearInterval(interval)
      }
    }, 300)
  }, [])

  ///////////////////////////////////////////////////
  /////////// ADD PLAYERS + ACTIVE PLAYER ///////////
  ///////////////////////////////////////////////////
  useEffect(() => {
    if (players && players.length > 0) {
      // SET ACTIVE PLAYER
      // console.log('SETTING ACTIVE PLAYER FROM LINE 129')
      // setActivePlayer(players[activePlayerIndex])

      players.forEach((player) => {
        createPlayerElement(players, player)
      })
    }
  }, [players])

  ///////////////////////////////////////////////////
  ///////////////// END ROUND LOGIC /////////////////
  ///////////////////////////////////////////////////
  const endRound = () => {
    setActivePlayerIndex(0)
    setPlayers([
      ...players.filter((item, index) => index !== 0),
      {
        ...players[0],
      },
    ])
  }

  ///////////////////////////////////////////////////
  ///////// DECREMENT ACTIVE PLAYER ACTIONS /////////
  ///////////////////////////////////////////////////
  const decrementAction = () => {
    let newPlayers = [...players]
    let updatedPlayer = {
      ...activePlayer,
      actions: activePlayer.actions - 1,
    }

    newPlayers.splice(activePlayerIndex, 1, updatedPlayer)

    setPlayers(newPlayers)
  }

  ///////////////////////////////////////////////////
  ////////////// UPDATE ACTIVE PLAYER ///////////////
  ///////////////////////////////////////////////////
  useEffect(() => {
    console.log('ACTIVE PLAYER INDEX CHANGED')
    let newPlayer = { ...players[activePlayerIndex], actions: 4 }
    if (players.length > 0) {
      console.log('SETTING ACTIVE PLAYER FROM LINE 96')
      setActivePlayer(newPlayer)
    }
  }, [activePlayerIndex])

  useEffect(() => {
    console.log('NEW ACTIVE PLAYER: ', activePlayer)
  }, [activePlayer])

  useEffect(() => {
    if (isPlayerMoving) {
      tilesProvider.setIsPlayerMoving(true)
      // tilesProvider.setTileToMoveFrom(activePlayer.tile)
    } else {
      tilesProvider.setIsPlayerMoving(false)
      tilesProvider.setTileToMoveTo(null)
    }
  }, [isPlayerMoving])

  useEffect(() => {
    if (tilesProvider.tileToMoveTo) {
      let newPlayers = [...players]
      let updatedPlayer = {
        ...activePlayer,
        tile: tilesProvider.tileToMoveTo,
        actions: activePlayer.actions - 1,
      }

      newPlayers.splice(activePlayerIndex, 1, updatedPlayer)

      setPlayers(newPlayers)

      setIsPlayerMoving(false)
      console.log('SETTING ACTIVE PLAYER FROM LINE 129')
      setActivePlayer(updatedPlayer)
    }
  }, [tilesProvider.tileToMoveTo])

  return (
    <PlayersContext.Provider
      value={{
        players: players,
        isPlayerMoving: isPlayerMoving,
        setIsPlayerMoving: setIsPlayerMoving,
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
