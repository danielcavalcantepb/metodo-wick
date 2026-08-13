# Mídia — Método Wick

Todos os caminhos públicos são definidos em `src/config/media.ts`. Nunca espalhe caminhos pelos componentes.

## Assets publicados

| Arquivo | Uso | Proporção | Observação |
| --- | --- | --- | --- |
| `hero-final.mp4` | Hero desktop | 16:9 | Corte curado de 12 s, sem áudio, H.264, 1276×720. |
| `hero-final-mobile.mp4` | Hero mobile | 4:5 | Corte central dirigido de 12 s, sem áudio, H.264, 720×900. |
| `hero-final-poster.webp` | Poster do Hero desktop | 16:9 | Frame real do corte, 1276×720. |
| `hero-final-mobile-poster.webp` | Poster do Hero mobile | 4:5 | Frame real do corte, 720×900. |
| `authority-studio-01.webp` | Bastidor principal de autoridade | 3:4 | Versão web 1200×1600. |
| `tailoring-navy-portrait.webp` | Retrato editorial secundário | 3:4 | Versão web 720×960. |
| `tailoring-blue-portrait.webp` | Retrato editorial de identidade | 3:4 | Versão web 720×960. |
| `tailoring-navy-detail.webp` | Detalhe de alfaiataria em reserva | 4:5 | Versão web 720×900; não renderizado nesta etapa. |
| `method-consultation-portrait.jpg` | Consultoria de imagem no card do Método Wick | 40:71 | Fotografia real 640×1136. |
| `tailoring-brown-detail.webp` | Detalhe de alfaiataria em reserva | 3:4 | Versão web 720×960; não renderizado nesta etapa. |
| `consulting-01.mp4` | Cena editorial de consultoria | 16:9 | Master H.264, 1276×720, 63,2 s. Preservar. |
| `consulting-01-poster.png` | Poster da consultoria | 16:9 | Frame real, 1276×720. |
| `stage-01.mp4` | Manifesto | 9:16 | Master H.264, 720×1280, 13,8 s. Preservar. |
| `stage-01-poster.png` | Poster do Manifesto | 9:16 | Frame real, 450×800. |

## Curadoria dos arquivos recebidos em `incoming/`

- Vídeo horizontal de 44,25 s: selecionado como master do Hero. O original permanece intacto; os dois cortes publicados têm 12 s e não carregam áudio.
- Dois vídeos verticais de consultoria: catalogados para uso futuro, mas não publicados nesta etapa por exibirem terceiros e/ou legendas incorporadas.
- Vídeo vertical de 360×640: não publicado por baixa resolução e texto incorporado.
- Retratos de estúdio azul-claro, azul-marinho e azul-claro com gravata salmão: selecionados para a cena de autoridade.
- Detalhes de alfaiataria azul e marrom: versões web preservadas como slots de reserva, sem repetição visual na página atual.
- Fotografia com movimento e a frase “Mova-se com elegância.”: não publicada por texto incorporado e incompatibilidade com a narrativa existente.

## Regras de integração

- Todos os caminhos e metadados ficam em `src/config/media.ts`.
- Componentes recebem objetos semânticos e não conhecem nomes físicos de arquivos.
- Masters e itens de `incoming/` não devem ser sobrescritos.
- Fotografias publicadas usam WebP com dimensões declaradas; vídeos não críticos permanecem lazy.
- Não publicar clientes ou terceiros sem confirmação de autorização de uso.
