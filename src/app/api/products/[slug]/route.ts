import { z } from 'zod'

import data from '../data.json'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  const slug = z.string().parse(params.slug)
  const product = data.products.find((product) => product.slug === slug)

  if (product) {
    return Response.json(product)
  }

  return Response.json({ message: 'Product not found' }, { status: 400 })
}
