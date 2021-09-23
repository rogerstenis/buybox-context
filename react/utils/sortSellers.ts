import { Parser } from 'expr-eval'

import type {
  LogisticsInfo,
  Seller,
  SellerLogisticsInfoResult,
} from '../typings/types'

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

type ExpressionVariablesType = 'productPrice' | 'shippingPrice'

type ExpressionVariablesDictionaryType = {
  [key in ExpressionVariablesType]?: (
    seller: Seller,
    logisticsInfo?: LogisticsInfo
  ) => number | string | undefined
}

const expressionVariables: ExpressionVariablesDictionaryType = {
  productPrice: (seller: Seller, _logisticsInfo?: LogisticsInfo) =>
    seller.commertialOffer.Price,
  shippingPrice: (_seller: Seller, logisticsInfo?: LogisticsInfo) =>
    logisticsInfo?.slas[0]?.price
      ? logisticsInfo?.slas[0]?.price / 100
      : undefined,
}

export const sortSellersByCustomExpression = (
  sellersInfo: SellerLogisticsInfoResult[],
  expression?: string
) => {
  if (!sellersInfo) return []

  if (!expression) return sellersInfo

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
      if (sellerA.logisticsInfo?.slas?.length === 0) {
        return 1
      }

      if (sellerB.logisticsInfo?.slas?.length === 0) {
        return -1
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
