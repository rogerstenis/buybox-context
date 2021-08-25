import React, { createContext, FC } from 'react'

interface Props {
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
