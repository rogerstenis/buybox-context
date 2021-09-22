import React from 'react'
import { defineMessages } from 'react-intl'

import { ProductWithSortedSellers } from './components/ProductWithSortedSellers'
import BuyboxProvider from './provider/BuyboxProvider'
import type { Strategies, TriggerCepChangeEventType } from './typings/types'

interface Props {
  sortStrategy?: Strategies
  triggerCepChangeEvent?: TriggerCepChangeEventType
}

const BuyboxApp: StorefrontFunctionComponent<Props> = ({
  children,
  sortStrategy,
  triggerCepChangeEvent = 'orderForm',
}) => {
  return sortStrategy ? (
    <BuyboxProvider
      sortStrategy={sortStrategy}
      triggerCepChangeEvent={triggerCepChangeEvent}
    >
      <ProductWithSortedSellers>{children}</ProductWithSortedSellers>
    </BuyboxProvider>
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
  triggerCepChangeEventTitle: {
    id: 'admin/editor.buybox-context.triggerCepChangeEvent-title',
  },
  triggerCepChangeEventDescription: {
    id: 'admin/editor.buybox-context.triggerCepChangeEvent-description',
  },
})

BuyboxApp.schema = {
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
    triggerCepChangeEvent: {
      type: 'string',
      title: messages.triggerCepChangeEventTitle.id,
      description: messages.triggerCepChangeEventDescription.id,
      enum: ['orderForm', 'sellerSelector'],
      enumNames: [
        'admin/editor.buybox-context.order-form.label',
        'admin/editor.buybox-context.seller-selector.label',
      ],
      default: 'orderForm',
    },
  },
}

export default BuyboxApp
