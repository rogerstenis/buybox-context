import { renderHook } from '@vtex/test-tools/react'

import { useReduceSellerLogisticsInfo } from '../../hooks/useReduceSellerLogisticsInfo'
import type { SellerLogisticsInfoResult } from '../../typings/types'
// eslint-disable-next-line jest/no-mocks-import
import { unsortedSellersMock } from '../../__mocks__/sellers'

describe('useReduceSellerLogisticsInfo', () => {
  it('should return sellers and logistics info correctly', async () => {
    // arrange
    const sellerLogisticsInfo: SellerLogisticsInfoResult[] = unsortedSellersMock

    // act
    const {
      result: {
        current: { sellers, logisticsInfo },
      },
    } = renderHook(() =>
      useReduceSellerLogisticsInfo({
        sellerLogisticsInfo,
      })
    )

    // assert
    expect(sellerLogisticsInfo.map((s) => s.seller)).toStrictEqual(sellers)
    expect(sellerLogisticsInfo.map((s) => s.logisticsInfo)).toStrictEqual(
      logisticsInfo
    )
  })

  it('should return first seller as default', async () => {
    // arrange
    const sellerLogisticsInfo: SellerLogisticsInfoResult[] = unsortedSellersMock

    // act
    const {
      result: {
        current: { sellers },
      },
    } = renderHook(() =>
      useReduceSellerLogisticsInfo({
        sellerLogisticsInfo,
      })
    )

    // assert
    expect(sellers[0].sellerDefault).toBeTruthy()
    expect(
      sellers.slice(1, sellers.length).some((s) => s.sellerDefault)
    ).toBeFalsy()
  })
})
