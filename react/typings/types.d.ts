import { LogisticsInfo as SellerContextLogisticsInfo } from 'vtex.seller-selector/react/SellerContext'
import { Seller as SellerContextSeller } from 'vtex.product-context/react/ProductTypes'

export type Strategies = 'price' | 'priceShipping'

export type LogisticsInfo = SellerContextLogisticsInfo
export type Seller = SellerContextSeller

export interface SellerLogisticsInfoResult {
  seller: Seller
  logisticsInfo: LogisticsInfo
}
