export type MediaAsset = {
  src: string
  mobileSrc?: string
  poster?: string
  mobilePoster?: string
  width: number
  height: number
  alt?: string
  objectPosition?: string
}

const MEDIA_ROOT = '/media/method-wick'

export const mediaConfig = {
  hero: {
    src: `${MEDIA_ROOT}/hero-final.mp4`,
    mobileSrc: `${MEDIA_ROOT}/hero-final-mobile.mp4`,
    poster: `${MEDIA_ROOT}/hero-final-poster.webp`,
    mobilePoster: `${MEDIA_ROOT}/hero-final-mobile-poster.webp`,
    width: 1276,
    height: 720,
    alt: '',
    objectPosition: '58% 42%',
  },
  consulting: {
    primary: {
      src: `${MEDIA_ROOT}/consulting-01.mp4`,
      poster: `${MEDIA_ROOT}/consulting-01-poster.png`,
      width: 1276,
      height: 720,
      alt: '',
      objectPosition: 'center center',
    },
  },
  stage: {
    primary: {
      src: `${MEDIA_ROOT}/stage-01.mp4`,
      poster: `${MEDIA_ROOT}/stage-01-poster.png`,
      width: 720,
      height: 1280,
      alt: '',
      objectPosition: 'center center',
    },
  },
  beyondClothing: {
    primary: {
      src: `${MEDIA_ROOT}/consulting-01.mp4`,
      poster: `${MEDIA_ROOT}/consulting-01-poster.png`,
      width: 1276,
      height: 720,
      alt: '',
      objectPosition: 'center center',
    },
    detail: null,
    result: null,
  },
  methodIntroduction: {
    card: {
      src: `${MEDIA_ROOT}/method-consultation-portrait.jpg`,
      width: 640,
      height: 1136,
      alt: 'Consultoria de imagem durante o ajuste de um terno masculino.',
      objectPosition: 'center center',
    },
  },
  authority: {
    documentary: {
      src: `${MEDIA_ROOT}/authority-studio-01.webp`,
      width: 1200,
      height: 1600,
      alt: 'Homem de terno azul-claro em ensaio fotográfico, entre softboxes e fundo de estúdio.',
      objectPosition: 'center center',
    },
    navyPortrait: {
      src: `${MEDIA_ROOT}/tailoring-navy-portrait.webp`,
      width: 720,
      height: 960,
      alt: 'Retrato editorial de homem vestindo terno azul-marinho e gravata.',
      objectPosition: 'center top',
    },
    bluePortrait: {
      src: `${MEDIA_ROOT}/tailoring-blue-portrait.webp`,
      width: 720,
      height: 960,
      alt: 'Retrato editorial de homem vestindo terno azul-claro, gravata salmão e lenço.',
      objectPosition: 'center top',
    },
    navyDetail: {
      src: `${MEDIA_ROOT}/tailoring-navy-detail.webp`,
      width: 720,
      height: 900,
      alt: 'Detalhe de lapela, gravata e caimento de terno azul xadrez.',
      objectPosition: 'center center',
    },
    brownDetail: {
      src: `${MEDIA_ROOT}/tailoring-brown-detail.webp`,
      width: 720,
      height: 960,
      alt: 'Detalhe de lapela, gravata e lenço em composição de alfaiataria escura.',
      objectPosition: 'center center',
    },
    clients: null,
    tailoring: null,
    backstage: null,
    store: null,
    result: null,
  },
  images: {
    clientPrimary: null,
    tailoringDetail: null,
    storeInterior: null,
  },
} satisfies Record<string, unknown>
