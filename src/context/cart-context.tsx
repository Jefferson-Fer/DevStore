'use client'

import { createContext, ReactNode, useContext, useState } from 'react'

interface CartType {
  id: number
  title: string
  price: number
  image: string
  quantity: number
}

interface CartContextType {
  items: CartType[]
  addToCart: (id: number, title: string, price: number, image: string) => void
}

const CartContext = createContext({} as CartContextType)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartType[]>([])

  const addToCart = (
    id: number,
    title: string,
    price: number,
    image: string,
  ) => {
    setCartItems((state) => {
      const productInCart = state.some((product) => product.id === id)

      if (productInCart) {
        return state.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      } else {
        return [...state, { id, title, price, image, quantity: 1 }]
      }
    })
  }

  return (
    <CartContext.Provider value={{ items: cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
