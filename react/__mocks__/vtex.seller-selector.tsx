import React, { createContext, FC } from 'react'

interface Props {
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

export { CurrentSellerContextProvider, CurrentSellerContext }
