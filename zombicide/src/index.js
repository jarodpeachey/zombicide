import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import TileProvider from './providers/TileProvider'
import LootProvider from './providers/LootProvider'
import PlayersProvider from './providers/PlayersProvider'
import ZombiesProvider from './providers/ZombiesProvider'

ReactDOM.render(
  <React.StrictMode>
    <ZombiesProvider>
      <TileProvider>
        <PlayersProvider>
          <LootProvider>
            <App />
          </LootProvider>
        </PlayersProvider>
      </TileProvider>
    </ZombiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
