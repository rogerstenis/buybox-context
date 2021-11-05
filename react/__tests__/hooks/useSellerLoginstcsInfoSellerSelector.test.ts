import { renderHook } from '@vtex/test-tools/react'
import * as productContext from 'vtex.product-context'
import { SellerContext } from 'vtex.seller-selector'

import { useSellerLoginstcsInfoSellerSelector } from '../../hooks/useSellerLoginstcsInfoSellerSelector'
import type { LogisticsInfo } from '../../typings/types'
// eslint-disable-next-line jest/no-mocks-import
import { productContextState } from '../../__mocks__/productContext'

describe('useSellerLoginstcsInfoSellerSelector', () => {
  it('should return sellers and logistics info correctly', async () => {
    // arrange
    const shippingQuotes = {
      sellerList: null,
      shippingQuotes: {
        logisticsInfo: [
          { itemIndex: 0, slas: [] },
          {
            itemIndex: 1,
            slas: [
              {
                id: '1',
                name: 'logistic name 1',
                price: 4000,
                shippingEstimate: '3d',
                shippingEstimateDate: '',
              },
              {
                id: '2',
                name: 'logistic name 2',
                price: 9000,
                shippingEstimate: '1h',
                shippingEstimateDate: '',
              },
            ],
          },
        ] as LogisticsInfo[],
      },
      setShippingQuotes: jest.fn(),
      limitShownShippingInformation: 0,
    }

    jest
      .spyOn(productContext, 'useProduct')
      .mockImplementation(() => productContextState)

    jest
      .spyOn(SellerContext, 'useSellerContext')
      .mockImplementation(() => shippingQuotes)

    // act
    const {
      result: { current: sellersInfoResult },
    } = renderHook(() => useSellerLoginstcsInfoSellerSelector())

    // assert
    expect(sellersInfoResult[0].seller).toStrictEqual(
      productContextState.selectedItem?.sellers[0]
    )
    expect(sellersInfoResult[0].logisticsInfo).toStrictEqual(
      shippingQuotes.shippingQuotes.logisticsInfo[0]
    )
    expect(sellersInfoResult[1].seller).toStrictEqual(
      productContextState.selectedItem?.sellers[1]
    )
    expect(sellersInfoResult[1].logisticsInfo).toStrictEqual(
      shippingQuotes.shippingQuotes.logisticsInfo[1]
    )
  })
})
