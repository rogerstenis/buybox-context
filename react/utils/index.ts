import type { Seller } from '../typings/types'

export const getAvailableSellers = (sellers: Seller[] | undefined) => {
  if (!sellers) return []

  return sellers.filter(
    (seller) => seller.commertialOffer.AvailableQuantity > 0
  )
}
