import type { SellerLogisticsInfoResult } from '../../typings/types'
import {
  sortSellersByCustomExpression,
  sortSellersByPrice,
  sortSellersByPriceShipping,
} from '../../utils/sortSellers'
// eslint-disable-next-line jest/no-mocks-import
import {
  unsortedSellersMock,
  unsortedSellersShippingMock,
} from '../../__mocks__/sellers'

describe('sortSellersByPrice', () => {
  it('should sort sellers correctly', () => {
    // arrange
    const [seller1, seller2, seller3, seller4, seller5, seller6] =
      unsortedSellersMock

    const expected: SellerLogisticsInfoResult[] = [
      seller3,
      seller5,
      seller4,
      seller6,
      seller2,
      seller1,
    ]

    const unsortedSellers: SellerLogisticsInfoResult[] = unsortedSellersMock

    // act
    const sortedSellers = sortSellersByPrice(unsortedSellers)

    // assert
    expect(sortedSellers).toStrictEqual(expected)
  })

  it('should mantain sellers sort', () => {
    // arrange
    const [seller1, seller2, seller3, seller4, seller5, seller6] =
      unsortedSellersMock

    const expected: SellerLogisticsInfoResult[] = [
      seller3,
      seller5,
      seller4,
      seller6,
      seller2,
      seller1,
    ]

    const sellers: SellerLogisticsInfoResult[] = [...expected]

    // act
    const sortedSellers = sortSellersByPrice(sellers)

    // assert
    expect(sortedSellers).toStrictEqual(expected)
  })

  it('should return a array empty', () => {
    // arrange
    const expected: SellerLogisticsInfoResult[] = []
    const unsortedSellers: SellerLogisticsInfoResult[] = []

    // act
    const sortedSellers = sortSellersByPrice(unsortedSellers)

    // assert
    expect(sortedSellers).toStrictEqual(expected)
  })
})

describe('sortSellersByPriceShipping', () => {
  it('should sort sellers correctly', () => {
    // arrange
    const [seller1, seller2, seller3, seller4, seller5, seller6] =
      unsortedSellersShippingMock

    const expected: SellerLogisticsInfoResult[] = [
      seller5,
      seller6,
      seller2,
      seller1,
      seller3,
      seller4,
    ]

    const unsortedSellers: SellerLogisticsInfoResult[] =
      unsortedSellersShippingMock

    // act
    const sortedSellers = sortSellersByPriceShipping(unsortedSellers)

    // assert
    expect(sortedSellers).toStrictEqual(expected)
  })

  it('should mantain sellers sort', () => {
    // arrange
    const [seller1, seller2, seller3, seller4, seller5, seller6] =
      unsortedSellersShippingMock

    const expected: SellerLogisticsInfoResult[] = [
      seller5,
      seller6,
      seller2,
      seller1,
      seller3,
      seller4,
    ]

    const sellers: SellerLogisticsInfoResult[] = [...expected]

    // act
    const sortedSellers = sortSellersByPriceShipping(sellers)

    // assert
    expect(sortedSellers).toStrictEqual(expected)
  })

  it('should set seller to last position when have not SLA', () => {
    // arrange
    const [seller1, seller2, seller3, seller4, seller5, seller6] =
      unsortedSellersShippingMock

    const hasSLA: SellerLogisticsInfoResult[] = [
      seller5,
      seller6,
      seller2,
      seller1,
    ]

    const hasNotSLA: SellerLogisticsInfoResult[] = [seller3, seller4]

    // act
    const sortedSellers = sortSellersByPriceShipping(
      unsortedSellersShippingMock
    )

    // assert
    const SLAs = sortedSellers.filter(
      (seller) => seller.logisticsInfo?.slas.length
    )

    expect(SLAs).toStrictEqual(hasSLA)
    expect(sortedSellers.splice(SLAs.length)).toStrictEqual(hasNotSLA)
  })

  it('should return a array empty', () => {
    // arrange
    const expected: SellerLogisticsInfoResult[] = []
    const unsortedSellers: SellerLogisticsInfoResult[] = []

    // act
    const sortedSellers = sortSellersByPrice(unsortedSellers)

    // assert
    expect(sortedSellers).toStrictEqual(expected)
  })
})

describe('sortSellersByCustomExpression', () => {
  it('should sort sellers correctly with expression productPrice + minShippingPrice', () => {
    // arrange
    const expression = 'productPrice + minShippingPrice'

    const [seller1, seller2, seller3, seller4, seller5, seller6] =
      unsortedSellersShippingMock

    const expected: SellerLogisticsInfoResult[] = [
      seller5,
      seller6,
      seller2,
      seller1,
      seller3,
      seller4,
    ]

    const unsortedSellers: SellerLogisticsInfoResult[] =
      unsortedSellersShippingMock

    // act
    const sortedSellers = sortSellersByCustomExpression(
      unsortedSellers,
      expression
    )

    // assert
    expect(sortedSellers).toStrictEqual(expected)
  })

  it('should sort sellers correctly with expression productPrice + maxShippingPrice', () => {
    // arrange
    const expression = 'productPrice + maxShippingPrice'

    const [seller1, seller2, seller3, seller4, seller5, seller6] =
      unsortedSellersShippingMock

    const expected: SellerLogisticsInfoResult[] = [
      seller6,
      seller5,
      seller2,
      seller1,
      seller3,
      seller4,
    ]

    const unsortedSellers: SellerLogisticsInfoResult[] =
      unsortedSellersShippingMock

    // act
    const sortedSellers = sortSellersByCustomExpression(
      unsortedSellers,
      expression
    )

    // assert
    expect(sortedSellers).toStrictEqual(expected)
  })

  it('should sort sellers correctly with expression productSpotPrice + minShippingPrice', () => {
    // arrange
    const expression = 'productSpotPrice + minShippingPrice'

    const [seller1, seller2, seller3, seller4, seller5, seller6] =
      unsortedSellersShippingMock

    const expected: SellerLogisticsInfoResult[] = [
      seller5,
      seller6,
      seller2,
      seller1,
      seller3,
      seller4,
    ]

    const unsortedSellers: SellerLogisticsInfoResult[] =
      unsortedSellersShippingMock

    // act
    const sortedSellers = sortSellersByCustomExpression(
      unsortedSellers,
      expression
    )

    // assert
    expect(sortedSellers).toStrictEqual(expected)
  })

  it('should sort sellers correctly with expression productAvailableQuantity < 1000', () => {
    // arrange
    const expression = 'productAvailableQuantity < 1000'

    const [seller1, seller2, seller3, seller4, seller5, seller6] =
      unsortedSellersShippingMock

    const expected: SellerLogisticsInfoResult[] = [
      seller1,
      seller3,
      seller5,
      seller2,
      seller4,
      seller6,
    ]

    const unsortedSellers: SellerLogisticsInfoResult[] =
      unsortedSellersShippingMock

    // act
    const sortedSellers = sortSellersByCustomExpression(
      unsortedSellers,
      expression
    )

    // assert
    expect(sortedSellers).toStrictEqual(expected)
  })

  it('should sort sellers correctly with expression minShippingEstimate', () => {
    // arrange
    const expression = 'minShippingEstimate'

    const [seller1, seller2, seller3, seller4, seller5, seller6] =
      unsortedSellersShippingMock

    const expected: SellerLogisticsInfoResult[] = [
      seller6,
      seller5,
      seller2,
      seller1,
      seller3,
      seller4,
    ]

    const unsortedSellers: SellerLogisticsInfoResult[] =
      unsortedSellersShippingMock

    // act
    const sortedSellers = sortSellersByCustomExpression(
      unsortedSellers,
      expression
    )

    // assert
    expect(sortedSellers).toStrictEqual(expected)
  })

  it('should sort sellers correctly with expression maxShippingEstimate', () => {
    // arrange
    const expression = 'maxShippingEstimate'

    const [seller1, seller2, seller3, seller4, seller5, seller6] =
      unsortedSellersShippingMock

    const expected: SellerLogisticsInfoResult[] = [
      seller5,
      seller2,
      seller1,
      seller6,
      seller3,
      seller4,
    ]

    const unsortedSellers: SellerLogisticsInfoResult[] =
      unsortedSellersShippingMock

    // act
    const sortedSellers = sortSellersByCustomExpression(
      unsortedSellers,
      expression
    )

    // assert
    expect(sortedSellers).toStrictEqual(expected)
  })

  it('should mantain sellers sort', () => {
    // arrange
    const expression = 'productPrice + minShippingPrice'

    const [seller1, seller2, seller3, seller4, seller5, seller6] =
      unsortedSellersShippingMock

    const expected: SellerLogisticsInfoResult[] = [
      seller5,
      seller6,
      seller2,
      seller1,
      seller3,
      seller4,
    ]

    const sellers: SellerLogisticsInfoResult[] = [...expected]

    // act
    const sortedSellers = sortSellersByCustomExpression(sellers, expression)

    // assert
    expect(sortedSellers).toStrictEqual(expected)
  })

  it('should set seller to last position when have not SLA', () => {
    // arrange
    const expression = 'productPrice + minShippingPrice'

    const [seller1, seller2, seller3, seller4, seller5, seller6] =
      unsortedSellersShippingMock

    const hasSLA: SellerLogisticsInfoResult[] = [
      seller5,
      seller6,
      seller2,
      seller1,
    ]

    const hasNotSLA: SellerLogisticsInfoResult[] = [seller3, seller4]

    // act
    const sortedSellers = sortSellersByCustomExpression(
      unsortedSellersShippingMock,
      expression
    )

    // assert
    const SLAs = sortedSellers.filter(
      (seller) => seller.logisticsInfo?.slas.length
    )

    expect(SLAs).toStrictEqual(hasSLA)
    expect(sortedSellers.splice(SLAs.length)).toStrictEqual(hasNotSLA)
  })

  it('should return a array empty', () => {
    // arrange
    const expected: SellerLogisticsInfoResult[] = []
    const unsortedSellers: SellerLogisticsInfoResult[] = []

    // act
    const sortedSellers = sortSellersByCustomExpression(unsortedSellers)

    // assert
    expect(sortedSellers).toStrictEqual(expected)
  })

  it('should return a same array unsorted when expression is empty', () => {
    // arrange
    const expected: SellerLogisticsInfoResult[] = unsortedSellersShippingMock
    const unsortedSellers: SellerLogisticsInfoResult[] =
      unsortedSellersShippingMock

    // act
    const sortedSellers = sortSellersByCustomExpression(unsortedSellers)

    // assert
    expect(sortedSellers).toStrictEqual(expected)
  })

  it('should return a same array unsorted when expression is wrong', () => {
    // arrange
    const expression = 'wrongWord1 + wrongWord2'

    jest.spyOn(console, 'error').mockImplementation()

    const expected: SellerLogisticsInfoResult[] = unsortedSellersShippingMock
    const unsortedSellers: SellerLogisticsInfoResult[] =
      unsortedSellersShippingMock

    // act
    const sortedSellers = sortSellersByCustomExpression(
      unsortedSellers,
      expression
    )

    // assert
    expect(sortedSellers).toStrictEqual(expected)
    expect(console.error).toBeCalledTimes(1)
  })
})
