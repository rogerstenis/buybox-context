import type { ReactNode } from 'react'
import React from 'react'

import BuyboxContext from '../context/BuyboxContext'
import { useReduceSellerLogisticsInfo } from '../hooks/useReduceSellerLogisticsInfo'
import { useSellerLoginstcsInfoSellerSelector } from '../hooks/useSellerLoginstcsInfoSellerSelector'
import { useSellerLogisticsInfo } from '../hooks/useSellerLogisticsInfo'
import type {
  SellerLogisticsInfoResult,
  Strategies,
  TriggerCepChangeEventType,
} from '../typings/types'
import {
  sortSellersByPrice,
  sortSellersByPriceShipping,
} from '../utils/sortSellers'

const SortStrategyFunctions: {
  [key in Strategies]: (
    sellersInfo: SellerLogisticsInfoResult[]
  ) => SellerLogisticsInfoResult[]
} = {
  price: sortSellersByPrice,
  priceShipping: sortSellersByPriceShipping,
}

const SellerLogisticsInfoFunctions: {
  [key in TriggerCepChangeEventType]: () => SellerLogisticsInfoResult[]
} = {
  orderForm: useSellerLogisticsInfo,
  sellerSelector: useSellerLoginstcsInfoSellerSelector,
}

interface Props {
  children: ReactNode
  sortStrategy: Strategies
  triggerCepChangeEvent: TriggerCepChangeEventType
}

const BuyboxProvider = ({
  children,
  sortStrategy,
  triggerCepChangeEvent,
}: Props) => {
  const sellersInfoResult =
    SellerLogisticsInfoFunctions[triggerCepChangeEvent]()

  const sortedSellersLogisticInfo =
    SortStrategyFunctions[sortStrategy](sellersInfoResult)

  const { sellers: sortedSellers, logisticsInfo: sortedLogisticsInfo } =
    useReduceSellerLogisticsInfo({
      sellerLogisticsInfo: sortedSellersLogisticInfo,
    })

  return (
    <BuyboxContext.Provider
      value={{
        sortedSellersLogisticInfo,
        sortedSellers,
        sortedLogisticsInfo,
      }}
    >
      {children}
    </BuyboxContext.Provider>
  )
}

export default BuyboxProvider
