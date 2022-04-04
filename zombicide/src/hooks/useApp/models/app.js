export const initialState = {
  zombies: [],
  players: [],
  tiles: [
    // {
    //   row: 5,
    //   column: 6,
    //   type: 'road',
    //   zombies: [],
    //   characters: [],
    //   start: false,
    //   exit: false,
    //   spawn: false,
    //   door: false,
    //   doorOpen: false,
    //   doorPlacement: 'bottom',
    // },
  ],

  // TILES
  tileToMoveTo: null,
  startTile: null,
  tileToOpenDoor: null,
  openingDoor: false,
  createZombies: false,
  buildingTilesAlreadyDiscovered: [],

  // PLAYERS
  activePlayerIndex: null,
  activePlayer: {
    name: '',
    kills: 0,
    level: 0,
    hand: [],
    backpack: [],
    tile: 0,
    actions: 4,
  },

  // ZOMBIES
  zombiesToGoAgain: [],
}

class App {
  constructor(attrs) {
    Object.assign(this, attrs)
  }
}

export default App
