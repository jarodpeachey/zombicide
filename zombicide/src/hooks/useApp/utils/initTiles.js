import { initializeTiles } from '../actions/boardActions'
import tileTemplates from '../../../data/tiles.json'

export const initTiles = () => {
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

  // ADD INDEX FOR EACH TILE
  for (let index = 0; index < 49; index++) {
    tileTemplates[index].index = index
  }

  // GENERATE BUILDING TILES
  buildings.forEach((building) => {
    tileTemplates[building].type = 'building'
    tileTemplates[building].image = Math.floor(Math.random() * (8 - 1 + 1)) + 1
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

  return [...tileTemplates]
}
