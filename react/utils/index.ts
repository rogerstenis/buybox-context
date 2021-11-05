import type { Seller } from '../typings/types'

export const isAvailableSellers = (seller: Seller) => {
  return seller.commertialOffer.AvailableQuantity > 0
}

export const getAvailableSellers = (sellers: Seller[] | undefined) => {
  if (!sellers) return []

  return sellers.filter(isAvailableSellers)
}
