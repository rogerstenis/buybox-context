import React, { ReactNode, useCallback } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { CurrentSellerContext } from 'vtex.seller-selector'

import { LogisticsInfo, Seller } from '../typings/types'

const SELLERS_CSS_HANDLES = ['sellerList']

interface Props {
  sellers?: Seller[]
  logisticsInfo?: LogisticsInfo[]
  children: ReactNode
}

interface CurrentSellerContextValue {
  currentSeller: Seller | null
  shipping: LogisticsInfo | null
}

const SellerBody: StorefrontFunctionComponent<Props> = ({
  sellers,
  logisticsInfo,
  children,
}) => {
  const handles = useCssHandles(SELLERS_CSS_HANDLES)

  const currentSellerCreate = useCallback(
    (current: Seller, index: number) => {
      const currentContext: CurrentSellerContextValue = {
        currentSeller: current,
        shipping: logisticsInfo ? logisticsInfo[index] : null,
      }

      return currentContext
    },
    [logisticsInfo]
  )

  return (
    <div className={`${handles.sellers} mh7 mb7`}>
      {sellers
        ? sellers.map((current, index: number) => (
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
