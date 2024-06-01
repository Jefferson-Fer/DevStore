import { Metadata } from 'next'
import Image from 'next/image'

import { api } from '@/data/api'
import { Product } from '@/data/types/product'
import FormatterPrice from '@/lib/utils/formatterPrice'

import AddToCartButton from './add-to-cart-button'

const getSlugProduct = async (slug: string): Promise<Product> => {
  const response = await api(`/products/${slug}`, {
    next: {
      revalidate: 3600,
    },
  })
  return response.json()
}

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> => {
  const product = await getSlugProduct(params.slug)
  return {
    title: product.title,
  }
}

export const generateStaticParams = async () => {
  const response = await api('/products/featured')
  const products: Product[] = await response.json()

  return products.map((product) => ({
    slug: product.slug,
  })) 
}

const ProductInfo = async ({ params }: { params: { slug: string } }) => {
  const product = await getSlugProduct(params.slug)

  return (
    <div className="relative grid max-h-[860px] grid-cols-3">
      <div className="col-span-2">
        <Image
          src={product.image}
          alt=""
          width={900}
          height={900}
          quality={100}
          priority
        />
      </div>
      <div className="flex flex-col justify-center gap-4 px-12">
        <h1 className="text-3xl font-extrabold leading-tight">
          {product.title}
        </h1>
        <p className="text-zinc-400">{product.description}</p>

        <div className="flex items-center gap-3">
          <span className="inline-block rounded-full bg-violet-500 px-5 py-2.5 font-semibold">
            {FormatterPrice(product.price)}
          </span>
          <span className="text-sm text-zinc-400">
            em 12x s/juros de {FormatterPrice(product.price / 12, true)}
          </span>
        </div>

        <div className="mt-6 space-y-4">
          <span className="block font-semibold">Tamanhos</span>

          <div className="flex gap-2">
            <button className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 hover:bg-zinc-600">
              P
            </button>

            <button className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 hover:bg-zinc-600">
              M
            </button>

            <button className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 hover:bg-zinc-600">
              G
            </button>

            <button className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 hover:bg-zinc-600">
              GG
            </button>
          </div>
        </div>

        <AddToCartButton
          id={product.id}
          price={product.price}
          title={product.title}
          image={product.image}
        />
      </div>
    </div>
  )
}

export default ProductInfo
