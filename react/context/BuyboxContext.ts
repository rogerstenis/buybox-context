import { createContext, useContext } from 'react'

import type {
  LogisticsInfo,
  Seller,
  SellerLogisticsInfoResult,
} from '../typings/types'

export interface BuyBoxContextType {
  sortedSellersLogisticInfo: SellerLogisticsInfoResult[]
  sortedSellers: Seller[]
  sortedLogisticsInfo: LogisticsInfo[]
}

export const BuyBoxContext = createContext<BuyBoxContextType>({
  sortedSellersLogisticInfo: [],
  sortedSellers: [],
  sortedLogisticsInfo: [],
})

export function useBuyBoxContext() {
  return useContext(BuyBoxContext)
}

export default BuyBoxContext
