import type { FC } from 'react'
import React from 'react'
import { ProductContextProvider, useProduct } from 'vtex.product-context'

import { useNewProductWithSellers } from '../hooks/useNewProductWithSellers'
import { useBuyBoxContext } from '../context/BuyboxContext'

export const ProductWithSortedSellers: FC = ({ children }) => {
  const productContext = useProduct() ?? {}
  const { sortedSellers } = useBuyBoxContext()

  const newProduct = useNewProductWithSellers({
    productContext,
    sellers: sortedSellers,
  })

  return (
    <ProductContextProvider
      query={{ skuId: productContext.selectedItem?.itemId }}
      product={newProduct}
    >
      {children}
    </ProductContextProvider>
  )
}

// TODO: apagar comentários
// import type { ReactNode } from 'react'
// import React from 'react'
// import { ProductContextProvider, useProduct } from 'vtex.product-context'

// import type {
//   SellerLogisticsInfoResult,
//   Strategies,
//   TriggerCepChangeEventType,
// } from '../typings/types'
// import { useSellerLogisticsInfo } from '../hooks/useSellerLogisticsInfo'
// import {
//   sortSellersByPrice,
//   sortSellersByPriceShipping,
// } from '../utils/sortSellers'
// import { useNewProductWithSellers } from '../hooks/useNewProductWithSellers'
// import { useReduceSellerLogisticsInfo } from '../hooks/useReduceSellerLogisticsInfo'
// import { useSellerLoginstcsInfoSellerSelector } from '../hooks/useSellerLoginstcsInfoSellerSelector'
// import { BuyBoxContext } from '../context/BuyboxContext'

// const SortStrategyFunctions: {
//   [key in Strategies]: (
//     sellersInfo: SellerLogisticsInfoResult[]
//   ) => SellerLogisticsInfoResult[]
// } = {
//   price: sortSellersByPrice,
//   priceShipping: sortSellersByPriceShipping,
// }

// const SellerLogisticsInfoFunctions: {
//   [key in TriggerCepChangeEventType]: () => SellerLogisticsInfoResult[]
// } = {
//   orderForm: useSellerLogisticsInfo,
//   sellerSelector: useSellerLoginstcsInfoSellerSelector,
// }

// interface Props {
//   children: ReactNode
//   sortStrategy: Strategies
//   triggerCepChangeEvent: TriggerCepChangeEventType
// }

// export const SortSellerByStrategy = ({
//   children,
//   sortStrategy,
//   triggerCepChangeEvent,
// }: Props) => {
//   const productContext = useProduct() ?? {}

//   const sellersInfoResult = SellerLogisticsInfoFunctions[
//     triggerCepChangeEvent
//   ]()

//   const sortedSellersLogisticInfo = SortStrategyFunctions[sortStrategy](
//     sellersInfoResult
//   )

//   const {
//     sellers: sortedSellers,
//     logisticsInfo: sortedLogisticsInfo,
//   } = useReduceSellerLogisticsInfo({
//     sellerLogisticsInfo: sortedSellersLogisticInfo,
//   })

//   const newProduct = useNewProductWithSellers({
//     productContext,
//     sellers: sortedSellers,
//   })

//   return (
//     <BuyBoxContext.Provider
//       value={{
//         sortedSellersLogisticInfo,
//         sortedSellers,
//         sortedLogisticsInfo,
//       }}
//     >
//       <ProductContextProvider
//         query={{ skuId: productContext.selectedItem?.itemId }}
//         product={newProduct}
//       >
//         {children}
//       </ProductContextProvider>
//     </BuyBoxContext.Provider>
//   )
// }

// import type { ReactNode } from 'react'
// import React, { useState, useContext, useEffect, useMemo } from 'react'
// import { ProductContextProvider, useProduct } from 'vtex.product-context'

// import type {
//   SellerLogisticsInfoResult,
//   Strategies,
//   TriggerCepChangeEventType,
// } from '../typings/types'
// import { useSellerLogisticsInfo } from '../hooks/useSellerLogisticsInfo'
// import {
//   sortSellersByPrice,
//   sortSellersByPriceShipping,
// } from '../utils/sortSellers'
// import { useNewProductWithSellers } from '../hooks/useNewProductWithSellers'
// import { BuyBoxContext } from '../BuyboxContext'
// import { useReduceSellerLogisticsInfo } from '../hooks/useReduceSellerLogisticsInfo'
// import { useSellerLoginstcsInfoSellerSelector } from '../hooks/useSellerLoginstcsInfoSellerSelector'

// const SortStrategyFunctions: {
//   [key in Strategies]: (
//     sellersInfo: SellerLogisticsInfoResult[]
//   ) => SellerLogisticsInfoResult[]
// } = {
//   price: sortSellersByPrice,
//   priceShipping: sortSellersByPriceShipping,
// }

// const SellerLogisticsInfoFunctions: {
//   [key in TriggerCepChangeEventType]: () => SellerLogisticsInfoResult[]
// } = {
//   orderForm: useSellerLogisticsInfo,
//   sellerSelector: useSellerLoginstcsInfoSellerSelector,
// }

// interface Props {
//   children: ReactNode
//   sortStrategy: Strategies
//   triggerCepChangeEvent: TriggerCepChangeEventType
// }

// export const SortSellerByStrategy = ({
//   children,
//   sortStrategy,
//   triggerCepChangeEvent,
// }: Props) => {
//   const [currentHash, setCurrentHash] = useState('')
//   const { setOrderedSellers } = useContext(BuyBoxContext)
//   const productContext = useProduct() ?? {}

//   const sellersInfoHook = SellerLogisticsInfoFunctions[triggerCepChangeEvent]

//   const sellersInfoResult = sellersInfoHook()

//   const sortedSellers = useMemo<SellerLogisticsInfoResult[]>(
//     () => SortStrategyFunctions[sortStrategy](sellersInfoResult),
//     [sellersInfoResult, sortStrategy]
//   )

//   const { sellers } = useReduceSellerLogisticsInfo({
//     sellerLogisticsInfo: sortedSellers,
//   })

//   useEffect(() => {
//     const hash = JSON.stringify(sortedSellers)

//     if (hash !== currentHash) {
//       setCurrentHash(hash)
//       setOrderedSellers(sortedSellers)
//     }
//   }, [currentHash, setOrderedSellers, sortedSellers])

//   const newProduct = useNewProductWithSellers({ productContext, sellers })

//   return (
//     <ProductContextProvider
//       query={{ skuId: productContext.selectedItem?.itemId }}
//       product={newProduct}
//     >
//       {children}
//     </ProductContextProvider>
//   )
// }
