import { renderHook } from '@vtex/test-tools/react'
import * as reactapollo from 'react-apollo'

import { useSellersByProtocol } from '../../hooks/useSellersByProtocol'
import type { SellerLogisticsInfoResult } from '../../typings/types'
// eslint-disable-next-line jest/no-mocks-import
import { unsortedSellersMock } from '../../__mocks__/sellers'

describe('useSellersByProtocol', () => {
  it('should return an array with ordered sellers by protocol', async () => {
    // arrange
    jest
      .spyOn(reactapollo, 'useQuery')
      .mockImplementation()
      .mockReturnValue({
        data: {
          sortSellers: {
            sellers: ['3', '1', '4', '2', '5'],
          },
        },
      } as any)

    const sellerLogisticsInfo: SellerLogisticsInfoResult[] = unsortedSellersMock

    const [seller1, seller2, seller3, seller4, seller5] = unsortedSellersMock

    // act
    const {
      result: { current: sellersInfoResult },
    } = renderHook(() => useSellersByProtocol(sellerLogisticsInfo))

    // assert
    expect(sellersInfoResult).toStrictEqual([
      seller3,
      seller1,
      seller4,
      seller2,
      seller5,
    ])
  })

  it('should return an empty array when loading is true', async () => {
    // arrange
    jest
      .spyOn(reactapollo, 'useQuery')
      .mockImplementation()
      .mockReturnValue({
        data: {
          sortSellers: {
            sellers: ['3', '1', '4', '2', '5'],
          },
        },
        loading: true,
      } as any)

    const sellerLogisticsInfo: SellerLogisticsInfoResult[] = unsortedSellersMock

    // act
    const {
      result: { current: sellersInfoResult },
    } = renderHook(() => useSellersByProtocol(sellerLogisticsInfo))

    // assert
    expect(sellersInfoResult).toStrictEqual([])
  })

  it('should return an empty array when data is empty', async () => {
    // arrange
    jest
      .spyOn(reactapollo, 'useQuery')
      .mockImplementation()
      .mockReturnValue({
        data: {},
      } as any)

    const sellerLogisticsInfo: SellerLogisticsInfoResult[] = unsortedSellersMock

    // act
    const {
      result: { current: sellersInfoResult },
    } = renderHook(() => useSellersByProtocol(sellerLogisticsInfo))

    // assert
    expect(sellersInfoResult).toStrictEqual([])
  })

  it('should return an empty array when sellersInfo parameter is empty', async () => {
    // arrange
    jest
      .spyOn(reactapollo, 'useQuery')
      .mockImplementation()
      .mockReturnValue({
        data: {
          sortSellers: {
            sellers: ['3', '1', '4', '2', '5'],
          },
        },
        loading: true,
      } as any)

    // act
    const {
      result: { current: sellersInfoResult },
    } = renderHook(() => useSellersByProtocol([]))

    // assert
    expect(sellersInfoResult).toStrictEqual([])
  })

  it('should return an array without sellers that do not exists on sellerLogisticsInfo', async () => {
    // arrange
    jest
      .spyOn(reactapollo, 'useQuery')
      .mockImplementation()
      .mockReturnValue({
        data: {
          sortSellers: {
            sellers: ['10', '20', '3', '1', '4', '2', '5'],
          },
        },
      } as any)

    const sellerLogisticsInfo: SellerLogisticsInfoResult[] = unsortedSellersMock

    const [seller1, seller2, seller3, seller4, seller5] = unsortedSellersMock

    // act
    const {
      result: { current: sellersInfoResult },
    } = renderHook(() => useSellersByProtocol(sellerLogisticsInfo))

    // assert
    expect(sellersInfoResult).toStrictEqual([
      seller3,
      seller1,
      seller4,
      seller2,
      seller5,
    ])
  })
})
