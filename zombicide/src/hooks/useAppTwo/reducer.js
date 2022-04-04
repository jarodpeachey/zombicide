export const appTwoReducer = (state, action = {}) => {
  const { payload, type } = action
  switch (type) {
    case 'initialize_tiles':
      console.log('INIT TILES FROM REDUCER: ', payload)
      return {
        ...state,
        init: payload,
      }

    default:
      return state
  }
}
