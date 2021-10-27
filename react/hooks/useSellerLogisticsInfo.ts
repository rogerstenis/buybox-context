import type { ShippingQuote } from 'vtex.seller-selector/react/SellerContext'
import { useLazyQuery } from 'react-apollo'
import { useRuntime } from 'vtex.render-runtime'
import { useEffect, useMemo } from 'react'
import { OrderForm } from 'vtex.order-manager'
import { useProduct } from 'vtex.product-context'

import SimulateShippingQuery from '../graphql/SimulateShipping.gql'
import type { SellerLogisticsInfoResult } from '../typings/types'
import { getAvailableSellers } from '../utils'

export const useSellerLogisticsInfo = (): SellerLogisticsInfoResult[] => {
  const { selectedItem, selectedQuantity } = useProduct() ?? {}
  const orderFormContext = OrderForm?.useOrderForm() ?? {}

  const [updateShippingQuotes, { data: shippingData }] = useLazyQuery<{
    shipping: ShippingQuote
  }>(SimulateShippingQuery)

  const availableSellers = useMemo(
    () => getAvailableSellers(selectedItem?.sellers),
    [selectedItem]
  )

  const shippingItems = useMemo(
    () =>
      availableSellers.map((current) => ({
        id: selectedItem?.itemId,
        quantity: selectedQuantity?.toString() ?? '1',
        seller: current.sellerId,
      })),
    [selectedItem?.itemId, availableSellers, selectedQuantity]
  )

  const runtime = useRuntime()
  const {
    culture: { country },
  } = runtime

  const variables = useMemo(() => {
    return {
      shippingItems,
      country,
      postalCode:
        orderFormContext.orderForm?.shipping?.selectedAddress?.postalCode ?? '',
    }
  }, [
    country,
    orderFormContext.orderForm?.shipping?.selectedAddress?.postalCode,
    shippingItems,
  ])

  const logisticsInfo = useMemo(
    () => shippingData?.shipping.logisticsInfo,
    [shippingData?.shipping.logisticsInfo]
  )

  useEffect(() => {
    updateShippingQuotes({ variables: { ...variables } })
  }, [updateShippingQuotes, variables])

  return availableSellers && logisticsInfo
    ? availableSellers.map((seller, index) => {
        return {
          seller,
          logisticsInfo: logisticsInfo[index],
        }
      })
    : []
}
