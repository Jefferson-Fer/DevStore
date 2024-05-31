import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { api } from '@/data/api'
import { Product } from '@/data/types/product'
import FormatterPrice from '@/lib/utils/formatterPrice'

const getFeaturedProducts = async (): Promise<Product[]> => {
  const response = await api('/products/featured', {
    next: {
      revalidate: 3600,
    },
  })
  return response.json()
}

export const metadata: Metadata = {
  title: 'Home',
}

const Home = async () => {
  const products = await getFeaturedProducts()
  const otherProducts = products.slice(1)

  return (
    <div className="grid max-h-[860px] grid-cols-9 grid-rows-6 gap-6">
      <Link
        href={`/products/${products[0].slug}`}
        className="group relative col-span-6 row-span-6 flex items-end justify-center overflow-hidden rounded-lg bg-zinc-900"
      >
        <Image
          src={products[0].image}
          alt=""
          className="transition-transform duration-200 group-hover:scale-105"
          width={860}
          height={860}
          quality={100}
        />

        <div className="absolute bottom-28 right-28 flex h-12 max-w-[280px] items-center gap-2 rounded-full border-2 border-zinc-700 bg-black/60 p-1 pl-5">
          <span className="truncate text-sm ">{products[0].title}</span>
          <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
            {FormatterPrice(products[0].price)}
          </span>
        </div>
      </Link>

      {otherProducts.map((product) => {
        return (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="group relative col-span-3 row-span-3 flex justify-end overflow-hidden rounded-lg bg-zinc-900"
          >
            <Image
              src={product.image}
              alt=""
              className="transition-transform duration-200 group-hover:scale-105"
              width={860}
              height={860}
              quality={100}
            />

            <div className="absolute bottom-10 right-10 flex h-12 max-w-[280px] items-center gap-2 rounded-full border-2 border-zinc-700 bg-black/60 p-1 pl-5">
              <span className="truncate text-sm ">{product.title}</span>
              <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
                {FormatterPrice(product.price)}
              </span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
export default Home
