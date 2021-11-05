import { useMemo } from 'react'
import { useProduct } from 'vtex.product-context'
import { SellerContext } from 'vtex.seller-selector'

import type { LogisticsInfo, SellerLogisticsInfoResult } from '../typings/types'
import { isAvailableSellers } from '../utils'

export const useSellerLoginstcsInfoSellerSelector =
  (): SellerLogisticsInfoResult[] => {
    const { selectedItem } = useProduct() ?? {}

    const { shippingQuotes } = SellerContext.useSellerContext()

    const logisticsInfo = useMemo(
      () =>
        shippingQuotes?.logisticsInfo.reduce((acummulator, currentValue) => {
          acummulator[currentValue.itemIndex] = currentValue

          return acummulator
        }, {} as { [key in string]: LogisticsInfo }),
      [shippingQuotes?.logisticsInfo]
    )

    const sellersLogisticsInfo = selectedItem
      ? selectedItem.sellers.map((seller, index) => {
          return {
            seller,
            logisticsInfo: logisticsInfo ? logisticsInfo[index] : undefined,
          }
        })
      : []

    return sellersLogisticsInfo.filter((sellerLogisticsInfo) =>
      isAvailableSellers(sellerLogisticsInfo.seller)
    )
  }
