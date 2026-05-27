# RDC Viagens - Código Fonte Extraído
# Deploy
Para realizar um deploy siga os passos abaixo.</br>
* 1 - Crie sua feature com base na branch master
* 2 - Desenvolva e envie para o Git Remoto sua feature

### Ambiente Develop
* 3 - Abra um PR da feature para a branch **master** (sem aprovador) com a label **deploy no ambiente develop**

### Ambiente Homolog
* 3 - Abra um PR da feature para a branch **master** com a label **deploy no ambiente homolog**

### Ambiente Produção
* 3 - Abra um PR da feature gerada pela esteira (concatenada com `_release`) para a branch **master** com aprovador
* 4 - Aguarde a geração do card de Publicação em https://rdcviagens.atlassian.net/jira/software/c/projects/PUB/boards/17, complete fazendo o link de sua atividade
* 5 - Solicite ao DevOps a subida do pacote
* 6 - Dúvidas? Procure o DevOps

## Descrição
Este repositório contém o código fonte extraído e depurado do site RDC Viagens (https://rdcviagens-kxhhapxw.manus.space/).

## Estrutura do Projeto

```
rdcviagens/
├── index.html                          # HTML original formatado (com código inline)
├── index-clean.html                    # HTML limpo (sem código inline)
├── README.md                           # Este arquivo
├── assets/
│   ├── index-BF_oKsoR.css             # Estilos CSS formatados
│   ├── index-DYcfi-rl.js              # JavaScript original (minificado)
│   └── index-DYcfi-rl-formatted.js    # JavaScript formatado/depurado
└── images/
    ├── logo-rdc.png                    # Logo da RDC Viagens
    ├── hero-resort-pool.jpg            # Imagem hero - piscina do resort
    ├── hero-praia-nordeste.jpg         # Imagem hero - praia do nordeste
    ├── hero-serra-gaucha.jpg           # Imagem hero - serra gaúcha
    ├── destino-chapada.jpg             # Destino - Chapada Diamantina
    └── destino-pantanal.jpg            # Destino - Pantanal
```

## Tecnologias Utilizadas

- **Framework**: React (via Vite)
- **Estilização**: TailwindCSS
- **Fonte**: Poppins (Google Fonts)
- **Build Tool**: Vite

## Arquivos

### HTML
- `index.html`: Arquivo HTML original com todo o código React embutido inline
- `index-clean.html`: Versão limpa do HTML com referências externas aos arquivos CSS e JS

### CSS
- `assets/index-BF_oKsoR.css`: Arquivo CSS formatado contendo todos os estilos TailwindCSS compilados

### JavaScript
- `assets/index-DYcfi-rl.js`: Arquivo JavaScript original (minificado)
- `assets/index-DYcfi-rl-formatted.js`: Arquivo JavaScript formatado para melhor legibilidade

### Imagens
Todas as imagens do site foram baixadas em alta resolução (2752x1536 pixels):
- Logo em PNG com transparência
- Imagens de destinos em formato JPG/PNG

## Observações

1. O site é uma Single Page Application (SPA) construída com React
2. O código JavaScript contém toda a lógica do aplicativo React compilada
3. Os estilos utilizam TailwindCSS com classes utilitárias
4. As imagens são de alta qualidade para uso em banners e seções hero

## Data de Extração
14 de Janeiro de 2026
