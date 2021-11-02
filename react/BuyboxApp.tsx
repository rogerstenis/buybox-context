import React from 'react'

import { ProductWithSortedSellers } from './components/ProductWithSortedSellers'
import BuyboxProvider from './provider/BuyboxProvider'
import type { Strategies, TriggerCepChangeEventType } from './typings/types'
import { messages } from './utils/messages'

interface Props {
  conditionalStrategy?: {
    sortStrategy?: Strategies
    expression?: string
  }
  triggerCepChangeEvent?: TriggerCepChangeEventType
}

const BuyboxApp: StorefrontFunctionComponent<Props> = ({
  children,
  conditionalStrategy = { sortStrategy: 'price' },
  triggerCepChangeEvent = 'orderForm',
}) => {
  return conditionalStrategy?.sortStrategy ? (
    <BuyboxProvider
      sortStrategy={conditionalStrategy.sortStrategy}
      triggerCepChangeEvent={triggerCepChangeEvent}
      expression={conditionalStrategy.expression}
    >
      <ProductWithSortedSellers>{children}</ProductWithSortedSellers>
    </BuyboxProvider>
  ) : (
    <>{children}</>
  )
}

BuyboxApp.schema = {
  title: messages.title.id,
  type: 'object',
  properties: {
    conditionalStrategy: {
      type: 'object',
      properties: {
        sortStrategy: {
          type: 'string',
          title: messages.sortStrategyTitle.id,
          description: messages.sortStrategyDescription.id,
          enum: ['price', 'priceShipping', 'customExpression', 'protocol'],
          enumNames: [
            'buybox-context.price.label',
            'buybox-context.price-and-shipping.label',
            'buybox-context.custom-expression',
            'buybox-context.protocol',
          ],
        },
      },
      dependencies: {
        sortStrategy: {
          oneOf: [
            {
              properties: {
                sortStrategy: {
                  enum: ['customExpression'],
                },
                expression: {
                  type: 'string',
                  title: messages.expressionTitle.id,
                  description: messages.expressionDescription.id,
                },
              },
            },
          ],
        },
      },
    },
    triggerCepChangeEvent: {
      type: 'string',
      title: messages.triggerCepChangeEventTitle.id,
      description: messages.triggerCepChangeEventDescription.id,
      enum: ['orderForm', 'sellerSelector'],
      enumNames: [
        'buybox-context.order-form.label',
        'buybox-context.seller-selector.label',
      ],
      default: 'orderForm',
    },
  },
}

export default BuyboxApp
