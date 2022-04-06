export const boardReducer = (state, action = {}) => {
  switch (action.type) {
    case 'tiles.initialize':
      return {
        ...state,
        tiles: action.payload,
      }
    default:
      return state
  }
}
