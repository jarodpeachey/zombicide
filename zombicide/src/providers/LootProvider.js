import { createContext, useContext, useState } from 'react'
import loot from '../data/loot.json'
import shuffle from '../utils/shuffle';

export const LootContext = createContext({})

export default function LootProvider({ strings, children }) {
  let cards = []
  loot.forEach((lootType) => {
    let quantity = lootType.quantity

    for (let i = 1; i <= quantity; i++) {
      cards.push({ ...lootType, quantity: null })
    }
  })

  cards = shuffle(cards)

  return (
    <LootContext.Provider value={{ cards: cards }}>
      {children}
    </LootContext.Provider>
  )
}

export function useLoot() {
  const context = useContext(LootContext)
  if (context === undefined) {
    throw new Error('useLoot() must be used within an LootProvider')
  }
  return context
}
