import { Parser } from 'expr-eval'

import type {
  LogisticsInfo,
  Seller,
  SellerLogisticsInfoResult,
} from '../typings/types'
import { compare, evaluateShippingEstimate } from './shippingEstimate'

export const sortSellersByPrice = (
  sellersInfo: SellerLogisticsInfoResult[]
) => {
  if (!sellersInfo) return []

  const sortedList = [...sellersInfo]

  sortedList.sort(
    (sellerA, sellerB) =>
      Number(sellerA.seller.commertialOffer.Price) -
      Number(sellerB.seller.commertialOffer.Price)
  )

  return sortedList
}

export const sortSellersByPriceShipping = (
  sellersInfo: SellerLogisticsInfoResult[]
) => {
  if (!sellersInfo) return []

  const sortedList = [...sellersInfo]

  sortedList.sort((sellerA, sellerB) => {
    if (sellerA.logisticsInfo?.slas?.length === 0) {
      return 1
    }

    if (sellerB.logisticsInfo?.slas?.length === 0) {
      return -1
    }

    const shippingPriceA = sellerA.logisticsInfo?.slas?.length
      ? sellerA.logisticsInfo.slas[0].price / 100
      : 0

    const shippingPriceB = sellerB.logisticsInfo?.slas?.length
      ? sellerB.logisticsInfo.slas[0].price / 100
      : 0

    return (
      Number(sellerA.seller.commertialOffer.Price + shippingPriceA) -
      Number(sellerB.seller.commertialOffer.Price + shippingPriceB)
    )
  })

  return sortedList
}

type ExpressionVariablesType =
  | 'productPrice'
  | 'productSpotPrice'
  | 'productAvailableQuantity'
  | 'minShippingPrice'
  | 'maxShippingPrice'
  | 'minShippingEstimate'
  | 'maxShippingEstimate'

type ExpressionVariablesDictionaryType = {
  [key in ExpressionVariablesType]?: (
    seller: Seller,
    logisticsInfo?: LogisticsInfo
  ) => number | string | undefined
}

type LogisticsInfoSLA = LogisticsInfo['slas']

// alternative functions to sort SLA's before sort sellers
const sortSLAByField = {
  minPrice: (slas: LogisticsInfoSLA) =>
    slas.sort((slaA, slaB) => Number(slaA.price) - Number(slaB.price)),
  maxPrice: (slas: LogisticsInfoSLA) =>
    slas.sort((slaA, slaB) => Number(slaB.price) - Number(slaA.price)),
  minShippingEstimate: (slas: LogisticsInfoSLA) =>
    slas?.sort((slaA, slaB) =>
      compare(slaA.shippingEstimate, slaB.shippingEstimate)
    ),
  maxShippingEstimate: (slas: LogisticsInfoSLA) =>
    slas?.sort((slaB, slaA) =>
      compare(slaA.shippingEstimate, slaB.shippingEstimate)
    ),
}

// functions used to get expression values based on ExpressionVariablesType inputed by user
const expressionVariables: ExpressionVariablesDictionaryType = {
  productPrice: (seller: Seller, _logisticsInfo?: LogisticsInfo) =>
    seller.commertialOffer.Price,
  productSpotPrice: (seller: Seller, _logisticsInfo?: LogisticsInfo) =>
    seller.commertialOffer.spotPrice,
  productAvailableQuantity: (seller: Seller, _logisticsInfo?: LogisticsInfo) =>
    seller.commertialOffer.AvailableQuantity,
  minShippingPrice: (_seller: Seller, logisticsInfo?: LogisticsInfo) =>
    logisticsInfo?.slas[0]?.price
      ? sortSLAByField.minPrice(logisticsInfo?.slas)[0]?.price / 100
      : undefined,
  maxShippingPrice: (_seller: Seller, logisticsInfo?: LogisticsInfo) =>
    logisticsInfo?.slas[0]?.price
      ? sortSLAByField.maxPrice(logisticsInfo?.slas)[0]?.price / 100
      : undefined,
  minShippingEstimate: (_seller: Seller, logisticsInfo?: LogisticsInfo) => {
    const shippingEstimate =
      logisticsInfo &&
      sortSLAByField.minShippingEstimate(logisticsInfo.slas)[0]
        ?.shippingEstimate

    if (shippingEstimate) {
      return evaluateShippingEstimate(shippingEstimate)
    }

    return undefined
  },
  maxShippingEstimate: (_seller: Seller, logisticsInfo?: LogisticsInfo) => {
    const shippingEstimate =
      logisticsInfo &&
      sortSLAByField.maxShippingEstimate(logisticsInfo.slas)[0]
        ?.shippingEstimate

    if (shippingEstimate) {
      return evaluateShippingEstimate(shippingEstimate)
    }

    return undefined
  },
}

export const sortSellersByCustomExpression = (
  sellersInfo: SellerLogisticsInfoResult[],
  expression?: string
) => {
  if (!sellersInfo) return []

  if (!expression) return sellersInfo

  const logisticInfoVariables: ExpressionVariablesType[] = [
    'minShippingPrice',
    'maxShippingPrice',
    'minShippingEstimate',
    'maxShippingEstimate',
  ]

  const sortedList = [...sellersInfo]

  const variables = Object.keys(expressionVariables)
    .filter((e) => expression.includes(e))
    .reduce((accumulator: ExpressionVariablesDictionaryType, key) => {
      return {
        ...accumulator,
        [key]: expressionVariables[key as ExpressionVariablesType],
      }
    }, {})

  try {
    sortedList.sort((sellerA, sellerB) => {
      // set the sellers without SLA calculated to end of the array
      if (logisticInfoVariables.some((info) => expression.includes(info))) {
        if (sellerA.logisticsInfo?.slas?.length === 0) {
          return 1
        }

        if (sellerB.logisticsInfo?.slas?.length === 0) {
          return -1
        }
      }

      const { valuesSellerA, valuesSellerB } = Object.keys(variables).reduce(
        (
          accumulator: {
            valuesSellerA: {
              [key in ExpressionVariablesType]?: any
            }
            valuesSellerB: {
              [key in ExpressionVariablesType]?: any
            }
          },
          key: string
        ) => {
          const exec = expressionVariables[key as ExpressionVariablesType]

          const valueA = exec?.(sellerA.seller, sellerA.logisticsInfo)
          const valueB = exec?.(sellerB.seller, sellerB.logisticsInfo)

          return {
            valuesSellerA: { ...accumulator.valuesSellerA, [key]: valueA ?? 0 },
            valuesSellerB: { ...accumulator.valuesSellerB, [key]: valueB ?? 0 },
          }
        },
        { valuesSellerA: {}, valuesSellerB: {} }
      )

      const parser = new Parser()
      const expr = parser.parse(expression)

      const resultA = expr.evaluate({
        ...valuesSellerA,
      })

      const resultB = expr.evaluate({
        ...valuesSellerB,
      })

      return resultA - resultB
    })
  } catch (error) {
    console.error('Invalid variable on expression: ', error.message)

    return sellersInfo
  }

  return sortedList
}
