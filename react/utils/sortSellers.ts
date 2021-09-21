import { SellerLogisticsInfoResult } from '../typings/types'

export const sortSellersByPrice = (
  sellersInfo: SellerLogisticsInfoResult[]
) => {
  if (!sellersInfo) return []

  const sortedList = [...sellersInfo]

  sortedList.sort(
    (sellerA, sellerB) =>
      Number(sellerA.seller.commertialOffer.Price) -
      Number(sellerB.seller.commertialOffer.Price)
  )

  return sortedList
}

export const sortSellersByPriceShipping = (
  sellersInfo: SellerLogisticsInfoResult[]
) => {
  if (!sellersInfo) return []

  const sortedList = [...sellersInfo]

  sortedList.sort((sellerA, sellerB) => {
    if (sellerA.logisticsInfo.slas?.length === 0) {
      return 1
    }

    if (sellerB.logisticsInfo.slas?.length === 0) {
      return -1
    }

    const shippingPriceA = sellerA.logisticsInfo.slas?.length
      ? sellerA.logisticsInfo.slas[0].price / 100
      : 0

    const shippingPriceB = sellerB.logisticsInfo.slas?.length
      ? sellerB.logisticsInfo.slas[0].price / 100
      : 0

    return (
      Number(sellerA.seller.commertialOffer.Price + shippingPriceA) -
      Number(sellerB.seller.commertialOffer.Price + shippingPriceB)
    )
  })

  return sortedList
}
