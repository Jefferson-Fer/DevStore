import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

import { api } from '@/data/api'
import { Product } from '@/data/types/product'
import FormatterPrice from '@/lib/utils/formatterPrice'

const searchProducts = async (query: string): Promise<Product[]> => {
  const response = await api(`/products/search?q=${query}`, {
    next: {
      revalidate: 3600,
    },
  })
  return response.json()
}

export const metadata: Metadata = {
  title: 'Search',
}

const SearchProduct = async ({
  searchParams,
}: {
  searchParams: { q: string }
}) => {
  const { q: query } = searchParams

  if (!query) {
    redirect('/')
  }

  const products = await searchProducts(query)

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        Resultados para:
        <Suspense>
          <span className="font-semibold">{query}</span>
        </Suspense>
      </p>

      <div className="grid grid-cols-3 gap-6">
        {products.map((prod) => {
          return (
            <Link
              key={prod.id}
              href={`/products/${prod.slug}`}
              className="group relative flex justify-end overflow-hidden rounded-lg bg-zinc-900"
            >
              <Image
                src={prod.image}
                alt=""
                className="transition-transform duration-200 group-hover:scale-105"
                width={440}
                height={440}
                quality={100}
              />

              <div className="absolute bottom-10 right-10 flex h-12 max-w-[280px] items-center gap-2 rounded-full border-2 border-zinc-700 bg-black/60 p-1 pl-5">
                <span className="truncate text-sm ">{prod.title}</span>
                <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
                  {FormatterPrice(prod.price)}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default SearchProduct
