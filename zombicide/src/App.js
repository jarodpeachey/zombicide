/* eslint-disable no-restricted-globals */
import React from 'react'
import { useTiles } from './providers/TileProvider'
import { usePlayers } from './providers/PlayersProvider'
import './styles/style.css'
import './styles/control-panel.css'
import './styles/tiles.css'
import './styles/players.css'
import './styles/zombies.css'
import './styles/dice.css'
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
import Card from './components/Card'
import { useZombies } from './providers/ZombiesProvider'

const isValidAttackAttempt = (from, to, cardToAttackWith, zombies) => {
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

    let hasZombiesInTile = () => {
      let hasZombies = false
      zombies.forEach((zombie) => {
        if (zombie.tile === to.index) {
          hasZombies = true
        }
      })
      return hasZombies
    }

    if (
      Math.abs(xTo - xFrom) <=
        tileFrom.clientHeight * cardToAttackWith.range + 10 &&
      Math.abs(yTo - yFrom) <=
        tileFrom.clientHeight * cardToAttackWith.range + 10 &&
      from.index !== to.index &&
      !isWallInWay &&
      hasZombiesInTile() &&
      !(
        Math.abs(xTo - xFrom) >=
          tileFrom.clientHeight * cardToAttackWith.range - 10 &&
        Math.abs(yTo - yFrom) >=
          tileFrom.clientHeight * cardToAttackWith.range - 10
      )
    )
      return true
  }
  return false
}

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
  const { zombies } = useZombies()
  const {
    players,
    setActivePlayer,
    activePlayerIndex,
    setActivePlayerIndex,
    endRound,
    playerToMove,
    clearMessages,
    activePlayer,
    isPlayerMoving,
    setIsPlayerMoving,
    isPlayerAttacking = false,
    setIsPlayerAttacking,
    isPlayerSearching = false,
    setIsPlayerSearching,
    decrementAction,
    cardToAttackWith,
    setCardToAttackWith,
    diceToDisplay,
    messageToDisplay,
    setMessageToDisplay,
  } = usePlayers()
  const {
    setTileToMoveTo,
    tiles,
    setIsPlayerOpeningDoor,
    isPlayerOpeningDoor,
    setTileToOpenDoor,
    tileToAttack,
    setTileToAttack,
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

  return (
    <>
      <div className="info">
        {messageToDisplay && messageToDisplay.length > 0 && (
          <p>{messageToDisplay}</p>
        )}
        {diceToDisplay.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {diceToDisplay.map((die) => {
              console.log('DIE: ', die)
              return <div className={`die ${die.type}`}>{die.value}</div>
            })}
          </div>
        )}
      </div>
      <div className="game" id="game">
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
              <div className={`cards ${isPlayerAttacking ? 'border' : ''}`}>
                {activePlayer.hand &&
                  activePlayer.hand.length > 0 &&
                  activePlayer.hand.map((card) => {
                    return (
                      <Card
                        onClick={() => {
                          if (isPlayerAttacking) {
                            setMessageToDisplay('Select a tile to attack')
                            setCardToAttackWith(card)
                          }
                        }}
                        card={card}
                      />
                    )
                  })}

                {activePlayer.hand && activePlayer.hand.length === 1 ? (
                  <>
                    <Card placeholder />
                    <Card placeholder />
                    <Card placeholder />
                    <Card placeholder />
                  </>
                ) : activePlayer.hand && activePlayer.hand.length === 2 ? (
                  <>
                    <Card placeholder />
                    <Card placeholder />
                    <Card placeholder />
                  </>
                ) : activePlayer.hand && activePlayer.hand.length === 3 ? (
                  <>
                    <Card placeholder />
                    <Card placeholder />
                  </>
                ) : activePlayer.hand && activePlayer.hand.length === 4 ? (
                  <Card placeholder />
                ) : (
                  <>
                    <Card placeholder />
                    <Card placeholder />
                    <Card placeholder />
                    <Card placeholder />
                    <Card placeholder />
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
                    clearMessages()
                    if (isPlayerMoving) {
                      setIsPlayerMoving(false)
                      setMessageToDisplay('Choose your next action')
                    } else {
                      setIsPlayerMoving(true)
                      setMessageToDisplay('Select a tile to move to')
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
                    clearMessages()
                    if (isPlayerOpeningDoor) {
                      setIsPlayerOpeningDoor(false)
                      setMessageToDisplay('Choose your next action')
                    } else {
                      setIsPlayerOpeningDoor(true)
                      setMessageToDisplay('Select a door to open')
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
                  onClick={() => {
                    clearMessages()
                    if (isPlayerAttacking) {
                      setIsPlayerAttacking(false)
                      setMessageToDisplay('Choose your next action')
                    } else {
                      setIsPlayerAttacking(true)
                      setMessageToDisplay('Select a card to attack with')
                    }
                  }}
                >
                  {isPlayerAttacking ? 'Cancel' : 'Attack'}
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
                          )) ||
                        (isValidAttackAttempt(
                          tiles.filter(
                            (item) => item.index === activePlayer.tile
                          )[0],
                          tile,
                          cardToAttackWith,
                          zombies
                        ) &&
                          isPlayerAttacking &&
                          cardToAttackWith !== {})
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
                            setMessageToDisplay(
                              'OOPS. You can only move 1 space at a time'
                            )
                            setTimeout(() => {
                              setMessageToDisplay('Select a tile to move to')
                            }, 1000)
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
                            }
                          } else {
                            setMessageToDisplay(
                              "OOPS. You can't open this door"
                            )
                            setTimeout(() => {
                              setMessageToDisplay('Select a door to open')
                            }, 1000)
                          }
                        } else if (
                          isPlayerAttacking &&
                          cardToAttackWith !== {}
                        ) {
                          if (
                            isValidAttackAttempt(
                              tiles.filter(
                                (item) => item.index === activePlayer.tile
                              )[0],
                              tile,
                              cardToAttackWith,
                              zombies
                            )
                          ) {
                             if (confirm(`Do you want to attack this tile?`)) {
                              setTileToAttack(index)
                            }
                          } else {
                            setMessageToDisplay(
                              "OOPS. You can't attack this tile"
                            )
                            setTimeout(() => {
                              setMessageToDisplay('Select a tile to attack')
                            }, 1000)
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
