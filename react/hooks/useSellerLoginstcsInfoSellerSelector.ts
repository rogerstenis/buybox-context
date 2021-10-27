import { useMemo } from 'react'
import { useProduct } from 'vtex.product-context'
import { SellerContext } from 'vtex.seller-selector'

import type { SellerLogisticsInfoResult } from '../typings/types'
import { getAvailableSellers } from '../utils'

export const useSellerLoginstcsInfoSellerSelector =
  (): SellerLogisticsInfoResult[] => {
    const { selectedItem } = useProduct() ?? {}

    const { shippingQuotes } = SellerContext.useSellerContext()

    const logisticsInfo = useMemo(
      () => shippingQuotes?.logisticsInfo,
      [shippingQuotes?.logisticsInfo]
    )

    return getAvailableSellers(selectedItem?.sellers).map((seller, index) => {
      return {
        seller,
        logisticsInfo: logisticsInfo ? logisticsInfo[index] : undefined,
      }
    })
  }
