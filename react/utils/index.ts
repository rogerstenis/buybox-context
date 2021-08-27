import { Seller } from 'vtex.product-context/react/ProductTypes'

export const sortSellersByPrice = (sellers: Seller[] | undefined) => {
  if (!sellers) return []

  const sortedList = [...sellers]

  sortedList.sort(
    (a, b) => Number(a.commertialOffer.Price) - Number(b.commertialOffer.Price)
  )

  return sortedList
}
