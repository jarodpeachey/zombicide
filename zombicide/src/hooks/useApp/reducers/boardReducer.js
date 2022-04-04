export const boardReducer = (state, action = {}) => {
  switch (action.type) {
    case 'tiles.initialize':
      console.log("INITIALIZING TILES: ", action.payload)
      return {
        ...state,
        tiles: action.payload,
      }
    default:
      return state
  }
}
