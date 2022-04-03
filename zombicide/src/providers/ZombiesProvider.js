import { useEffect } from 'react'
import { createContext, useContext, useState } from 'react'
import allZombies from '../data/zombies.json'
import { calculateLeft } from '../utils/calculateLeft'
import { calculateTop } from '../utils/calculateTop'
import { createZombieElement } from '../utils/createZombieElement'

export const ZombiesContext = createContext({})

export default function ZombiesProvider({ strings, children }) {
  const [zombies, setZombies] = useState([])
  const [zombiesToGoAgain, setZombiesToGoAgain] = useState([])
  const delay = 50

  const createZombies = (items) => {
    console.log(`ZOMBIES: `, zombies)
    let zombiesToCreate = []

    items.forEach((tileToSpawnIn, index) => {
      setTimeout(() => {
        let number = Math.floor(Math.random() * (6 - 1 + 1)) + 1
        let type = 'walker'
        let goAgain = Math.floor(Math.random() * (3 - 1 + 1)) + 1

        if (zombiesToGoAgain.length > 0) {
          console.log('GO AGAIN: ', goAgain === 1)
          if (goAgain === 1) {
            if (number === 1 || number === 2 || number === 3) {
              type = 'walker'
            } else if (number === 4 || number === 5) {
              type = 'runner'
            } else {
              type = zombiesToGoAgain.length > 0 ? 'walker' : 'fattie'
            }

            let zombieToCreate = {
              ...allZombies.filter((item) => item.type === type)[0],
              type: type,
              tile: tileToSpawnIn,
              id: zombies.length > 0 ? zombies[zombies.length - 1].id + 1 : 0,
            }

            zombiesToCreate.push(zombieToCreate)
            createZombieElement(zombies, zombieToCreate)
          }
        } else {
          if (number === 1 || number === 2 || number === 3) {
            type = 'walker'
          } else if (number === 4 || number === 5) {
            type = 'runner'
          } else {
            type = zombiesToGoAgain.length > 0 ? 'walker' : 'fattie'
          }

          let zombieToCreate = {
            ...allZombies.filter((item) => item.type === type)[0],
            type: type,
            tile: tileToSpawnIn,
            id: zombies.length > 0 ? zombies[zombies.length - 1].id + 1 : 0,
          }

          zombiesToCreate.push(zombieToCreate)
          createZombieElement(zombies, zombieToCreate)
        }
      }, index * delay)
    })

    setTimeout(() => {
      console.log(zombiesToCreate)
      setZombies(zombiesToCreate)
      if (zombiesToGoAgain.length === 0) {
        setZombiesToGoAgain(items)
      }
    }, items.length * delay)
    // } else {
    //   alert("ONLY DOING 2 ZOMBIE CYCLES")
    // }
  }

  useEffect(() => {
    // if (zombiesToGoAgain) {
    //   createZombies(zombiesToGoAgain)
    // }
  }, [zombies])

  useEffect(() => {
    console.log(zombiesToGoAgain)
    if (zombiesToGoAgain && zombiesToGoAgain.length > 0) {
      createZombies(zombiesToGoAgain)
    }
  }, [zombiesToGoAgain])

  return (
    <ZombiesContext.Provider
      value={{
        zombies: zombies,
        createZombies: createZombies,
        // zombieToCreate: zombieToCreate,
        // setZombieToCreate: setZombieToCreate,
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
