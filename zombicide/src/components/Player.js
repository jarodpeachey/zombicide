import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import { usePlayers } from '../providers/PlayersProvider'
import { useTiles } from '../providers/TileProvider'

const Player = ({ player, tile: parentTile }) => {
  const PlayerContext = createContext({})
  const tileProvider = useTiles()
  const playersProvider = usePlayers()

  const [name, setName] = useState(player.name)
  const [kills, setKills] = useState(player.kills)
  const [level, setLevel] = useState(player.level)
  const [hand, setHand] = useState(player.hand)
  const [backpack, setBackpack] = useState(player.backpack)
  const [tile, setTile] = useState(player.tile)

  const calculatePlayerPosition = () => {
    let left = 0
    let top = 0
    // let playersInTile = playersProvider.players

    // console.log(playersInTile)

    return {
      left: `${left}px`,
      top: `${top}px`,
    }
  }

  // UPDATE POSITION OF PLAYER ON TILE CHANGE
  useEffect(() => {
    // document
    //   .getElementById(`tile-${tile}`)
    //   .querySelector(
    //     '.tile__players'
    //   ).innerHTML += `<div class="player">${name}</div>`

    playersProvider.players.forEach((item) => {
      let newItem = document.getElementById(`${item.name.toLowerCase()}`)

      newItem.addEventListener('click', () => {
        playersProvider.setPlayerToMove(item)
      })
    })
  }, [])

  if (name !== '') {
    const playerElement = document.getElementById(`${name.toLowerCase()}`)
    const tileElement = document.getElementById(`tile-${tile}`)
    console.log(tileElement)
    let top = tileElement.getBoundingClientRect().top
    let left = tileElement.getBoundingClientRect().left
    // let playerPosition = calculatePlayerPosition()
    playerElement.style.left = `${left}px`
    playerElement.style.top = `${top}px`
  }

  // useEffect(() => {
  //   if (tileProvider.playerToMove && tileProvider.playerToMove.name === name) {
  //     setTile(tileProvider.tileToMoveTo)
  //   }
  // }, [tileProvider.tileToMoveTo])

  useEffect(() => {
    if (
      player.name !== name ||
      player.kills !== kills ||
      player.level !== level ||
      player.backpack !== backpack ||
      player.hand !== hand ||
      player.tile !== tile
    ) {
      // playersProvider.updatePlayer({
      //   ...player,
      //   name: name,
      //   kills: kills,
      //   tile: tile,
      //   backpack: backpack,
      //   hand: hand,
      //   level: level,
      // })
    }
  }, [])

  function PlayerProvider({ strings, children }) {
    return (
      <PlayerContext.Provider
        value={{
          name: name,
          kills: kills,
          level: level,
          hand: hand,
          backpack: backpack,
          tile: tile,
        }}
      >
        {children}
      </PlayerContext.Provider>
    )
  }

  return (
    <PlayerProvider>
      <Inner playersProvider={playersProvider} player={player} />
    </PlayerProvider>
  )
}

const Inner = ({ context, playersProvider, active, player }) => {
  return (
    <div
      id={player.name.toLowerCase()}
      className={`player ${active && 'active'}`}
    >
      {player.name}
    </div>
  )
}

export default Player
