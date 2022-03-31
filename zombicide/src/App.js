/* eslint-disable no-restricted-globals */
import React from 'react'
import { useTiles } from './providers/TileProvider'
import { usePlayers } from './providers/PlayersProvider'
import './styles/style.css'
import './styles/control-panel.css'
import './styles/tiles.css'
import './styles/players.css'
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

const isValidMoveAttempt = (from, to) => {
  let tileFrom = document.getElementById(`tile-${from.index}`)
  let tileTo = document.getElementById(`tile-${to.index}`)

  if (tileFrom && tileTo) {
    let xFrom = tileFrom.getBoundingClientRect().x + tileFrom.clientWidth / 2
    let yFrom = tileFrom.getBoundingClientRect().y + tileFrom.clientHeight / 2

    let xTo = tileTo.getBoundingClientRect().x + tileTo.clientWidth / 2
    let yTo = tileTo.getBoundingClientRect().y + tileTo.clientHeight / 2

    let isWallInWay = false

    if (to.type === from.type) {
      isWallInWay = false
    } else if (!to.doorOpen && !from.doorOpen) {
      isWallInWay = true
    }

    if (
      Math.abs(xTo - xFrom) <= tileFrom.clientHeight + 10 &&
      Math.abs(yTo - yFrom) <= tileFrom.clientHeight + 10 &&
      from.index !== to.index &&
      !isWallInWay && !(Math.abs(xTo - xFrom) >= tileFrom.clientHeight - 10 &&
      Math.abs(yTo - yFrom) >= tileFrom.clientHeight - 10)
    )
      return true
  }
  return false
}

const isValidDoorOpenAttempt = (from, to) => {
  let tileFrom = document.getElementById(`tile-${from.index}`)
  let tileTo = document.getElementById(`tile-${to.index}`)

  if (tileFrom && tileTo) {
    let xFrom = tileFrom.getBoundingClientRect().x + tileFrom.clientWidth / 2
    let yFrom = tileFrom.getBoundingClientRect().y + tileFrom.clientHeight / 2

    let xTo = tileTo.getBoundingClientRect().x + tileTo.clientWidth / 2
    let yTo = tileTo.getBoundingClientRect().y + tileTo.clientHeight / 2

    if (
      Math.abs(xTo - xFrom) <= tileFrom.clientHeight + 10 &&
      Math.abs(yTo - yFrom) <= tileFrom.clientHeight + 10 &&
      (from.door === true || to.door === true)
    )
      return true
  }
  return false
}

function App() {
  const app = useTiles()
  const { players, playerToMove, activePlayer, playerMoving, setPlayerMoving } =
    usePlayers()
  const {
    setTileToMoveTo,
    tiles,
    setOpeningDoor,
    openingDoor,
    setTileToOpenDoor,
  } = useTiles()

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
    const tileElement = document.getElementById(`tile-${player.tile}`)
    const parentElement = document.getElementById(`tiles`)

    if (parentElement && tileElement) {
      let top = 0
      let left = 0

      if (tileElement) {
        top = tileElement.getBoundingClientRect().top
        left = tileElement.getBoundingClientRect().left
      }

      return left || 0
    } else {
      return 0
    }
  }
  const calculateTop = (player) => {
    const tileElement = document.getElementById(`tile-${player.tile}`)
    const parentElement = document.getElementById(`tiles`)

    if (parentElement && tileElement) {
      let top = 0
      let left = 0

      if (tileElement) {
        top = tileElement.getBoundingClientRect().top
        left = tileElement.getBoundingClientRect().left
      }

      return top || 0
    } else {
      return 0
    }
  }

  useEffect(() => {
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
        <div
          id="dot"
          style={{
            background: 'pink',
            width: 5,
            height: 5,
            position: 'absolute',
          }}
        ></div>
        {players &&
          players.length > 0 &&
          players.map((player) => {
            return (
              <div
                style={{
                  left: calculateLeft(player),
                  top: calculateTop(player),
                }}
                id={player.name.toLowerCase()}
                className={`player ${
                  activePlayer && activePlayer.name === player.name
                    ? 'moving'
                    : ''
                }`}
              >
                {player.name}
              </div>
            )
          })}
        {activePlayer && (
          <div className="control-panel">
            <div className="control-panel__inner">
              <h2>{activePlayer.name}</h2>
              <p>
                <strong>Level: </strong>
                <span style={{ fontSize: 18, marginLeft: 8 }}>
                  {activePlayer.level}
                </span>
              </p>
              <p>
                <strong>Kills: </strong>
                <span style={{ fontSize: 18, marginLeft: 8 }}>
                  {activePlayer.kills}
                </span>
              </p>
              <p>
                <strong>Actions remaining: </strong>
                <span style={{ fontSize: 18, marginLeft: 8 }}>
                  {activePlayer.actions}
                </span>
              </p>
              <br />
              <h4>ACTIONS</h4>
              <div style={{ display: 'flex' }}>
                <button
                  className="btn"
                  onClick={() => {
                    if (playerMoving) {
                      setPlayerMoving(false)
                    } else {
                      setPlayerMoving(true)
                    }
                  }}
                >
                  {playerMoving ? 'Cancel' : 'Move'}
                </button>
                <button
                  className="btn"
                  onClick={() => {
                    if (openingDoor) {
                      setOpeningDoor(false)
                    } else {
                      setOpeningDoor(true)
                    }
                  }}
                >
                  {openingDoor ? 'Cancel' : 'Open Door'}
                </button>
                <button className="btn">Search</button>
                <button className="btn">Attack</button>
                <button className="btn">End turn</button>
              </div>
            </div>
          </div>
        )}
        <div className="tiles" id="tiles">
          {app.tiles &&
            app.tiles.length > 0 &&
            app.tiles
              .sort(function (a, b) {
                return a.index - b.index
              })
              .map((tile, index) => {
                console.log(tile)
                if (index < 49) {
                  return (
                    <div
                      className={`tile ${
                        (isValidMoveAttempt(
                          tiles.filter(
                            (item) => item.index === activePlayer.tile
                          )[0],
                          tile
                        ) &&
                          playerMoving) ||
                        (openingDoor &&
                          isValidDoorOpenAttempt(
                            tiles.filter(
                              (item) => item.index === activePlayer.tile
                            )[0],
                            tile
                          ))
                          ? 'selectable'
                          : ''
                      } ${tile.door ? 'door' : ''} ${
                        tile.doorOpen ? 'open' : ''
                      } ${tile.doorPlacement} ${tile.spawn && 'spawn'} ${
                        tile.exit && 'exit'
                      } ${tile.start && 'start'} ${tile.type}`}
                      id={`tile-${tile.index}`}
                      onClick={() => {
                        if (playerMoving) {
                          if (
                            isValidMoveAttempt(
                              tiles.filter(
                                (item) => item.index === activePlayer.tile
                              )[0],
                              tile
                            )
                          ) {
                            if (
                              confirm(
                                `Do you want to move ${activePlayer.name} to tile ${index}?`
                              )
                            ) {
                              setTileToMoveTo(index)
                            }
                          } else {
                            alert('You can only move 1 space at a time')
                          }
                        } else if (openingDoor) {
                          if (
                            isValidDoorOpenAttempt(
                              tiles.filter(
                                (item) => item.index === activePlayer.tile
                              )[0],
                              tile
                            )
                          ) {
                            if (confirm(`Do you want to open this door?`)) {
                              setTileToOpenDoor(index)
                            }
                          } else {
                            alert("You can't open this door")
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
