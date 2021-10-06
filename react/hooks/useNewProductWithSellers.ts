import { useMemo } from 'react'
import type {
  MaybeProduct,
  ProductContextState,
} from 'vtex.product-context/react/ProductTypes'

import type { Seller } from '../typings/types'
import { useReduceProduct } from './useReduceProduct'

interface Props {
  productContext: Partial<ProductContextState>
  sellers: Seller[]
}

export const useNewProductWithSellers = ({
  productContext,
  sellers,
}: Props): MaybeProduct => {
  const { productSelectedItem, productItemsWithoutSelected } =
    useReduceProduct(productContext)

  const productWithSortedSellers = useMemo<MaybeProduct>(() => {
    if (
      productContext.product &&
      productSelectedItem &&
      productItemsWithoutSelected
    ) {
      return {
        ...productContext.product,
        items: [
          ...productItemsWithoutSelected,
          { ...productSelectedItem, sellers: [...sellers] },
        ],
      }
    }

    return undefined
  }, [
    productContext.product,
    productSelectedItem,
    productItemsWithoutSelected,
    sellers,
  ])

  const newProduct = useMemo(() => {
    return productWithSortedSellers ?? productContext.product
  }, [productContext.product, productWithSortedSellers])

  return newProduct
}
