import React, { useMemo, useCallback, ReactNode } from 'react'
import { ProductContextProvider, useProduct } from 'vtex.product-context'
import { CurrentSellerContext } from 'vtex.seller-selector'
import { LogisticsInfo } from 'vtex.seller-selector/react/SellerContext'
import { OrderForm } from 'vtex.order-manager'
import { defineMessages } from 'react-intl'
import type {
  MaybeProduct,
  Seller,
} from 'vtex.product-context/react/ProductTypes'
import { useCssHandles } from 'vtex.css-handles'

import { sortSellersByPrice } from './utils'
import { useReduceProduct } from './hooks/useReduceProduct'

type Strategies = 'price' | 'priceShipping'

interface LogisticInfo {
  id: string
  name: string
  price: number
  shippingEstimate: string
  shippingEstimateDate: string
}

const SELLERS_CSS_HANDLES = ['sellerList']

interface SellerBodyProps {
  sellers: Seller[] | undefined
  slas: LogisticInfo[]
  children: ReactNode
}

interface CurrentSellerContextValue {
  currentSeller: Seller | null
  shipping: LogisticsInfo | null
}

const SellerBody: StorefrontFunctionComponent<SellerBodyProps> = ({
  sellers,
  slas,
  children,
}) => {
  const handles = useCssHandles(SELLERS_CSS_HANDLES)

  const currentSellerCreate = useCallback(
    (current: Seller, index: number) => {
      const currentContext: CurrentSellerContextValue = {
        currentSeller: current,
        shipping: { itemIndex: index, slas },
      }

      return currentContext
    },
    [slas]
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

interface Props {
  sortStrategy?: Strategies
}

const BuyboxContext: StorefrontFunctionComponent<Props> = ({
  children,
  sortStrategy,
}) => {
  const productContext = useProduct() ?? {}
  const { selectedItem, selectedQuantity } = useProduct() ?? {}
  const orderFormContext = OrderForm?.useOrderForm() ?? {}

  const shippingItems = useMemo(
    () =>
      selectedItem?.sellers.map((current) => ({
        id: selectedItem?.itemId,
        quantity: selectedQuantity?.toString() ?? '1',
        seller: current.sellerId,
      })),
    [selectedItem?.itemId, selectedItem?.sellers, selectedQuantity]
  )

  const variables = useMemo(() => {
    return {
      shippingItems,
      country: 'BR',
      postalCode:
        orderFormContext.orderForm?.shipping?.selectedAddress?.postalCode ?? '',
    }
  }, [
    orderFormContext.orderForm?.shipping?.selectedAddress?.postalCode,
    shippingItems,
  ])

  const slas = useMemo(() => {
    // eslint-disable-next-line no-console
    console.log(variables)

    const mock = {
      shipping: {
        logisticsInfo: [
          {
            itemIndex: '0',
            slas: [
              {
                id: 'ME Transportadora Genérica',
                friendlyName: 'ME Transportadora Genérica',
                price: 4674,
                shippingEstimate: '8bd',
                shippingEstimateDate: null,
              },
            ],
          },
        ],
      },
    }

    return mock.shipping.logisticsInfo.reduce(
      (acumulator: LogisticInfo[], currentValue) =>
        [...acumulator, ...currentValue.slas] as LogisticInfo[],
      [] as LogisticInfo[]
    )
  }, [variables])

  const { productSelectedItem, productItemsWithoutSelected } = useReduceProduct(
    productContext
  )

  const sellers = useMemo(() => productContext?.selectedItem?.sellers, [
    productContext?.selectedItem?.sellers,
  ])

  const sortedSellers = useMemo<Seller[]>(() => sortSellersByPrice(sellers), [
    sellers,
  ])

  const productWithSortedSellers = useMemo<MaybeProduct>(() => {
    if (
      productContext.product &&
      productSelectedItem &&
      productItemsWithoutSelected
    ) {
      return {
        ...productContext.product,
        items: [
          ...productItemsWithoutSelected,
          { ...productSelectedItem, sellers: [...sortedSellers] },
        ],
      }
    }

    return undefined
  }, [
    productContext.product,
    productSelectedItem,
    productItemsWithoutSelected,
    sortedSellers,
  ])

  const newProduct = useMemo(() => {
    return productWithSortedSellers ?? productContext.product
  }, [productContext.product, productWithSortedSellers])

  return sortStrategy ? (
    <ProductContextProvider
      query={{ skuId: productContext.selectedItem?.itemId }}
      product={newProduct}
    >
      <SellerBody slas={slas} sellers={selectedItem?.sellers}>
        {children}
      </SellerBody>
    </ProductContextProvider>
  ) : (
    <>{children}</>
  )
}

const messages = defineMessages({
  title: {
    id: 'admin/editor.buybox-context.title',
  },
  sortStrategyTitle: {
    id: 'admin/editor.buybox-context.sortStrategy-title',
  },
  sortStrategyDescription: {
    id: 'admin/editor.buybox-context.sortStrategy-description',
  },
})

BuyboxContext.schema = {
  title: messages.title.id,
  type: 'object',
  properties: {
    sortStrategy: {
      type: 'string',
      title: messages.sortStrategyTitle.id,
      description: messages.sortStrategyDescription.id,
      enum: ['price', 'priceShipping'],
      enumNames: [
        'admin/editor.buybox-context.price.label',
        'admin/editor.buybox-context.price-and-shipping.label',
      ],
    },
  },
}

export default BuyboxContext
