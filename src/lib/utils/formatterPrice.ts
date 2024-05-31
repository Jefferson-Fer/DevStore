const FormatterPrice = (price: number, fraction?: boolean) => {
  if (!fraction) {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    })
  }

  return price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export default FormatterPrice
