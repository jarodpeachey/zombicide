import { calculateLeft } from './calculateLeft'
import { calculateTop } from './calculateTop'

export const createZombieElement = (zombies, zombieToCreate) => {
  console.log('ZOMBIES FROM CREATE ELEMENT: ', zombies)

  if (zombieToCreate.type === 'fattie') {
    createZombieElement(zombies, {...zombieToCreate, type: 'walker'})
    createZombieElement(zombies, {...zombieToCreate, type: 'walker'})
  }

  // let zombiesInTile = zombies.filter(
  //   (item) => item.tile === zombieToCreate.tile
  // )

  let zombie = document.createElement('div')
  zombie.className = `zombie ${zombieToCreate.type}`
  zombie.id = `zombie-${
    zombies.length > 0 ? zombies[zombies.length - 1].id + 1 : 0
  }`
  // zombie.style.left = `${
  //   calculateLeft(zombieToCreate.tile) +
  //   8 * zombiesInTile.length +
  //   (zombiesInTile.length > 0 ? 4 : 0)
  // }px`
  // zombie.style.top = `${
  //   calculateTop(zombieToCreate.tile) +
  //   document.getElementById(`tile-${zombieToCreate.tile}`).clientHeight -
  //   8
  // }px`

  document
    .getElementById(`tile-${zombieToCreate.tile}`)
    .querySelector('.tile__zombies')
    .appendChild(zombie)
}
