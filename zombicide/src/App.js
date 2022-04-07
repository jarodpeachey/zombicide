/* eslint-disable no-restricted-globals */
import React from 'react'
import { useTiles } from './providers/TileProvider'
import { usePlayers } from './providers/PlayersProvider'
import './styles/style.css'
import './styles/control-panel.css'
import './styles/tiles.css'
import './styles/players.css'
import './styles/zombies.css'
import './styles/card.css'
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
      !isWallInWay &&
      !(
        Math.abs(xTo - xFrom) >= tileFrom.clientHeight - 10 &&
        Math.abs(yTo - yFrom) >= tileFrom.clientHeight - 10
      )
    )
      return true
  }
  return false
}

const isValidDoorOpenAttempt = (from, to) => {
  // let tileFrom = document.getElementById(`tile-${from.index}`)
  // let tileTo = document.getElementById(`tile-${to.index}`)

  // if (tileFrom && tileTo) {
  //   let xFrom = tileFrom.getBoundingClientRect().x + tileFrom.clientWidth / 2
  //   let yFrom = tileFrom.getBoundingClientRect().y + tileFrom.clientHeight / 2

  //   let xTo = tileTo.getBoundingClientRect().x + tileTo.clientWidth / 2
  //   let yTo = tileTo.getBoundingClientRect().y + tileTo.clientHeight / 2

  //   if (
  //     Math.abs(xTo - xFrom) <= tileFrom.clientHeight + 10 &&
  //     Math.abs(yTo - yFrom) <= tileFrom.clientHeight + 10 &&
  //     (from.door === true || to.door === true) &&
  //     (from.doorOpen === false || to.doorOpen === false)
  //   )
  //     return true
  // }
  // return false

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
      from.index !== to.index &&
      (from.door === true || to.door === true) &&
      (from.doorOpen === false || to.doorOpen === false) &&
      !(
        Math.abs(xTo - xFrom) >= tileFrom.clientHeight - 10 &&
        Math.abs(yTo - yFrom) >= tileFrom.clientHeight - 10
      )
    )
      return true
  }
  return false
}

function App() {
  const app = useTiles()
  const {
    players,
    setActivePlayer,
    activePlayerIndex,
    setActivePlayerIndex,
    endRound,
    playerToMove,
    activePlayer,
    isPlayerMoving,
    setIsPlayerMoving,
    isPlayerAttacking = false,
    setIsPlayerAttacking,
    isPlayerSearching = false,
    setIsPlayerSearching,
    decrementAction,
  } = usePlayers()
  const {
    setTileToMoveTo,
    tiles,
    setIsPlayerOpeningDoor,
    isPlayerOpeningDoor,
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

  // useEffect(() => {
  //   players.forEach((player) => {
  //     document.getElementById(
  //       `${player.name.toLowerCase()}`
  //     ).style.left = `${calculateLeft(player)}px`
  //     document.getElementById(
  //       `${player.name.toLowerCase()}`
  //     ).style.top = `${calculateTop(player)}px`
  //   })
  // }, [players])

  return (
    <>
      <div className="game" id="game">
        {/* {players &&
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
                onClick={() => {
                  setActivePlayer(player)
                }}
              >
                {player.name.charAt(0)}
              </div>
            )
          })} */}
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
              <h4>HAND</h4>
              <div className="cards">
                {activePlayer.hand &&
                  activePlayer.hand.length > 0 &&
                  activePlayer.hand.map((card, index) => {
                    return (
                      <div className="card">
                        <button
                          onClick={() => {
                            // if (confirm("Are you sure you want to get rid of this card?")) {
                            //   removeCardFromHand(card.title)
                            // }
                          }}
                          className="card__delete"
                          title="Remove card from hand"
                        >
                          <FontAwesomeIcon size="sm" icon="remove" />
                        </button>
                        <div className="card__title">{card.title}</div>
                        <div className="card__details">
                          <p>
                            <div className="card__detail">
                              <strong>Dice</strong>
                              <span>{card.dice}</span>
                            </div>
                          </p>
                          <p>
                            <div className="card__detail">
                              <strong>Range</strong>
                              <span>{card.range}</span>
                            </div>
                          </p>
                          <p>
                            <div className="card__detail">
                              <strong>Required</strong>
                              <span>{card.required}</span>
                            </div>
                          </p>
                          <p>
                            <div className="card__detail">
                              <strong>Damage</strong>
                              <span>{card.damage}</span>
                            </div>
                          </p>
                        </div>
                      </div>
                    )
                  })}
                {activePlayer.hand && activePlayer.hand.length === 1 ? (
                  <div className="card placeholder">
                    <FontAwesomeIcon size="lg" icon="plus" className="icon" />
                  </div>
                ) : (
                  <>
                    <div className="card placeholder">
                      <FontAwesomeIcon size="lg" icon="plus" className="icon" />
                    </div>
                    <div className="card placeholder">
                      <FontAwesomeIcon size="lg" icon="plus" className="icon" />
                    </div>
                  </>
                )}
              </div>
              <br />
              <h4>ACTIONS</h4>
              <div style={{ display: 'flex' }}>
                <button
                  className="action-button btn"
                  disabled={
                    activePlayer.actions === 0 ||
                    isPlayerOpeningDoor ||
                    isPlayerSearching ||
                    isPlayerAttacking
                  }
                  title={
                    activePlayer.actions === 0
                      ? 'You have no actions left'
                      : isPlayerMoving
                      ? 'Cancel'
                      : 'Move'
                  }
                  onClick={() => {
                    if (isPlayerMoving) {
                      setIsPlayerMoving(false)
                    } else {
                      setIsPlayerMoving(true)
                    }
                  }}
                >
                  {isPlayerMoving ? 'Cancel' : 'Move'}
                </button>
                <button
                  className="action-button btn"
                  disabled={
                    activePlayer.actions === 0 ||
                    isPlayerMoving ||
                    isPlayerSearching ||
                    isPlayerAttacking
                  }
                  title={
                    activePlayer.actions === 0
                      ? 'You have no actions left'
                      : isPlayerOpeningDoor
                      ? 'Cancel'
                      : 'Open Door'
                  }
                  onClick={() => {
                    if (isPlayerOpeningDoor) {
                      setIsPlayerOpeningDoor(false)
                    } else {
                      setIsPlayerOpeningDoor(true)
                    }
                  }}
                >
                  {isPlayerOpeningDoor ? 'Cancel' : 'Open Door'}
                </button>
                <button
                  className="action-button btn"
                  disabled={
                    activePlayer.actions === 0 ||
                    isPlayerMoving ||
                    isPlayerOpeningDoor ||
                    isPlayerAttacking
                  }
                  title={
                    activePlayer.actions === 0
                      ? 'You have no actions left'
                      : 'Search'
                  }
                >
                  Search
                </button>
                <button
                  className="action-button btn"
                  disabled={
                    activePlayer.actions === 0 ||
                    isPlayerMoving ||
                    isPlayerSearching ||
                    isPlayerOpeningDoor
                  }
                  title={
                    activePlayer.actions === 0
                      ? 'You have no actions left'
                      : 'Attack'
                  }
                >
                  Attack
                </button>
                <button
                  className="action-button btn"
                  title={
                    activePlayerIndex === players.length - 1
                      ? 'End round'
                      : 'End turn'
                  }
                  disabled={
                    isPlayerMoving ||
                    isPlayerSearching ||
                    isPlayerAttacking ||
                    isPlayerOpeningDoor
                  }
                  onClick={() => {
                    if (activePlayerIndex === players.length - 1) {
                      endRound()
                    } else {
                      setActivePlayerIndex(activePlayerIndex + 1)
                    }
                  }}
                >
                  End{' '}
                  {activePlayerIndex === players.length - 1 ? 'round' : 'turn'}
                </button>
              </div>
              <br />
              <br />
              <h4>NEXT PLAYERS</h4>
              {players.map((item, index) => {
                if (index !== activePlayerIndex && index > activePlayerIndex) {
                  return <p>{item.name}</p>
                }
              })}
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
                // console.log(tile)
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
                          isPlayerMoving) ||
                        (isPlayerOpeningDoor &&
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
                        if (isPlayerMoving) {
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
                        } else if (isPlayerOpeningDoor) {
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
                              decrementAction()
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
                      <div className="tile__zombies"></div>
                      <div className="tile__players"></div>
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
