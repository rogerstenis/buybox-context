import { SellerLogisticsInfoResult } from '../../typings/types'
import { sortSellersByPrice } from '../../utils/sortSellers'
// eslint-disable-next-line jest/no-mocks-import
import { unsortedSellersMock } from '../../__mocks__/sellers'

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
