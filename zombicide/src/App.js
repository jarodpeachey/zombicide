/* eslint-disable no-restricted-globals */
import React from 'react'
import { useTiles } from './providers/TileProvider'
import { usePlayers } from './providers/PlayersProvider'
import './style.css'
import building_1 from './images/building_1.JPG'
import building_2 from './images/building_2.JPG'
import building_3 from './images/building_3.JPG'
import building_4 from './images/building_4.JPG'
import building_5 from './images/building_5.JPG'
import building_6 from './images/building_6.JPG'
import building_7 from './images/building_7.JPG'
import building_8 from './images/building_8.JPG'
import road_vertical from './images/road_vertical.jpg'
import road_horizontal from './images/road_horizontal.jpg'
import road_left_top from './images/road_left_top.jpg'
import road_left_bottom from './images/road_left_bottom.jpg'
import road_right_top from './images/road_right_top.jpg'
import road_right_bottom from './images/road_right_bottom.jpg'
import road_triple_left from './images/road_triple_left.jpg'
import road_triple_right from './images/road_triple_right.jpg'
import Player from './components/Player'
import PlayerToken from './components/PlayerToken'
import { useEffect } from 'react'

function App() {
  const app = useTiles()
  const { players, setPlayerToMove, playerToMove } = usePlayers()
  const { playerMoving, setTileToMoveTo } = useTiles()

  const getImage = (path) => {
    if (path === 1) return building_1
    if (path === 2) return building_2
    if (path === 3) return building_3
    if (path === 4) return building_4
    if (path === 5) return building_5
    if (path === 6) return building_6
    if (path === 7) return building_7
    if (path === 8) return building_8

    if (path === 'vertical') return road_vertical
    if (path === 'horizontal') return road_horizontal
    if (path === 'left_top') return road_left_top
    if (path === 'left_bottom') return road_left_bottom
    if (path === 'right_top') return road_right_top
    if (path === 'right_bottom') return road_right_bottom
    if (path === 'triple_left') return road_triple_left
    if (path === 'triple_right') return road_triple_right
  }

  // useEffect(() => {
  //   players.forEach((item) => {
  //     let newItem = document.getElementById(`${item.name.toLowerCase()}`)

  //     newItem.addEventListener('click', () => {
  //       setPlayerToMove(item)
  //     })
  //   })
  // }, [])

  const calculateLeft = (player) => {
    // if (name !== '') {
    const playerElement = document.getElementById(
      `${player.name.toLowerCase()}`
    )
    const tileElement = document.getElementById(`tile-${player.tile}`)

    let top = 0
    let left = 0

    if (tileElement) {
      top = tileElement.getBoundingClientRect().top
      left = tileElement.getBoundingClientRect().left
    }

    return left || 0
  }
  const calculateTop = (player) => {
    // if (name !== '') {
    const playerElement = document.getElementById(
      `${player.name.toLowerCase()}`
    )
    const tileElement = document.getElementById(`tile-${player.tile}`)

    let top = 0
    let left = 0

    if (tileElement) {
      top = tileElement.getBoundingClientRect().top
      left = tileElement.getBoundingClientRect().left
    }

    return top || 0
  }

  useEffect(() => {
    console.log(players)

    players.forEach((player) => {
      document.getElementById(
        `${player.name.toLowerCase()}`
      ).style.left = `${calculateLeft(player)}px`
      document.getElementById(
        `${player.name.toLowerCase()}`
      ).style.top = `${calculateTop(player)}px`
    })
  }, [players])

  return (
    <>
      <div className="game">
        {players &&
          players.length > 0 &&
          players.map((player) => {
            return (
              <div
                onClick={() => {
                  setPlayerToMove(player)
                }}
                style={{
                  left: calculateLeft(player),
                  top: calculateTop(player),
                }}
                id={player.name.toLowerCase()}
                className={`player ${player.active && 'active'}`}
              >
                {player.name}
              </div>
            )
          })}
        <div className="tiles">
          {app.tiles &&
            app.tiles.length > 0 &&
            app.tiles.map((tile, index) => {
              if (tile.type === 'road') {
                return (
                  <div
                    className={`tile ${tile.spawn && 'spawn'} ${
                      tile.exit && 'exit'
                    } ${tile.start && 'start'} ${tile.type}`}
                    id={`tile-${tile.index}`}
                    onClick={() => {
                      console.log('CLICKING TILE')
                      if (playerMoving) {
                        console.log('MOVING TO TILE ', index)

                        if (
                          confirm(
                            `Do you want to move ${playerToMove.name} to tile ${index}?`
                          )
                        ) {
                          setTileToMoveTo(index)
                        }
                      }
                    }}
                  >
                    <img
                      className="background"
                      src={getImage(tile.image)}
                      alt=""
                    />
                    <div className="tile__number">{index}</div>
                    <div className="tile__players">
                      {/* {players.map(player => {
                      return (
                        <PlayerToken tile={index} player={player} />
                      )
                    })} */}
                    </div>
                  </div>
                )
              } else {
                return (
                  <div
                    className={`tile ${tile.type}`}
                    id={`tile-${tile.index}`}
                    onClick={() => {
                      console.log('CLICKING TILE')
                      if (playerMoving) {
                        console.log('MOVING TO TILE ', index)

                        if (
                          confirm(
                            `Do you want to move ${playerToMove.name} to tile ${index}?`
                          )
                        ) {
                          setTileToMoveTo(index)
                        }
                      }
                    }}
                  >
                    <img
                      className="background"
                      src={getImage(tile.image)}
                      alt=""
                    />
                    <div className="tile__number">{index}</div>
                    <div className="tile__players">
                      {/* {players.map(player => {
                      return (
                        <PlayerToken tile={index} player={player} />
                      )
                    })} */}
                    </div>
                  </div>
                )
              }
            })}
        </div>
      </div>
    </>
  )
}

export default App
