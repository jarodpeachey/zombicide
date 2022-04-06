import { calculateLeft } from './calculateLeft'
import { calculateTop } from './calculateTop'

export const createZombieElement = (zombies, zombieToCreate) => {
  // let previousZombieElement = document.getElementById(
  //   `zombie-${zombieToCreate.id}`
  // )
  // if (previousZombieElement) {
  //   previousZombieElement.remove()
  // }

  if (zombieToCreate.type === 'fattie') {
    createZombieElement(zombies, { ...zombieToCreate, type: 'walker' })
    createZombieElement(zombies, { ...zombieToCreate, type: 'walker' })
  }

  if (zombieToCreate.type !== '') {
    let zombie = document.createElement('div')
    zombie.className = `zombie ${zombieToCreate.type}`
    // zombie.id = `zombie-${zombieToCreate.id}`

    document
      .getElementById(`tile-${zombieToCreate.tile}`)
      .querySelector('.tile__zombies')
      .appendChild(zombie)
  }
}
