import type {
  LogisticsInfo,
  Seller,
  SellerLogisticsInfoResult,
} from '../typings/types'

interface ReducerAcumulator {
  sellers: Seller[]
  logisticsInfo: LogisticsInfo[]
}

interface Props {
  sellerLogisticsInfo: SellerLogisticsInfoResult[]
}

// TODO: criar testes
export const useReduceSellerLogisticsInfo = ({
  sellerLogisticsInfo,
}: Props): ReducerAcumulator => {
  const initialValue = {
    sellers: [],
    logisticsInfo: [],
  }

  if (!sellerLogisticsInfo) {
    return initialValue
  }

  const reducer = (
    acumulator: ReducerAcumulator,
    currentValue: SellerLogisticsInfoResult,
    index: number
  ) => {
    // set the buybox winner seller as default seller
    currentValue.seller.sellerDefault = index === 0

    acumulator.sellers.push(currentValue.seller)
    currentValue.logisticsInfo &&
      acumulator.logisticsInfo.push(currentValue.logisticsInfo)

    return acumulator
  }

  return sellerLogisticsInfo.reduce(reducer, {
    sellers: [],
    logisticsInfo: [],
  })
}
