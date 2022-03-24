import { createContext, useContext, useState } from 'react'
import tiles from "../data/tiles.json"
import loot from "../data/loot.json"

export const AppContext = createContext({})

export default function AppProvider({ strings, children }) {
  // BASE VARIABLES

  let exitTile = 42
  let startTile = 48

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

  for (let index = 0; index < 49; index++) {
    tiles[index].index = index
  }

  buildings.forEach((building) => {
    tiles[building].type = 'building'
    tiles[building].image = Math.floor(Math.random() * (8 - 1 + 1)) + 1
  })

  verticalRoads.forEach((road) => {
    tiles[road].type = 'road'
    tiles[road].image = 'vertical'
  })

  horizontalRoads.forEach((road) => {
    tiles[road].type = 'road'
    tiles[road].image = 'horizontal'
  })

  topRightRoads.forEach((road) => {
    tiles[road].type = 'road'
    tiles[road].image = 'right_top'
  })

  topLeftRoads.forEach((road) => {
    tiles[road].type = 'road'
    tiles[road].image = 'left_top'
  })

  bottomRightRoads.forEach((road) => {
    tiles[road].type = 'road'
    tiles[road].image = 'right_bottom'
  })

  bottomLeftRoads.forEach((road) => {
    tiles[road].type = 'road'
    tiles[road].image = 'left_bottom'
  })

  tripleLeftRoads.forEach((road) => {
    tiles[road].type = 'road'
    tiles[road].image = 'triple_left'
  })

  tripleRightRoads.forEach((road) => {
    tiles[road].type = 'road'
    tiles[road].image = 'triple_right'
  })

  spawnTiles.forEach((tile) => {
    tiles[tile].spawn = true
  })

  tiles[exitTile].exit = true
  tiles[startTile].start = true

  // for (let row = 0; row < rows; row++) {
  //   for (let column = 0; column < columns; column++) {
  //     tiles[row][column].index = index
  //     index++
  //   }
  // }

  console.log(tiles)

  return (
    <AppContext.Provider value={{ tiles: tiles }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp() must be used within an AppProvider')
  }
  return context
}
