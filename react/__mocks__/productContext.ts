import type {
  ItemMetadata,
  ProductContextState,
} from 'vtex.product-context/react/ProductTypes'

const productContextState = {
  loadingItem: false,
  product: {
    categoriesIds: [],
    categoryTree: [],
    cacheId: 'luxury-purple-ballon',
    productId: '18',
    description:
      'Yes, that’s a cute doggo right there. But do you know what is much cuter? That purple balloon and that’s a new one from us.',
    productName: 'Luxury Purple Ballon',
    productReference: '123456789154',
    linkText: 'luxury-purple-ballon',
    brand: 'Marca 3',
    brandId: '2000002',
    link: 'https://portal.vtexcommercestable.com.br/luxury-purple-ballon/p',
    categories: [
      '/Departamento 1/Categoria 2/Sub-Categoria 7/',
      '/Departamento 1/Categoria 2/',
      '/Departamento 1/',
    ],
    categoryId: '7',
    priceRange: {
      sellingPrice: {
        highPrice: 280.5,
        lowPrice: 10,
      },
      listPrice: {
        highPrice: 280.5,
        lowPrice: 10,
      },
    },
    specificationGroups: [],
    skuSpecifications: [],
    productClusters: [
      {
        id: '137',
        name: 'Destaques',
      },
      {
        id: '141',
        name: 'Spotlight',
      },
    ],
    clusterHighlights: [
      {
        id: '137',
        name: 'Destaques',
      },
      {
        id: '141',
        name: 'Spotlight',
      },
    ],
    properties: [],
    titleTag: 'Luxury-Purple-Ballon',
    metaTagDescription:
      'Yes, that’s a cute doggo right there. But do you know what is much cuter? That purple balloon and that’s a new one from us.',
    items: [
      {
        itemId: '33',
        name: 'Luxury Purple Client Ballon',
        nameComplete: 'Luxury Purple Ballon Luxury Purple Client Ballon',
        complementName: '',
        ean: '123456789154',
        variations: [],
        referenceId: [],
        measurementUnit: 'un',
        unitMultiplier: 1,
        images: [
          {
            imageId: '155457',
            imageLabel: 'dog',
            imageTag:
              '<img src="~/arquivos/ids/155457-#width#-#height#/dog.jpg?v=637483293155100000" width="#width#" height="#height#" alt="dog" id="" />',
            imageUrl: '',
            imageText: 'dog',
          },
        ],
        videos: [],
        sellers: [
          {
            sellerId: '2',
            sellerName: 'COMPANHIA BRASILEIRA DE TECNOLOGIA PARA E-COMMERCE 3',
            sellerDefault: false,
            addToCartLink:
              'https://portal.vtexcommercestable.com.br/checkout/cart/add?sku=33&qty=1&seller=carlafrimer&sc=1&price=28050&cv=2407B887DAC77B021FBCA4F0E149E117_&sc=1',
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
              PriceValidUntil: '2022-08-25T17:40:43Z',
              AvailableQuantity: 6000,
              CacheVersionUsedToCallCheckout:
                '2407B887DAC77B021FBCA4F0E149E117_',
              Installments: [],
            },
          },
          {
            sellerId: '1',
            sellerName: 'COMPANHIA BRASILEIRA DE TECNOLOGIA PARA E-COMMERCE 1',
            sellerDefault: true,
            addToCartLink:
              'https://portal.vtexcommercestable.com.br/checkout/cart/add?sku=33&qty=1&seller=1&sc=1&price=1000&cv=2407B887DAC77B021FBCA4F0E149E117_&sc=1',
            commertialOffer: {
              discountHighlights: [],
              teasers: [],
              Price: 10,
              ListPrice: 10,
              Tax: 0,
              taxPercentage: 0,
              spotPrice: 10,
              PriceWithoutDiscount: 10,
              RewardValue: 0,
              PriceValidUntil: '2022-08-25T17:40:42Z',
              AvailableQuantity: 994,
              CacheVersionUsedToCallCheckout:
                '2407B887DAC77B021FBCA4F0E149E117_',
              Installments: [],
            },
          },
        ],
      },
    ],
    itemMetadata: {} as ItemMetadata,
  },
  selectedItem: {
    itemId: '33',
    name: 'Luxury Purple Client Ballon',
    nameComplete: 'Luxury Purple Ballon Luxury Purple Client Ballon',
    complementName: '',
    ean: '123456789154',
    variations: [],
    referenceId: [],
    measurementUnit: 'un',
    unitMultiplier: 1,
    images: [
      {
        imageId: '155457',
        imageLabel: 'dog',
        imageTag:
          '<img src="~/arquivos/ids/155457-#width#-#height#/dog.jpg?v=637483293155100000" width="#width#" height="#height#" alt="dog" id="" />',
        imageUrl: '',
        imageText: 'dog',
      },
    ],
    videos: [],
    sellers: [
      {
        sellerId: '2',
        sellerName: 'COMPANHIA BRASILEIRA DE TECNOLOGIA PARA E-COMMERCE 3',
        sellerDefault: false,
        addToCartLink:
          'https://portal.vtexcommercestable.com.br/checkout/cart/add?sku=33&qty=1&seller=carlafrimer&sc=1&price=28050&cv=2407B887DAC77B021FBCA4F0E149E117_&sc=1',
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
          PriceValidUntil: '2022-08-25T17:40:43Z',
          AvailableQuantity: 6000,
          CacheVersionUsedToCallCheckout: '2407B887DAC77B021FBCA4F0E149E117_',
          Installments: [],
        },
      },
      {
        sellerId: '1',
        sellerName: 'COMPANHIA BRASILEIRA DE TECNOLOGIA PARA E-COMMERCE 1',
        sellerDefault: true,
        addToCartLink:
          'https://portal.vtexcommercestable.com.br/checkout/cart/add?sku=33&qty=1&seller=1&sc=1&price=1000&cv=2407B887DAC77B021FBCA4F0E149E117_&sc=1',
        commertialOffer: {
          discountHighlights: [],
          teasers: [],
          Price: 10,
          ListPrice: 10,
          Tax: 0,
          taxPercentage: 0,
          spotPrice: 10,
          PriceWithoutDiscount: 10,
          RewardValue: 0,
          PriceValidUntil: '2022-08-25T17:40:42Z',
          AvailableQuantity: 994,
          CacheVersionUsedToCallCheckout: '2407B887DAC77B021FBCA4F0E149E117_',
          Installments: [],
        },
      },
    ],
    kitItems: [],
    attachments: [],
    estimatedDateArrival: null,
  },
  selectedQuantity: 1,
  skuSelector: {
    selectedImageVariationSKU: null,
    isVisible: false,
    areAllVariationsSelected: true,
  },
  buyButton: {
    clicked: false,
  },
  assemblyOptions: {
    items: {},
    inputValues: {},
    areGroupsValid: {},
  },
} as Partial<ProductContextState>

export { productContextState }
