import type { ReactNode } from 'react'
import React, { useCallback } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { CurrentSellerContext } from 'vtex.seller-selector'

import { useBuyBoxContext } from './context/BuyboxContext'
import type { LogisticsInfo, Seller } from './typings/types'

const SELLERS_CSS_HANDLES = ['sellerList']

interface Props {
  children: ReactNode
}

interface CurrentSellerContextValue {
  currentSeller: Seller | null
  shipping: LogisticsInfo | null
}

const SellerBody: StorefrontFunctionComponent<Props> = ({ children }) => {
  const handles = useCssHandles(SELLERS_CSS_HANDLES)

  const { sortedSellers, sortedLogisticsInfo } = useBuyBoxContext()

  const currentSellerCreate = useCallback(
    (current: Seller, index: number) => {
      const currentContext: CurrentSellerContextValue = {
        currentSeller: current,
        shipping: sortedLogisticsInfo ? sortedLogisticsInfo[index] : null,
      }

      return currentContext
    },
    [sortedLogisticsInfo]
  )

  return (
    <div className={`${handles.sellers} mh7 mb7`}>
      {sortedSellers
        ? sortedSellers.map((current, index: number) => (
            <CurrentSellerContext.CurrentSellerProvider
              value={currentSellerCreate(current, index)}
              key={index}
            >
              {children}
            </CurrentSellerContext.CurrentSellerProvider>
          ))
        : null}
    </div>
  )
}

export default SellerBody
