import type { FC, ReactNode } from 'react'
import React, { createContext } from 'react'

interface Props {
  children: ReactNode
  value: any
}

const useOrderForm = jest.fn()

const OrderFormContext = createContext({})

const OrderFormProvider: FC<Props> = ({ children, value }) => {
  return (
    <OrderFormContext.Provider value={value}>
      {children}
    </OrderFormContext.Provider>
  )
}

const OrderForm = {
  OrderFormProvider,
  useOrderForm,
}

export { OrderForm }
