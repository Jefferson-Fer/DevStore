import Image from 'next/image'

import {
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@/components/ui/dialog'
import { useCart } from '@/context/cart-context'

const CartListModal = () => {
  const { items } = useCart()

  return (
    <DialogPortal>
      <DialogOverlay className="absolute right-0" />
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="pt-8 text-2xl tracking-tight">
            Sacola de compras
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-8">
          {items.map((item) => {
            return (
              <div key={item.id} className="flex items-center justify-between">
                <h1 className="flex items-center justify-center gap-4">
                  <Image src={item.image} alt="" width={60} height={60} />{' '}
                  {item.title}
                </h1>

                <p className="flex items-center justify-center gap-1">
                  {item.quantity} X {item.price} ={' '}
                  <span>{item.price * item.quantity}</span>
                </p>
              </div>
            )
          })}
        </div>
      </DialogContent>
    </DialogPortal>
  )
}

export default CartListModal
