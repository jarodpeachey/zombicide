import {
  useReducer,
  createContext,
  useContext,
  useCallback,
  useEffect,
} from 'react'
import { initialState } from './model'
import { appTwoReducer } from './reducer'
import * as actions from './actions'
import { initTiles } from '../useApp/utils/initTiles';
// import { useWebsocket } from "../../useWebsocket";
// import { useUIController } from "../../useUIController";
// import { OrderUtility } from "api/orders";
function asyncDispatch(dispatch) {
  return function (action) {
    if (typeof action === 'function') {
      action(dispatch)
    } else {
      dispatch(action)
    }
  }
}

// set up context for propagation
export const AppTwoContext = createContext(null)

// Symbol, ticker, is showing
export function AppTwoProvider({ children }) {
  const [appTwo, dispatch] = useReducer(appTwoReducer, initialState)
  // const { dispatch: uiDispatcher }: any = useUIController();
  // const dispatch = useCallback(asyncDispatch(handler), []) // eslint-disable-line

  const init = () => {
    console.log('INITIALIZING FROM PROVIDER')
    console.log(dispatch(actions.initializeTiles(true)))
  }

  useEffect(() => {
    dispatch(actions.initializeTiles(true))
    console.log(appTwo);
  }, [appTwo])

  return (
    <AppTwoContext.Provider value={{ ...appTwo, init: init }}>
      {children}
    </AppTwoContext.Provider>
  )
}

export function useAppTwo() {
  const context = useContext(AppTwoContext)
  if (context === undefined) {
    throw new Error('useAppTwo() must be used within an AppTwoProvider')
  }
  return context
}
