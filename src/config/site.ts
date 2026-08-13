export const OG_IMAGE: string | null = null
export const CANONICAL_URL: string | null = null

export const siteConfig = {
  brand: 'Mr. Wick',
  product: 'Método Wick',
  title: 'Método Wick | Imagem, Presença e Posicionamento Masculino',
  description:
    'Descubra o Método Wick e aprenda a transformar imagem, postura e posicionamento em ferramentas de percepção, autoridade e relacionamento.',
  language: 'pt-BR',
  seo: {
    ogImage: OG_IMAGE,
    canonicalUrl: CANONICAL_URL,
  },
  navigation: [
    { label: 'Método', href: '#metodo' },
    { label: 'Percepção', href: '#percepcao' },
    { label: 'Sistema', href: '#pilares' },
  ],
  footer: {
    instagramUrl: null,
    privacyUrl: null,
    termsUrl: null,
    contactUrl: null,
  },
} as const
