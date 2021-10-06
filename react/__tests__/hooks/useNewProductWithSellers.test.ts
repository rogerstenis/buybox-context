import { renderHook } from '@vtex/test-tools/react'
import type { ProductContextState } from 'vtex.product-context/react/ProductContextProvider'

import { useNewProductWithSellers } from '../../hooks/useNewProductWithSellers'
import type { Seller } from '../../typings/types'
// eslint-disable-next-line jest/no-mocks-import
import { productContextState } from '../../__mocks__/productContext'
// eslint-disable-next-line jest/no-mocks-import
import { unsortedSellersMock } from '../../__mocks__/sellers'

describe('useNewProductWithSellers', () => {
  it('should return new product with sellers ordered', async () => {
    // arrange
    const productContext: Partial<ProductContextState> = productContextState
    const sellers: Seller[] = [unsortedSellersMock[0].seller]

    // act
    const {
      result: { current: newProduct },
    } = renderHook(() =>
      useNewProductWithSellers({
        productContext,
        sellers,
      })
    )

    // assert
    expect(productContext.selectedItem?.sellers).not.toStrictEqual(sellers)
    expect(newProduct?.items[0].sellers).toStrictEqual(sellers)
  })
})
