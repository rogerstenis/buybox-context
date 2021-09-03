import React from 'react'
import { defineMessages } from 'react-intl'

import { SortSellerByStrategy } from './components/SortSellerByStrategy'
import { Strategies } from './typings/types'

interface Props {
  sortStrategy?: Strategies
}

const BuyboxContext: StorefrontFunctionComponent<Props> = ({
  children,
  sortStrategy,
}) => {
  return sortStrategy ? (
    <SortSellerByStrategy sortStrategy={sortStrategy}>
      {children}
    </SortSellerByStrategy>
  ) : (
    <>{children}</>
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
