import type { FC } from 'react'
import React from 'react'
import { ProductContextProvider, useProduct } from 'vtex.product-context'

import { useNewProductWithSellers } from '../hooks/useNewProductWithSellers'
import { useBuyBoxContext } from '../context/BuyboxContext'

export const ProductWithSortedSellers: FC = ({ children }) => {
  const productContext = useProduct() ?? {}
  const { sortedSellers } = useBuyBoxContext()

  const newProduct = useNewProductWithSellers({
    productContext,
    sellers: sortedSellers,
  })

  return (
    <ProductContextProvider
      query={{ skuId: productContext.selectedItem?.itemId }}
      product={newProduct}
    >
      {children}
    </ProductContextProvider>
  )
}
