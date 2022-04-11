import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { combineReducers } from './reducers'
import App, { initialState } from './models/app'

// import { useAbilityContext } from "../../auth/abilities";
// import { updateAbility } from "../../auth/abilities/gsx-abilities";
import { boardReducer } from './reducers/boardReducer'
import { zombiesReducer } from './reducers/zombiesReducer'
import { playersReducer } from './reducers/playersReducer'
import * as actions from './actions/boardActions'
import { initTiles } from './utils/initTiles'

function asyncDispatch(dispatch) {
  return function (action) {
    if (typeof action === 'function') {
      action(dispatch)
    } else {
      dispatch(action)
    }
  }
}

const appReducers = combineReducers({
  board: boardReducer,
  zombies: zombiesReducer,
  players: playersReducer,
})

const AppContext = createContext(null)

export const AppProvider = ({ children }) => {
  const [app, handler] = useReducer(appReducers, initialState)
  const dispatch = useCallback(asyncDispatch(handler), []) // eslint-disable-line

  useEffect(() => {
    

    // setTimeout(() => {
    //   console.log(app.tiles);
    // }, 2000)
  }, [])

  const init = () => {
    return dispatch(actions.initializeTiles(initTiles()))
  }

  return (
    <AppContext.Provider value={{ ...actions, ...app, init: init }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within a AppProvider')
  }
  return context
}
