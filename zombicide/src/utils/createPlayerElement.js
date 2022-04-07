import { calculateLeft } from './calculateLeft'
import { calculateTop } from './calculateTop'

export const createPlayerElement = (players, playerToCreate) => {
  let previousPlayerElement = document.getElementById(
    `player-${playerToCreate.name.toLowerCase()}`
  )
  if (previousPlayerElement) {
    previousPlayerElement.remove()
  }

  let player = document.createElement('div')
  player.className = `player`
  player.id = `player-${playerToCreate.name.toLowerCase()}`
  player.innerHTML = `${playerToCreate.name.charAt(0)}`
  // player.style.left = `${
  //   calculateLeft(playerToCreate.tile) +
  //   8 * playersInTile.length +
  //   (playersInTile.length > 0 ? 4 : 0)
  // }px`
  // player.style.top = `${
  //   calculateTop(playerToCreate.tile) +
  //   document.getElementById(`tile-${playerToCreate.tile}`).clientHeight -
  //   8
  // }px`

  document
    .getElementById(`tile-${playerToCreate.tile}`)
    .querySelector('.tile__players')
    .appendChild(player)
}
