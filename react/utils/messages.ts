import type { MessageDescriptor } from 'react-intl'
import { defineMessages } from 'react-intl'

export const messages: {
  [name: string]: MessageDescriptor
} = defineMessages({
  title: {
    id: 'buybox-context.title',
  },
  sortStrategyTitle: {
    id: 'buybox-context.sortStrategy-title',
  },
  sortStrategyDescription: {
    id: 'buybox-context.sortStrategy-description',
  },
  triggerCepChangeEventTitle: {
    id: 'buybox-context.triggerCepChangeEvent-title',
  },
  triggerCepChangeEventDescription: {
    id: 'buybox-context.triggerCepChangeEvent-description',
  },
  expressionTitle: {
    id: 'buybox-context.expression-title',
  },
  expressionDescription: {
    id: 'buybox-context.expression-description',
  },
  protocolError: {
    id: 'buybox-context.protocol-error',
  },
})
