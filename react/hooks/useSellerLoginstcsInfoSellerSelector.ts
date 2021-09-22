import { useMemo } from 'react'
import { useProduct } from 'vtex.product-context'
import { SellerContext } from 'vtex.seller-selector'

import type { SellerLogisticsInfoResult } from '../typings/types'

// TODO: criar testes
export const useSellerLoginstcsInfoSellerSelector =
  (): SellerLogisticsInfoResult[] => {
    const { selectedItem } = useProduct() ?? {}
    const { shippingQuotes } = SellerContext.useSellerContext()

    const logisticsInfo = useMemo(
      () => shippingQuotes?.logisticsInfo,
      [shippingQuotes?.logisticsInfo]
    )

    return selectedItem
      ? selectedItem.sellers.map((seller, index) => {
          return {
            seller,
            logisticsInfo: logisticsInfo ? logisticsInfo[index] : undefined,
          }
        })
      : []
  }
