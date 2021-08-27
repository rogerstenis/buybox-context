import { useCallback } from 'react'
import {
  Item,
  ProductContextState,
} from 'vtex.product-context/react/ProductTypes'

interface ReducerInterface {
  productItemsWithoutSelected: Item[]
  productSelectedItem: Item | undefined
}

export const useReduceProduct = (
  productContext: Partial<ProductContextState>
): ReducerInterface => {
  const initialValue: ReducerInterface = {
    productItemsWithoutSelected: [],
    productSelectedItem: undefined,
  }

  const reducer = useCallback(
    (acumulator: ReducerInterface, currentValue: Item) => {
      if (currentValue.itemId === productContext.selectedItem?.itemId) {
        acumulator.productSelectedItem = { ...currentValue }
      } else {
        acumulator.productItemsWithoutSelected?.push({ ...currentValue })
      }

      return acumulator
    },
    [productContext.selectedItem?.itemId]
  )

  if (!productContext.product) {
    return { ...initialValue }
  }

  return productContext.product.items.reduce(reducer, { ...initialValue })
}
