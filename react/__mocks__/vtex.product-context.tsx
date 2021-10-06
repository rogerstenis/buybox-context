import type { FC, ReactNode } from 'react'
import React, { createContext } from 'react'

interface Props {
  children: ReactNode
  value: any
}

const useProduct = jest.fn()

const ProductContext = createContext({})

const ProductContextProvider: FC<Props> = ({ children, value }) => {
  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  )
}

export { useProduct, ProductContextProvider, ProductContext }
