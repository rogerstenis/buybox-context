import { useQuery } from 'react-apollo'
import { useProduct } from 'vtex.product-context'
import { OrderForm } from 'vtex.order-manager'
import { useRuntime } from 'vtex.render-runtime'

import SortSellersProtocol from '../graphql/SortSellersProtocol.gql'
import type { SellerLogisticsInfoResult } from '../typings/types'

interface SortedSellersProtocol {
  sortSellers: {
    sellers: string[]
  }
}

interface SortedSellersProtocolVariables {
  skuId: string
  postalCode?: string
  country?: string
  salesChannel?: number
}

export const useSellersByProtocol = (
  sellersInfo: SellerLogisticsInfoResult[]
) => {
  const { selectedItem } = useProduct() ?? {}
  const orderFormContext = OrderForm?.useOrderForm() ?? {}

  const runtime = useRuntime()
  const {
    culture: { country },
  } = runtime

  const { data, loading, error } = useQuery<
    SortedSellersProtocol,
    SortedSellersProtocolVariables
  >(SortSellersProtocol, {
    variables: {
      skuId: selectedItem?.itemId ?? '',
      country,
      postalCode:
        orderFormContext.orderForm?.shipping?.selectedAddress?.postalCode ?? '',
    },
    ssr: false,
  })

  if (error) throw error

  if (!sellersInfo.length || !data?.sortSellers?.sellers || loading) {
    return []
  }

  const sellersInfoIndex = sellersInfo.reduce(
    (acummulator, currentValue) => {
      acummulator[currentValue.seller.sellerId] = currentValue

      return acummulator
    },
    {} as {
      [key in string]: SellerLogisticsInfoResult
    }
  )

  return data.sortSellers.sellers.map((sellerId) => sellersInfoIndex[sellerId])
}
