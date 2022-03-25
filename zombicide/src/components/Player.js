import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { createContext } from 'react'

const Player = ({ player }) => {
  const PlayerContext = createContext({})

  const [name, setName] = useState(player.name)
  const [kills, setKills] = useState(player.kills)
  const [level, setLevel] = useState(player.level)
  const [hand, setHand] = useState(player.hand)
  const [backpack, setBackpack] = useState(player.backpack)

  function PlayerProvider({ strings, children }) {
    return (
      <PlayerContext.Provider
        value={{
          name: name,
          kills: kills,
          level: level,
          hand: hand,
          backpack: backpack,
        }}
      >
        {children}
      </PlayerContext.Provider>
    )
  }

  return (
    <PlayerProvider>
      <Inner context={PlayerContext} />
    </PlayerProvider>
  )
}

const Inner = ({ context }) => {
  const player = useContext(context)
  console.log('Player: ', player)
  return <div className="player">{player.name}</div>
}

export default Player
