import React, { ReactNode, useMemo } from 'react'
import { ProductContextProvider, useProduct } from 'vtex.product-context'

import {
  LogisticsInfo,
  Seller,
  SellerLogisticsInfoResult,
  Strategies,
} from '../typings/types'
import { useSellerLogisticsInfo } from '../hooks/useSellerLogisticsInfo'
import {
  sortSellersByPrice,
  sortSellersByPriceShipping,
} from '../utils/sortSellers'
import { useNewProductWithSellers } from '../hooks/useNewProductWithSellers'

const SortStrategyFunctions: {
  [key in Strategies]: (
    sellersInfo: SellerLogisticsInfoResult[]
  ) => SellerLogisticsInfoResult[]
} = {
  price: sortSellersByPrice,
  priceShipping: sortSellersByPriceShipping,
}

interface ReducerAcumulator {
  sellers: Seller[]
  logisticsInfo: LogisticsInfo[]
}

interface Props {
  children: ReactNode
  sortStrategy: Strategies
}

export const SortSellerByStrategy = ({ children, sortStrategy }: Props) => {
  const sellersInfoResult = useSellerLogisticsInfo()
  const productContext = useProduct() ?? {}

  const sortedSellers = useMemo<SellerLogisticsInfoResult[]>(
    () => SortStrategyFunctions[sortStrategy](sellersInfoResult),
    [sellersInfoResult, sortStrategy]
  )

  const reducer = (
    acumulator: ReducerAcumulator,
    currentValue: SellerLogisticsInfoResult,
    index: number
  ) => {
    // set the buybox winner seller as default seller
    currentValue.seller.sellerDefault = index === 0

    acumulator.sellers.push(currentValue.seller)
    acumulator.logisticsInfo.push(currentValue.logisticsInfo)

    return acumulator
  }

  const { sellers } = sortedSellers.reduce(reducer, {
    sellers: [],
    logisticsInfo: [],
  })

  const newProduct = useNewProductWithSellers({ productContext, sellers })

  return (
    <ProductContextProvider
      query={{ skuId: productContext.selectedItem?.itemId }}
      product={newProduct}
    >
      {children}
    </ProductContextProvider>
  )
}
