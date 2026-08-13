export type CommerceConfig = {
  checkoutUrl: string | null
  productPrice: number | null
  productInstallments: number | null
  guaranteeDays: number | null
  benefits: readonly string[]
}

export const PRODUCT_PRICE: number | null = null
export const PRODUCT_INSTALLMENTS: number | null = null
export const CHECKOUT_URL: string | null = null
export const GUARANTEE_DAYS: number | null = null

export const commerceConfig: CommerceConfig = {
  checkoutUrl: CHECKOUT_URL,
  productPrice: PRODUCT_PRICE,
  productInstallments: PRODUCT_INSTALLMENTS,
  guaranteeDays: GUARANTEE_DAYS,
  benefits: [],
}

export const getPrimaryCtaHref = () => commerceConfig.checkoutUrl || '#oferta'
