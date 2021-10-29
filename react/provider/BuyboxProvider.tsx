import type { ReactNode } from 'react'
import React from 'react'
import { useIntl } from 'react-intl'

import BuyboxContext from '../context/BuyboxContext'
import { useReduceSellerLogisticsInfo } from '../hooks/useReduceSellerLogisticsInfo'
import { useSellerLoginstcsInfoSellerSelector } from '../hooks/useSellerLoginstcsInfoSellerSelector'
import { useSellerLogisticsInfo } from '../hooks/useSellerLogisticsInfo'
import { useSellersByProtocol } from '../hooks/useSellersByProtocol'
import type {
  SellerLogisticsInfoResult,
  Strategies,
  TriggerCepChangeEventType,
} from '../typings/types'
import { messages } from '../utils/messages'
import {
  sortSellersByCustomExpression,
  sortSellersByPrice,
  sortSellersByPriceShipping,
} from '../utils/sortSellers'

const SortStrategyFunctions: {
  [key in Strategies]: (
    sellersInfo: SellerLogisticsInfoResult[],
    expression?: string
  ) => SellerLogisticsInfoResult[]
} = {
  price: sortSellersByPrice,
  priceShipping: sortSellersByPriceShipping,
  customExpression: sortSellersByCustomExpression,
  protocol: useSellersByProtocol,
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
  expression?: string
  triggerCepChangeEvent: TriggerCepChangeEventType
}

const BuyboxProvider = ({
  children,
  sortStrategy,
  expression,
  triggerCepChangeEvent,
}: Props) => {
  const intl = useIntl()

  const sellersInfoResult =
    SellerLogisticsInfoFunctions[triggerCepChangeEvent]()

  let sortedSellersLogisticInfo: SellerLogisticsInfoResult[] = []

  try {
    sortedSellersLogisticInfo = SortStrategyFunctions[sortStrategy](
      sellersInfoResult,
      expression
    )
  } catch (error) {
    sortedSellersLogisticInfo = SortStrategyFunctions.price(sellersInfoResult)

    console.warn(intl.formatMessage(messages.protocolError), error)
  }

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
