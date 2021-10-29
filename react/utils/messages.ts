import type { MessageDescriptor } from 'react-intl'
import { defineMessages } from 'react-intl'

export const messages: {
  [name: string]: MessageDescriptor
} = defineMessages({
  title: {
    id: 'admin/editor.buybox-context.title',
    defaultMessage: '',
  },
  sortStrategyTitle: {
    id: 'admin/editor.buybox-context.sortStrategy-title',
    defaultMessage: '',
  },
  sortStrategyDescription: {
    id: 'admin/editor.buybox-context.sortStrategy-description',
    defaultMessage: '',
  },
  triggerCepChangeEventTitle: {
    id: 'admin/editor.buybox-context.triggerCepChangeEvent-title',
    defaultMessage: '',
  },
  triggerCepChangeEventDescription: {
    id: 'admin/editor.buybox-context.triggerCepChangeEvent-description',
    defaultMessage: '',
  },
  expressionTitle: {
    id: 'admin/editor.buybox-context.expression-title',
    defaultMessage: '',
  },
  expressionDescription: {
    id: 'admin/editor.buybox-context.expression-description',
    defaultMessage: '',
  },
  protocolError: {
    id: 'admin/buybox-context.protocol-error',
    defaultMessage: '',
  },
})
