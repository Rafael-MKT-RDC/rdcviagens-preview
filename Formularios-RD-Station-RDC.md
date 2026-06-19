# Formulários do Site RDC (RD Station) — Como funciona e como editar

**Para:** Marketing + time de desenvolvimento
**Resumo:** todos os formulários do site enviam os leads direto para o **RD Station**.
Cada formulário é **embutido a partir do RD** e identificado por um **ID**, que fica
**editável no CMS**. A mensagem de agradecimento aparece **no próprio box** (sem sair da
página).

---

## 1. Como funciona (arquitetura)

- O site tem um componente `RDStationForm` (`client/src/components/RDStationForm.tsx`) que
  carrega o formulário do RD Station dentro de um `<div id="ID_DO_FORM">`.
- O **ID do formulário** não fica fixo no código: vem do **CMS**. Assim você troca o
  formulário sem mexer no site.
- Enquanto o ID não está preenchido no CMS, aparece um formulário padrão (fallback) — nada
  quebra.
- O token usado é o público da conta: `UA-7667371-1`.

```
Visitante  ──>  Formulário do RD (embutido no site)  ──>  Lead cai direto no RD Station
```

**Importante:** a mensagem de agradecimento e o destino do lead são configurados **dentro
do RD Station** (não no site). Por isso, para mudar o texto de agradecimento ou os campos
de um formulário, a edição é no RD.

---

## 2. Mapa dos formulários (qual ID vai em qual campo do CMS)

| Formulário no site | Onde editar o ID no CMS | Campo |
|---|---|---|
| **Newsletter** (modal do topo) | Configurações Globais | ID do formulário RD Station — Newsletter |
| **Quero Assinar** (modal da pág. Assinaturas) | Página Assinaturas | ID do formulário RD Station (modal Quero Assinar) |
| **Agência** | Página Agência | ID do formulário RD Station |
| **Programa de Indicação** | Página Indicação | ID do formulário RD Station |
| **Travel Cloud** | Página Travel Cloud | ID do formulário RD Station |
| **Premiação** | Página Premiação | ID do formulário RD Station |
| **Gestão** | Página Gestão | ID do formulário RD Station |
| **Parcerias** | Página Parcerias | ID do formulário RD Station |
| **Seja Parceiro** | Página Seja Parceiro | ID do formulário RD Station |
| **Viaje Tranquilo** | Página Viaje Tranquilo | ID do formulário RD Station |

> Regra adotada: **um formulário do RD por contexto**. Assim, um ajuste pontual em um
> formulário não afeta os outros.

> Observação: a página **Contato** não tem formulário (só canais: chat, WhatsApp e
> telefone 0800).

---

## 3. Tutorial — criar um formulário no RD Station

Caminho: **app.rdstation.com.br › Converter › Formulários › Criar Formulário**.

1. **Modelo:** escolha **Clássico** › **Selecionar**.
2. **Nome do formulário:** dê um nome claro (ex.: `Newsletter Site RDC`, `Agencia Site
   RDC`). Esse nome também vira o identificador da conversão no RD.
3. **Editor › campos:** clique no bloco de campos › **Editar campos** e deixe só os campos
   que quer. Para a Newsletter: **Nome** e **E-mail**. Para formulários de lead: **Nome,
   E-mail, Telefone** (e **Empresa** nos corporativos). Remova o resto pelo ícone de
   lixeira. Clique em **Salvar**.
4. **Salvar e avançar** › **Configurações**:
   - **Ação de formulário:** escolha **Nenhuma Ação** › Salvar. (Assim o lead **continua no
     formulário** após enviar, sem redirecionar para outra página.)
   - **Agradecimento:** deixe **Exibir mensagem de agradecimento** marcado e escreva o
     texto que aparece no box. Ex. Newsletter: *"Inscrição confirmada. Você passará a
     receber nossas novidades e ofertas exclusivas em primeira mão."* Ex. lead: *"Recebemos
     seus dados. Em breve um de nossos consultores entrará em contato."* › Salvar.
5. **Salvar e avançar › Código:** o RD mostra o código de incorporação. Você só precisa do
   **ID** que aparece no `id="..."`. Exemplo:
   ```
   new RDStationForms('newsletter-site-rdc-8b2f22601555715b4030', 'UA-7667371-1')
   ```
   → o ID é **`newsletter-site-rdc-8b2f22601555715b4030`**.

---

## 4. Conectar ao site (colar o ID no CMS)

1. Abra o CMS (Sanity Studio) e vá no documento correspondente (ver tabela da seção 2).
2. Cole **só o ID** (ex.: `newsletter-site-rdc-8b2f22601555715b4030`) no campo indicado.
3. **Publique** no CMS.
4. Pronto: o site passa a exibir aquele formulário do RD naquele lugar, com a mensagem de
   agradecimento no box.

---

## 5. Ajustes individuais (depois)

Como cada contexto tem o seu formulário:

- **Mudar campos ou a mensagem de agradecimento de UM formulário:** edite **só aquele
  formulário no RD Station** (Converter › Formulários › abre o form › edita › salva). Não
  precisa mexer no site nem nos outros formulários.
- **Trocar por um formulário diferente:** crie/edite no RD, pegue o novo **ID** e troque
  **só o ID daquele campo** no CMS.
- **Não precisa de deploy do site** para esses ajustes — o ID é conteúdo (CMS) e a
  configuração do form é no RD.

---

## 6. Exemplo já pronto (Newsletter)

- Formulário no RD: **Newsletter Site RDC** (campos Nome + E-mail; Ação: Nenhuma; mensagem
  no box).
- ID: `newsletter-site-rdc-8b2f22601555715b4030`
- CMS: Configurações Globais › "ID do formulário RD Station — Newsletter".
