# Método Wick Landing Page

Landing page editorial do Método Wick, construída para comunicar imagem, presença e posicionamento masculino sem padrões genéricos de infoproduto.

## Stack

- Vite 7
- React 19
- TypeScript
- CSS Modules e CSS nativo
- GSAP + ScrollTrigger apenas para motion narrativo
- Cormorant Garamond e Manrope via Google Fonts

Requer Node.js 20.19+ e pnpm 11.

## Instalação e desenvolvimento

```bash
pnpm install
pnpm dev
```

## Build e preview

```bash
pnpm lint
pnpm build
pnpm preview
```

O build executa `tsc -b` antes do Vite e gera `dist/`. Não existem rotas de SPA além das âncoras da landing; em uma hospedagem SPA genérica, configure fallback para `index.html`.

## Estrutura

- `src/sections/`: cenas narrativas isoladas.
- `src/components/`: layout, mídia e UI reutilizável.
- `src/content/`: copy e listas editáveis.
- `src/config/`: mídia, comércio, métricas e site/SEO.
- `src/motion/`: registro GSAP, refresh e reduced motion.
- `public/media/method-wick/`: masters, posters e futuros assets reais.
- `artifacts/qa/`: capturas locais de homologação; não são usadas pela página.

## Mídia e Hero

Consulte `public/media/method-wick/README.md`. Para substituir o Hero, adicione os arquivos finais e altere somente `HERO_FINAL_SRC`, `HERO_FINAL_MOBILE_SRC` e `HERO_FINAL_POSTER` em `src/config/media.ts`. Enquanto estiverem vazios, `consulting-01.mp4` continua como fallback.

## Comércio

Preencha em `src/config/commerce.ts`:

- `PRODUCT_PRICE`
- `PRODUCT_INSTALLMENTS`
- `CHECKOUT_URL`
- `GUARANTEE_DAYS`
- `commerceConfig.benefits`, apenas com benefícios confirmados

Sem `CHECKOUT_URL`, CTAs finais permanecem semanticamente desabilitados. Sem preço, parcelamento ou garantia, esses blocos não são renderizados.

## Métricas e links legais

- Métricas confirmadas: `src/config/metrics.ts`.
- Instagram, privacidade, termos e contato: `siteConfig.footer` em `src/config/site.ts`.
- Links vazios não aparecem no Footer.

## SEO

Title, description e metadados sociais textuais ficam em `index.html`; conteúdo compartilhado do site fica em `src/config/site.ts`. Antes da publicação:

1. defina `CANONICAL_URL` e `OG_IMAGE` em `src/config/site.ts`;
2. adicione a canonical e `og:image`/`twitter:image` correspondentes em `index.html`;
3. publique `public/media/method-wick/og-image.jpg` em 1200×630;
4. não adicione schema Product/Offer até os dados comerciais estarem confirmados.

## QA

Validar 375, 390, 430, 768, 1024, 1366×768, 1440 e 1920 px, com `prefers-reduced-motion` ligado e desligado. Percorrer Hero → Footer, testar teclado, FAQ, CTAs, resize, reload, retorno ao topo, console, source lazy dos vídeos e ausência de overflow/CLS.

Quando o sistema operacional estiver configurado com reduced motion, use `http://localhost:5173/?motion=full` para visualizar localmente a experiÃªncia GSAP completa. Esse override existe somente em `import.meta.env.DEV`; builds de produÃ§Ã£o continuam respeitando integralmente `prefers-reduced-motion`.

Use `PRODUCTION_CHECKLIST.md` antes de qualquer deploy.
