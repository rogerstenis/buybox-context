import { ShippingQuote } from 'vtex.seller-selector/react/SellerContext'
import { useLazyQuery } from 'react-apollo'
import { useRuntime } from 'vtex.render-runtime'
import { useEffect, useMemo } from 'react'
import { OrderForm } from 'vtex.order-manager'
import { useProduct } from 'vtex.product-context'

import SimulateShippingQuery from '../graphql/SimulateShipping.gql'
import { SellerLogisticsInfoResult } from '../typings/types'

export const useSellerLogisticsInfo = (): SellerLogisticsInfoResult[] => {
  const { selectedItem, selectedQuantity } = useProduct() ?? {}
  const orderFormContext = OrderForm?.useOrderForm() ?? {}

  const [updateShippingQuotes, { data: shippingData }] = useLazyQuery<{
    shipping: ShippingQuote
  }>(SimulateShippingQuery)

  const shippingItems = useMemo(
    () =>
      selectedItem?.sellers.map((current) => ({
        id: selectedItem?.itemId,
        quantity: selectedQuantity?.toString() ?? '1',
        seller: current.sellerId,
      })),
    [selectedItem?.itemId, selectedItem?.sellers, selectedQuantity]
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

  useEffect(() => {
    updateShippingQuotes({ variables: { ...variables } })
  }, [updateShippingQuotes, variables])

  return selectedItem && shippingData
    ? selectedItem.sellers.map((seller, index) => {
        return {
          seller,
          logisticsInfo: shippingData.shipping.logisticsInfo[index],
        }
      })
    : []
}
