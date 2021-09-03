import React, { ReactNode, useMemo } from 'react'
import { ProductContextProvider, useProduct } from 'vtex.product-context'
import { MaybeProduct } from 'vtex.product-context/react/ProductTypes'

import {
  LogisticsInfo,
  Seller,
  SellerLogisticsInfoResult,
  Strategies,
} from '../typings/types'
import SellerBody from './SellerBody'
import { useSellerLogisticsInfo } from '../hooks/useSellerLogisticsInfo'
import {
  sortSellersByPrice,
  sortSellersByPriceShipping,
} from '../utils/sortSellers'
import { useReduceProduct } from '../hooks/useReduceProduct'

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

  const { sellers, logisticsInfo } = sortedSellers.reduce(reducer, {
    sellers: [],
    logisticsInfo: [],
  })

  // ToDo: Criar hook para essa transformação do produto
  const { productSelectedItem, productItemsWithoutSelected } = useReduceProduct(
    productContext
  )

  const productWithSortedSellers = useMemo<MaybeProduct>(() => {
    if (
      productContext.product &&
      productSelectedItem &&
      productItemsWithoutSelected
    ) {
      return {
        ...productContext.product,
        items: [
          ...productItemsWithoutSelected,
          { ...productSelectedItem, sellers: [...sellers] },
        ],
      }
    }

    return undefined
  }, [
    productContext.product,
    productSelectedItem,
    productItemsWithoutSelected,
    sellers,
  ])

  const newProduct = useMemo(() => {
    return productWithSortedSellers ?? productContext.product
  }, [productContext.product, productWithSortedSellers])
  //

  return (
    <ProductContextProvider
      query={{ skuId: productContext.selectedItem?.itemId }}
      product={newProduct}
    >
      {/* ToDo: deixar o seller body independente do ProductContextProvider. Talvez criar um BuyBoxProvider para armazenar os dados ordenados e utilizar isso no SellerBody  */}
      <SellerBody sellers={sellers} logisticsInfo={logisticsInfo}>
        {children}
      </SellerBody>
    </ProductContextProvider>
  )
}
