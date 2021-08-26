import React, { useMemo } from 'react'
import { ProductContextProvider, useProduct } from 'vtex.product-context'
import { defineMessages } from 'react-intl'
import type {
  MaybeProduct,
  Seller,
} from 'vtex.product-context/react/ProductTypes'

import { sortSellersByPrice } from './utils'
import { useReduceProduct } from './hooks/useReduceProduct'

type Strategies = 'price' | 'priceShipping'

interface Props {
  sortStrategy: Strategies
}

const BuyboxContext: StorefrontFunctionComponent<Props> = ({ children }) => {
  const productContext = useProduct() ?? {}

  const { productSelectedItem, productItemsWithoutSelected } = useReduceProduct(
    productContext
  )

  const sellers = useMemo(() => productContext?.selectedItem?.sellers, [
    productContext?.selectedItem?.sellers,
  ])

  const sortedSellers = useMemo<Seller[]>(() => sortSellersByPrice(sellers), [
    sellers,
  ])

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
          { ...productSelectedItem, sellers: [...sortedSellers] },
        ],
      }
    }

    return undefined
  }, [
    productContext.product,
    productSelectedItem,
    productItemsWithoutSelected,
    sortedSellers,
  ])

  const newProduct = useMemo(() => {
    return productWithSortedSellers ?? productContext.product
  }, [productContext.product, productWithSortedSellers])

  return (
    <ProductContextProvider
      query={{ skuId: productContext.selectedItem?.itemId }}
      product={newProduct}
    >
      {children}
    </ProductContextProvider>
  )
}

const messages = defineMessages({
  title: {
    id: 'admin/editor.buybox-context.title',
  },
  sortStrategyTitle: {
    id: 'admin/editor.buybox-context.sortStrategy-title',
  },
  sortStrategyDescription: {
    id: 'admin/editor.buybox-context.sortStrategy-description',
  },
})

BuyboxContext.schema = {
  title: messages.title.id,
  type: 'object',
  properties: {
    sortStrategy: {
      type: 'string',
      title: messages.sortStrategyTitle.id,
      description: messages.sortStrategyDescription.id,
      enum: ['price', 'priceShipping'],
      enumNames: [
        'admin/editor.buybox-context.price.label',
        'admin/editor.buybox-context.price-and-shipping.label',
      ],
    },
  },
}

export default BuyboxContext
