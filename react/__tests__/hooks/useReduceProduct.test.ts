import { renderHook, waitFor, cleanup } from '@vtex/test-tools/react'

import { useReduceProduct } from '../../hooks/useReduceProduct'
// eslint-disable-next-line jest/no-mocks-import
import { productContextState } from '../../__mocks__/productContext'

describe('sortSellersByPrice', () => {
  beforeEach(() => {
    cleanup()
  })

  it('should return items without selectedItem', async () => {
    // arrange
    const { selectedItem } = { ...productContextState }

    // act
    const {
      result: {
        current: { productItemsWithoutSelected },
      },
    } = renderHook(() => useReduceProduct({ ...productContextState }))

    // assert

    await waitFor(() =>
      expect(
        productItemsWithoutSelected.find(
          (item) => item.itemId === selectedItem?.itemId
        )
      ).toBeFalsy()
    )
  })

  it('should return selectedItem correctly', async () => {
    // arrange
    const { selectedItem } = { ...productContextState }

    // act
    const {
      result: {
        current: { productSelectedItem },
      },
    } = renderHook(() => useReduceProduct({ ...productContextState }))

    // assert

    await waitFor(() =>
      expect(productSelectedItem?.itemId).toBe(selectedItem?.itemId)
    )
  })

  it('should return selectedItem empty', async () => {
    // arrange
    const state = { ...productContextState, selectedItem: undefined }

    // act
    const {
      result: {
        current: { productSelectedItem },
      },
    } = renderHook(() => useReduceProduct(state))

    // assert
    await waitFor(() => expect(productSelectedItem).toBeFalsy())
  })

  it('should return productItemsWithoutSelected with all items', async () => {
    // arrange
    const state = { ...productContextState, selectedItem: undefined }

    // act
    const {
      result: {
        current: { productItemsWithoutSelected },
      },
    } = renderHook(() => useReduceProduct(state))

    // assert
    await waitFor(() =>
      expect(productItemsWithoutSelected).toStrictEqual(
        productContextState.product?.items
      )
    )
  })

  it('should return initial values', async () => {
    // arrange
    const initialValue = {
      productItemsWithoutSelected: [],
      productSelectedItem: undefined,
    }

    // act
    const {
      result: { current },
    } = renderHook(() =>
      useReduceProduct({ ...productContextState, product: undefined })
    )

    // assert
    await waitFor(() => expect(current).toStrictEqual(initialValue))
  })
})
