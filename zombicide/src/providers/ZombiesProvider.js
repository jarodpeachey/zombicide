import { useEffect } from 'react'
import { createContext, useContext, useState } from 'react'
import allZombies from '../data/zombies.json'
import { calculateLeft } from '../utils/calculateLeft'
import { calculateTop } from '../utils/calculateTop'
import { createZombieElement } from '../utils/createZombieElement'

export const ZombiesContext = createContext({})

export default function ZombiesProvider({ strings, children }) {
  const [zombies, setZombies] = useState([])
  const [zombieIndex, setZombieIndex] = useState(0)
  const [zombiesToGoAgain, setZombiesToGoAgain] = useState([])
  const delay = 0

  const createZombies = (items) => {
    let zombiesToCreate = []
    let addToIndex = 1

    items.forEach((tileToSpawnIn, index) => {
      setTimeout(() => {
        let number = Math.floor(Math.random() * (9 - 1 + 1)) + 1
        let type = ''
        let goAgain = Math.floor(Math.random() * (3 - 1 + 1)) + 1

        if (zombiesToGoAgain.length > 0) {
          if (goAgain === 1) {
            if (number === 1 || number === 2 || number === 3) {
              type = 'walker'
            } else if (number === 4 || number === 5) {
              type = 'runner'
            } else {
              type = ''
            }

            let zombieToCreate = {
              ...allZombies.filter((item) => item.type === type)[0],
              type: type,
              tile: tileToSpawnIn,
              id: zombieIndex + addToIndex,
            }

            if (type !== '') {
              zombiesToCreate.push(zombieToCreate)
              addToIndex++
            }
            // createZombieElement(zombies, zombieToCreate)
          }
          setZombiesToGoAgain([])
        } else {
          if (number === 1 || number === 2 || number === 3) {
            type = 'walker'
          } else if (number === 4 || number === 5) {
            type = 'runner'
          } else if (number === 6) {
            type = 'fattie'
          } else {
            type = ''
          }

          let zombieToCreate = {
            ...allZombies.filter((item) => item.type === type)[0],
            type: type,
            tile: tileToSpawnIn,
            id: zombieIndex + addToIndex,
          }

          if (type !== '') {
            zombiesToCreate.push(zombieToCreate)
            addToIndex++
          }
          if (type === 'fattie') {
            zombiesToCreate.push({
              ...allZombies.filter((item) => item.type === 'walker')[0],
              type: 'walker',
              tile: tileToSpawnIn,
              id: zombieIndex + addToIndex,
            })
            addToIndex++
            zombiesToCreate.push({
              ...allZombies.filter((item) => item.type === 'walker')[0],
              type: 'walker',
              tile: tileToSpawnIn,
              id: zombieIndex + addToIndex,
            })
            addToIndex++
          }
          // if (type !== '') {
          //   createZombieElement(zombies, zombieToCreate)
          // }
        }
      }, index * delay)
    })

    setTimeout(() => {
      let newZombies = [...zombies]
      zombiesToCreate.forEach((item) => {
        newZombies.push(item)
      })
      setZombies(newZombies)
      setZombieIndex(zombiesToCreate.length + zombieIndex)

      if (zombiesToGoAgain.length === 0) {
        setZombiesToGoAgain(items)
      }
    }, items.length * delay)
  }

  useEffect(() => {
    if (zombiesToGoAgain && zombiesToGoAgain.length > 0) {
      createZombies(zombiesToGoAgain)
    }
  }, [zombiesToGoAgain])

  useEffect(() => {
    console.log("ZOMBIES: ", zombies);
    let things = document.querySelectorAll('.zombie')

    things.forEach((item) => item.remove())

    zombies.forEach((zombieToCreate) => {
      createZombieElement(zombies, zombieToCreate)
    })
  }, [zombies])

  const killZombies = (zombiesToKill) => {
    console.log('KILLING ZOMBIES: ', zombiesToKill)
    let ids = []

    // LOOP THROUGH ZOMBIES AND KILL
    zombiesToKill.forEach((zombie) => {
      ids.push(zombie.id)
    })

    console.log(ids);

    setZombies([...zombies.filter((zombie) => !ids.includes(zombie.id))])
  }

  return (
    <ZombiesContext.Provider
      value={{
        zombies: zombies,
        createZombies: createZombies,
        killZombies: killZombies,
      }}
    >
      {children}
    </ZombiesContext.Provider>
  )
}

export function useZombies() {
  const context = useContext(ZombiesContext)
  if (context === undefined) {
    throw new Error('useZombies() must be used within an ZombiesProvider')
  }
  return context
}
