import { SellerLogisticsInfoResult } from '../../typings/types'
import {
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
    const [
      seller1,
      seller2,
      seller3,
      seller4,
      seller5,
      seller6,
    ] = unsortedSellersMock

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
    const [
      seller1,
      seller2,
      seller3,
      seller4,
      seller5,
      seller6,
    ] = unsortedSellersMock

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
    const [
      seller1,
      seller2,
      seller3,
      seller4,
      seller5,
      seller6,
    ] = unsortedSellersShippingMock

    const expected: SellerLogisticsInfoResult[] = [
      seller5,
      seller6,
      seller2,
      seller1,
      seller3,
      seller4,
    ]

    const unsortedSellers: SellerLogisticsInfoResult[] = unsortedSellersShippingMock

    // act
    const sortedSellers = sortSellersByPriceShipping(unsortedSellers)

    // assert
    expect(sortedSellers).toStrictEqual(expected)
  })

  it('should mantain sellers sort', () => {
    // arrange
    const [
      seller1,
      seller2,
      seller3,
      seller4,
      seller5,
      seller6,
    ] = unsortedSellersShippingMock

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
    const [
      seller1,
      seller2,
      seller3,
      seller4,
      seller5,
      seller6,
    ] = unsortedSellersShippingMock

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
      (seller) => seller.logisticsInfo.slas.length
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
