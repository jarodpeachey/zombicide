import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import { usePlayers } from '../providers/PlayersProvider'
import { useTiles } from '../providers/TileProvider'

const PlayerToken = ({ player, tile }) => {
  // const player = useContext(context)
  const players = usePlayers()

  console.log(tile, player.tile);
  return (
    <div
      className={`player ${tile === player.tile && 'active'}`}
      onClick={() => {
        console.log('onPlayerClick')
        players.setPlayerToMove(player)
      }}
    >
      {player.name}
    </div>
  )
}

const Inner = ({ context, players, active }) => {}

export default PlayerToken
