export type CommercialPathConfig = {
  price: number | null
  checkoutUrl: string | null
}

export const CONSULTING_PRICE: number | null = 699.9
export const CONSULTING_CHECKOUT_URL: string | null = null
export const METHOD_PRICE: number | null = 299.9
export const METHOD_CHECKOUT_URL: string | null = null

export const commerceConfig: {
  consulting: CommercialPathConfig
  method: CommercialPathConfig
} = {
  consulting: {
    price: CONSULTING_PRICE,
    checkoutUrl: CONSULTING_CHECKOUT_URL,
  },
  method: {
    price: METHOD_PRICE,
    checkoutUrl: METHOD_CHECKOUT_URL,
  },
}

export const getPrimaryCtaHref = () => commerceConfig.method.checkoutUrl || '#oferta'
