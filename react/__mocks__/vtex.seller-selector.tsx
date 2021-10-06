import type { FC, ReactNode } from 'react'
import React, { createContext } from 'react'

interface Props {
  children: ReactNode
  value: any
}

const CurrentSellerContext = createContext({})

const CurrentSellerContextProvider: FC<Props> = ({ children, value }) => {
  return (
    <CurrentSellerContext.Provider value={value}>
      {children}
    </CurrentSellerContext.Provider>
  )
}

const SellerContext = createContext({})

const SellerProvider: FC<Props> = ({ children, value }) => {
  return (
    <SellerContext.Provider value={value}>{children}</SellerContext.Provider>
  )
}

const Context = {
  SellerProvider,
  useSellerContext: jest.fn(() => {
    return {
      sellerList: null,
      shippingQuotes: null,
      setShippingQuotes: jest.fn(),
      limitShownShippingInformation: 0,
    }
  }),
}

export {
  CurrentSellerContextProvider,
  CurrentSellerContext,
  Context as SellerContext,
}
