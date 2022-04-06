import { useEffect } from 'react'
import { createContext, useContext, useState } from 'react'
import tileTemplates from '../data/tiles.json'
import { calculateLeft } from '../utils/calculateLeft'
import { calculateTop } from '../utils/calculateTop'
import { useZombies } from './ZombiesProvider'

export const TileContext = createContext({})

export default function TileProvider({ strings, children }) {
  const [tiles, setTiles] = useState([...tileTemplates])
  const [playerMoving, setPlayerMoving] = useState(false)
  const [tileToMoveTo, setTileToMoveTo] = useState(null)
  const [startTile, setStartTile] = useState(48)
  const [tileToOpenDoor, setTileToOpenDoor] = useState(null)
  const [openingDoor, setOpeningDoor] = useState(false)
  const { createZombies, setZombieToCreate, setGoAgain } = useZombies()
  const [buildingTilesAlreadyDiscovered, setBuildingTilesAlreadyDiscovered] =
    useState([])

  // let buildingTilesAlreadyDiscovered = []

  // BASE VARIABLES
  let exitTile = 42
  // let startTile = 48
  let spawnTiles = [2, 44, 4, 46]

  let buildings = [
    0, 1, 7, 8, 14, 15, 21, 22, 28, 29, 35, 36, 10, 24, 31, 38, 45, 5, 6, 12,
    13, 19, 20, 26, 27, 33, 34, 40, 41,
  ]

  let verticalRoads = [9, 23, 30, 37, 11, 25, 32, 39]
  let horizontalRoads = [17, 3, 43, 47, 48, 42]
  let topRightRoads = [46]
  let bottomRightRoads = [2]
  let topLeftRoads = [44]
  let bottomLeftRoads = [4]
  let tripleLeftRoads = [18]
  let tripleRightRoads = [16]

  useEffect(() => {
    // if (!sessionStorage.getItem('initialized')) {
    // ADD INDEX FOR EACH TILE
    for (let index = 0; index < 49; index++) {
      tileTemplates[index].index = index
    }

    // GENERATE BUILDING TILES
    buildings.forEach((building) => {
      tileTemplates[building].type = 'building'
      tileTemplates[building].image =
        Math.floor(Math.random() * (8 - 1 + 1)) + 1
    })

    // GENERATE ROAD TILES
    verticalRoads.forEach((road) => {
      tileTemplates[road].type = 'road'
      tileTemplates[road].image = 'vertical'
    })

    horizontalRoads.forEach((road) => {
      tileTemplates[road].type = 'road'
      tileTemplates[road].image = 'horizontal'
    })

    topRightRoads.forEach((road) => {
      tileTemplates[road].type = 'road'
      tileTemplates[road].image = 'right_top'
    })

    topLeftRoads.forEach((road) => {
      tileTemplates[road].type = 'road'
      tileTemplates[road].image = 'left_top'
    })

    bottomRightRoads.forEach((road) => {
      tileTemplates[road].type = 'road'
      tileTemplates[road].image = 'right_bottom'
    })

    bottomLeftRoads.forEach((road) => {
      tileTemplates[road].type = 'road'
      tileTemplates[road].image = 'left_bottom'
    })

    tripleLeftRoads.forEach((road) => {
      tileTemplates[road].type = 'road'
      tileTemplates[road].image = 'triple_left'
    })

    tripleRightRoads.forEach((road) => {
      tileTemplates[road].type = 'road'
      tileTemplates[road].image = 'triple_right'
    })

    // GENERATE SPECIAL TILES
    spawnTiles.forEach((tile) => {
      tileTemplates[tile].spawn = true
    })

    tileTemplates[exitTile].exit = true
    tileTemplates[startTile].start = true

    setTiles([...tileTemplates])
  }, [])

  useEffect(() => {
    if (tileToMoveTo) {
      setTileToMoveTo(null)
    }
  }, [tileToMoveTo])

  useEffect(() => {
    if (tileToOpenDoor) {
      let tile = tiles.filter((item) => item.index === tileToOpenDoor)[0]
      setTiles([
        ...tiles.filter((tile) => tile.index !== tileToOpenDoor),
        { ...tile, doorOpen: true },
      ])

      spawnZombies(tileToOpenDoor)

      setTileToOpenDoor(null)
      setOpeningDoor(false)
    }
  }, [tileToOpenDoor, tiles])

  const isNextTo = (from, to) => {
    let tileFrom = document.getElementById(`tile-${from}`)
    let tileTo = document.getElementById(`tile-${to}`)

    if (tileFrom && tileTo) {
      let xFrom = tileFrom.getBoundingClientRect().x + tileFrom.clientWidth / 2
      let yFrom = tileFrom.getBoundingClientRect().y + tileFrom.clientHeight / 2

      let xTo = tileTo.getBoundingClientRect().x + tileTo.clientWidth / 2
      let yTo = tileTo.getBoundingClientRect().y + tileTo.clientHeight / 2

      let isWallInWay = false

      if (
        Math.abs(xTo - xFrom) <= tileFrom.clientHeight + 10 &&
        Math.abs(yTo - yFrom) <= tileFrom.clientHeight + 10 &&
        from !== to &&
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

  const getTilesNextTo = (startingTile) => {
    let buildingTilesNextTo = []
    tiles.forEach(({ index, type }) => {
      if (isNextTo(startingTile, index) && type === 'building') {
        buildingTilesNextTo.push(index)
      }
    })

    return buildingTilesNextTo
  }

  const hasTileNotInArray = (tilesNextTo, tilesToSpawnIn) => {
    tilesNextTo.forEach((tileNextTo) => {
      if (tilesToSpawnIn.includes(tileNextTo)) {
        return false
      }
    })
    return true
  }

  // const [tilesToSpawnIn, setTilesToSpawnIn] = useState([])
  // let tilesToSpawnIn = []

  const spawnZombies = (startingTile) => {
    let tilesToSpawnIn = []
    let hasBeenChecked = []
    let keepChecking = true

    if (!buildingTilesAlreadyDiscovered.includes(startingTile)) {
      checkNextTo(startingTile)

      function checkNextTo(tileToCheck) {
        let tilesNextTo = getTilesNextTo(tileToCheck)
        hasBeenChecked.push(tileToCheck)

        if (keepChecking) {
          tilesNextTo.forEach((item, index) => {
            if (
              hasTileNotInArray(tilesNextTo, tilesToSpawnIn) &&
              !hasBeenChecked.includes(item)
            ) {
              checkNextTo(item)
            }

            if (!tilesToSpawnIn.includes(item)) {
              tilesToSpawnIn.push(item)
            } else if (index === tilesNextTo.length - 1) {
              keepChecking = false
            }
          })
        }
      }

      if (!keepChecking) {
        // tilesToSpawnIn.forEach((item) => {
        setBuildingTilesAlreadyDiscovered([
          ...buildingTilesAlreadyDiscovered,
          ...tilesToSpawnIn,
        ])
        // })
        createZombies(tilesToSpawnIn)
      }
    } else {
      alert("You've already discovered this building.")
    }
  }

  return (
    <TileContext.Provider
      value={{
        startTile: startTile,
        tiles: tiles,
        exitTile: exitTile,
        playerMoving: playerMoving,
        setPlayerMoving: setPlayerMoving,
        tileToMoveTo: tileToMoveTo,
        setTileToMoveTo: setTileToMoveTo,
        openingDoor: openingDoor,
        setOpeningDoor: setOpeningDoor,
        setTileToOpenDoor: setTileToOpenDoor,
        tileToOpenDoor: tileToOpenDoor,
      }}
    >
      {children}
    </TileContext.Provider>
  )
}

export function useTiles() {
  const context = useContext(TileContext)
  if (context === undefined) {
    throw new Error('useTiles() must be used within an TileProvider')
  }
  return context
}
