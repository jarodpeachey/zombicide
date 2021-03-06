import { useEffect } from 'react'
import { createContext, useContext, useState } from 'react'
import toast from 'react-hot-toast';
import allPlayers from '../data/players.json'
import { createPlayerElement } from '../utils/createPlayerElement'
import shuffle from '../utils/shuffle'
import { useTiles } from './TileProvider'
import { useZombies } from './ZombiesProvider'

export const PlayersContext = createContext({})

export default function PlayersProvider({ strings, children }) {
  const tilesProvider = useTiles()
  const zombiesProvider = useZombies()
  const [players, setPlayers] = useState([])
  const [isPlayerMoving, setIsPlayerMoving] = useState(false)
  const [isPlayerAttacking, setIsPlayerAttacking] = useState(false)
  const [activePlayerIndex, setActivePlayerIndex] = useState(0)
  const [activePlayer, setActivePlayer] = useState({})
  const [cardToAttackWith, setCardToAttackWith] = useState({})
  const [diceToDisplay, setDiceToDisplay] = useState([])
  const [messageToDisplay, setMessageToDisplay] = useState(
    'Choose your next action'
  )

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
      // setActivePlayer(players[activePlayerIndex])

      players.forEach((player) => {
        createPlayerElement(players, player)
      })
    }
  }, [players])

  ///////////////////////////////////////////////////
  ////////////// UPDATE ACTIVE PLAYER ///////////////
  ///////////////////////////////////////////////////
  useEffect(() => {
    let newPlayer = { ...players[activePlayerIndex], actions: 4 }
    if (players.length > 0) {
      setActivePlayer(newPlayer)
    }
  }, [activePlayerIndex])

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
      setActivePlayer(updatedPlayer)
      setMessageToDisplay('Choose your next action')
    }
  }, [tilesProvider.tileToMoveTo])

  useEffect(() => {
    if (tilesProvider.tileToAttack) {
      let zombiesInTile = zombiesProvider.zombies.filter(
        (item) => item.tile === tilesProvider.tileToAttack
      )

      let dice = []
      let attackDiceToDisplay = []
      let zombiesToKill = []
      let kills = 0
      let walkersKilled = 0
      let runnersKilled = 0
      let fattiesKilled = 0

      for (let i = 0; i < cardToAttackWith.dice; i++) {
        let number = Math.floor(Math.random() * (6 - 1 + 1)) + 1

        dice.push(number)
      }

      dice.forEach((die) => {
        let hit = false

        if (die >= cardToAttackWith.required) {
          let walkers = zombiesInTile.filter(
            (zombie) => zombie.type === 'walker'
          )
          let runners = zombiesInTile.filter(
            (zombie) => zombie.type === 'runner'
          )
          let fatties = zombiesInTile.filter(
            (zombie) => zombie.type === 'fattie'
          )
          if (walkers.length > 0) {
            if (walkers[walkersKilled]) {
              zombiesToKill.push(walkers[walkersKilled])
              toast.success("You killed a walker!")
            }
            hit = true
            kills += 1
            walkersKilled += 1
          } else if (fatties.length > 0 && cardToAttackWith.damage >= 2) {
            if (fatties[fattiesKilled]) {
              zombiesToKill.push(fatties[fattiesKilled])
              toast.success("You killed a fattie!")
            }
            hit = true
            kills += 1
            fattiesKilled += 1
          } else if (runners.length > 0) {
            if (runners[runnersKilled]) {
              zombiesToKill.push(runners[runnersKilled])
              toast.success("You killed a runner!")
            }
            hit = true
            kills += 1
            runnersKilled += 1
          }
        }

        attackDiceToDisplay.push({ type: hit ? 'hit' : 'miss', value: die })
      })

      // zombiesToKill.forEach((zombie) => {
        zombiesProvider.killZombies(zombiesToKill)
      // })

      setDiceToDisplay(attackDiceToDisplay)
      setMessageToDisplay(`You rolled ${dice.length} dice to attack: `)
      updatePlayerStats(true, kills)
      setIsPlayerAttacking(false)
      setCardToAttackWith({})
      // setDiceToDisplay(null)
    }
  }, [tilesProvider.tileToAttack])

  useEffect(() => {
    if (tilesProvider.tileToOpenDoor) {
      updatePlayerStats(true, 0)
      setMessageToDisplay('Choose your next action')
    }
  }, [tilesProvider.tileToOpenDoor])

  useEffect(() => {
    if (cardToAttackWith && isPlayerAttacking) {
    }
  }, [cardToAttackWith])

  useEffect(() => {
    if (isPlayerAttacking) {
    } else {
      setCardToAttackWith({})
    }
  }, [isPlayerAttacking])

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
  const updatePlayerStats = (actions = false, kills = 0) => {
    let newPlayers = [...players]
    let updatedPlayer = {
      ...activePlayer,
      actions: actions ? activePlayer.actions - 1 : activePlayer.actions,
      kills: activePlayer.kills + kills,
    }

    newPlayers.splice(activePlayerIndex, 1, updatedPlayer)

    setPlayers(newPlayers)

    setIsPlayerMoving(false)
    setActivePlayer(updatedPlayer)
  }

  const clearMessages = () => {
    setDiceToDisplay([])
  }

  return (
    <PlayersContext.Provider
      value={{
        players: players,
        isPlayerMoving: isPlayerMoving,
        setIsPlayerMoving: setIsPlayerMoving,
        isPlayerAttacking: isPlayerAttacking,
        setIsPlayerAttacking: setIsPlayerAttacking,
        cardToAttackWith: cardToAttackWith,
        setCardToAttackWith: setCardToAttackWith,
        activePlayer: activePlayer,
        setActivePlayer: setActivePlayer,
        activePlayerIndex: activePlayerIndex,
        setActivePlayerIndex: setActivePlayerIndex,
        endRound: endRound,
        updatePlayerStats: updatePlayerStats,
        diceToDisplay: diceToDisplay,
        messageToDisplay: messageToDisplay,
        setMessageToDisplay: setMessageToDisplay,
        clearMessages: clearMessages,
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
