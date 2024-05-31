'use client'

import { useCart } from '@/context/cart-context'

interface AddToCartButtonProps {
  id: number
  title: string
  price: number
  image: string
}

const AddToCartButton = ({ id, price, title, image }: AddToCartButtonProps) => {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(id, title, price, image)
  }

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      className="mt-4 flex h-12 items-center justify-center rounded-full bg-emerald-600 hover:bg-emerald-500"
    >
      Adicionar ao carrinho
    </button>
  )
}

export default AddToCartButton
