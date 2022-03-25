import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import TileProvider from './providers/TileProvider'
import LootProvider from './providers/LootProvider'
import PlayersProvider from './providers/PlayersProvider';

ReactDOM.render(
  <React.StrictMode>
    <TileProvider>
      <PlayersProvider>
        <LootProvider>
          <App />
        </LootProvider>
      </PlayersProvider>
    </TileProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
