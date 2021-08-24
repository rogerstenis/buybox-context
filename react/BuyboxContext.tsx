import React from 'react'
import { ProductContextProvider, useProduct } from 'vtex.product-context'
import { defineMessages } from 'react-intl'

const BuyboxContext: StorefrontFunctionComponent = ({ children }) => {
  const productContext = useProduct() ?? {}

  return (
    <ProductContextProvider
      query={{ skuId: productContext.selectedItem?.itemId }}
      product={productContext.product}
    >
      {children}
    </ProductContextProvider>
  )
}

const messages = defineMessages({
  title: {
    id: 'admin/editor.buybox-context.title',
  },
})

BuyboxContext.schema = {
  title: messages.title.id,
  type: 'object',
}

export default BuyboxContext
