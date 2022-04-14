import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import TileProvider from './providers/TileProvider'
import LootProvider from './providers/LootProvider'
import PlayersProvider from './providers/PlayersProvider'
import ZombiesProvider from './providers/ZombiesProvider'
import { AppTwoProvider } from './hooks/useAppTwo'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faRemove } from '@fortawesome/free-solid-svg-icons'
import { Toaster } from 'react-hot-toast'

library.add(faPlus, faRemove)

ReactDOM.render(
  <React.StrictMode>
    <Toaster
      position="top-right"
      toastOptions={{
        className: 'toast',
        duration: 3000
      }}
    />
    <ZombiesProvider>
      <TileProvider>
        <PlayersProvider>
          <LootProvider>
            {/* <AppTwoProvider> */}
            <App />
            {/* </AppTwoProvider> */}
          </LootProvider>
        </PlayersProvider>
      </TileProvider>
    </ZombiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
