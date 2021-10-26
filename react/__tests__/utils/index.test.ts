import { getAvailableSellers } from '../../utils'

describe('getAvailableSellers', () => {
  const sellers = [
    {
      sellerId: '1',
      sellerName: 'SELLER NAME 1',
      sellerDefault: false,
      addToCartLink: '',
      commertialOffer: {
        discountHighlights: [],
        teasers: [],
        Price: 280.5,
        ListPrice: 280.5,
        Tax: 0,
        taxPercentage: 0,
        spotPrice: 280.5,
        PriceWithoutDiscount: 280.5,
        RewardValue: 0,
        PriceValidUntil: '2022-08-25T13:35:42Z',
        AvailableQuantity: 6000,
        CacheVersionUsedToCallCheckout: 'B2D78F230C87C13044F23B4A0F4BA986_',
        Installments: [],
      },
    },
    {
      sellerId: '2',
      sellerName: 'SELLER NAME 2',
      sellerDefault: true,
      addToCartLink: '',
      commertialOffer: {
        discountHighlights: [],
        teasers: [],
        Price: 100,
        ListPrice: 100,
        Tax: 0,
        taxPercentage: 0,
        spotPrice: 100,
        PriceWithoutDiscount: 100,
        RewardValue: 0,
        PriceValidUntil: '2022-08-25T13:35:41Z',
        AvailableQuantity: 0,
        CacheVersionUsedToCallCheckout: 'B2D78F230C87C13044F23B4A0F4BA986_',
        Installments: [],
      },
    },
    {
      sellerId: '3',
      sellerName: 'SELLER NAME 3',
      sellerDefault: false,
      addToCartLink: '',
      commertialOffer: {
        discountHighlights: [],
        teasers: [],
        Price: 1,
        ListPrice: 1,
        Tax: 0,
        taxPercentage: 0,
        spotPrice: 1,
        PriceWithoutDiscount: 1,
        RewardValue: 0,
        PriceValidUntil: '2022-08-25T13:35:42Z',
        AvailableQuantity: 6000,
        CacheVersionUsedToCallCheckout: 'B2D78F230C87C13044F23B4A0F4BA986_',
        Installments: [],
      },
    },
    {
      sellerId: '4',
      sellerName: 'SELLER NAME 4',
      sellerDefault: true,
      addToCartLink: '',
      commertialOffer: {
        discountHighlights: [],
        teasers: [],
        Price: 25,
        ListPrice: 25,
        Tax: 0,
        taxPercentage: 0,
        spotPrice: 25,
        PriceWithoutDiscount: 25,
        RewardValue: 0,
        PriceValidUntil: '2022-08-25T13:35:41Z',
        AvailableQuantity: 992,
        CacheVersionUsedToCallCheckout: 'B2D78F230C87C13044F23B4A0F4BA986_',
        Installments: [],
      },
    },
    {
      sellerId: '5',
      sellerName: 'SELLER NAME 5',
      sellerDefault: false,
      addToCartLink: '',
      commertialOffer: {
        discountHighlights: [],
        teasers: [],
        Price: 15,
        ListPrice: 15,
        Tax: 0,
        taxPercentage: 0,
        spotPrice: 15,
        PriceWithoutDiscount: 15,
        RewardValue: 0,
        PriceValidUntil: '2022-08-25T13:35:42Z',
        AvailableQuantity: 0,
        CacheVersionUsedToCallCheckout: 'B2D78F230C87C13044F23B4A0F4BA986_',
        Installments: [],
      },
    },
    {
      sellerId: '6',
      sellerName: 'SELLER NAME 6',
      sellerDefault: true,
      addToCartLink: '',
      commertialOffer: {
        discountHighlights: [],
        teasers: [],
        Price: 80,
        ListPrice: 80,
        Tax: 0,
        taxPercentage: 0,
        spotPrice: 80,
        PriceWithoutDiscount: 80,
        RewardValue: 0,
        PriceValidUntil: '2022-08-25T13:35:41Z',
        AvailableQuantity: 0,
        CacheVersionUsedToCallCheckout: 'B2D78F230C87C13044F23B4A0F4BA986_',
        Installments: [],
      },
    },
  ]

  it('should return an array with available sellers', () => {
    // act
    const availableSellers = getAvailableSellers(sellers)

    // assert
    expect(
      availableSellers.map((seller) => seller.commertialOffer.AvailableQuantity)
    ).toBeTruthy()
  })

  it('should return an empty array', () => {
    // act
    const availableSellers = getAvailableSellers(undefined)

    // assert
    expect(availableSellers).toStrictEqual([])
  })

  it('should return an empty array when all sellers unavailable', () => {
    // arrange
    const unavailables = sellers.filter(
      (seller) => seller.commertialOffer.AvailableQuantity === 0
    )

    // act
    const availableSellers = getAvailableSellers(unavailables)

    // assert
    expect(availableSellers).toStrictEqual([])
  })
})
