'use client'

import { ShoppingBag } from 'lucide-react'

import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { useCart } from '@/context/cart-context'

import CartListModal from './cart-list-modal'

const CartWidget = () => {
  const { items } = useCart()

  return (
    <div className="flex items-center gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <button className="flex gap-2">
            <ShoppingBag className="h-5 w-5" />
            <span className="text-sm">Cart ({items.length})</span>
          </button>
        </DialogTrigger>

        <CartListModal />
      </Dialog>
    </div>
  )
}

export default CartWidget
