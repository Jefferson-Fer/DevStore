import { z } from 'zod'

import data from '../data.json'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = z.string().parse(searchParams.get('q'))

  const product = data.products.filter((prod) => {
    return prod.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
  })

  if (product) {
    return Response.json(product)
  }

  return Response.json({ message: 'Product not found' }, { status: 400 })
}
