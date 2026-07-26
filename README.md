# 🍝 Sabor & Arte — Cantina Italiana

Site institucional completo e funcional de um restaurante italiano fictício, a **Sabor & Arte**. Feito 100% em **HTML, CSS e JavaScript puro (vanilla)** — sem frameworks, sem build, sem dependências externas. Basta abrir o `index.html` no navegador.

---

## ✨ O que é

Uma vitrine digital de restaurante com cardápio interativo, carrinho de pedido, reserva de mesa e galeria — tudo com persistência local e design responsivo com tema claro/escuro. Pensado para funcionar tanto abrindo o arquivo direto (`file://`) quanto hospedado no **GitHub Pages**.

## 🚀 Recursos

- **Landing page** com hero de impacto, chamada e botões "Ver cardápio" e "Reservar mesa".
- **Seção Sobre**, horário de funcionamento e **mapa de localização simulado em SVG/CSS** (sem API externa).
- **Cardápio interativo** com 21 itens reais divididos em 5 categorias (Entradas, Massas, Pizzas, Sobremesas, Bebidas) e **filtro por categoria**.
- **Carrinho de pedido**: adiciona itens, ajusta quantidade, calcula subtotal, taxa de serviço e total — tudo **persistido em `localStorage`**.
- **Finalizar pedido**: abre um **modal com o resumo** do pedido (demonstração, sem pagamento real).
- **Formulário de reserva** de mesa com **validação** (nome, data, horário, nº de pessoas), gravação em `localStorage`, confirmação na tela e possibilidade de cancelar reservas salvas.
- **Galeria de pratos** feita com **arte SVG/CSS** e efeito _hover_.
- **Depoimentos** de clientes e **rodapé** com contato e redes sociais.
- **Tema claro/escuro** com respeito a `prefers-color-scheme` e alternância manual (também persistida).
- **Responsivo** (mobile + desktop) e com **acessibilidade básica** (labels, `aria`, foco visível, contraste).

## 🖥️ Como rodar

Não há instalação nem build. Escolha uma das opções:

1. **Abrir direto:** dê um duplo clique em `index.html` (ou arraste para o navegador).
2. **Servidor local (opcional):** dentro da pasta do projeto, rode um servidor estático qualquer, por exemplo:
   ```bash
   python -m http.server 8000
   ```
   e acesse `http://localhost:8000`.
3. **GitHub Pages:** suba os arquivos em um repositório e ative o Pages apontando para a branch principal / raiz.

> Os dados do carrinho, das reservas e do tema ficam salvos no `localStorage` do próprio navegador — sobrevivem ao recarregar a página.

## 🗂️ Estrutura

```
sabor-arte-restaurante/
├── index.html          # Estrutura e conteúdo da página
├── css/
│   └── style.css       # Estilos, temas claro/escuro e responsividade
├── js/
│   ├── data.js         # Dados do cardápio, galeria e depoimentos
│   └── app.js          # Lógica: filtro, carrinho, reservas, tema, modal
└── README.md
```

## 🛠️ Tecnologias

- **HTML5** semântico
- **CSS3** — variáveis (custom properties), Grid, Flexbox, `color-mix`, `clamp`, animações e _media queries_
- **JavaScript (ES5/ES6 vanilla)** — sem módulos ES, para funcionar em `file://`
- **Web Storage API** (`localStorage`) para persistência
- **SVG inline** para ilustrações, ícones e mapa (sem imagens externas)
- **System font stack** (sem fontes de CDN)

## 📐 Decisões de projeto

- **Zero dependências externas**: nada de CDN de JS/CSS, nenhuma imagem remota. Toda a arte é SVG/gradiente, garantindo que o site nunca "quebre" por link ausente.
- **`<script>` clássicos** (não módulos ES) para que o site funcione ao abrir o arquivo localmente.
- **Progressive enhancement**: se o `localStorage` estiver indisponível, o site continua utilizável (falhas são tratadas silenciosamente).

---

## 👨‍🍳 Feito por Joiciano Gomes

Projeto desenvolvido por **Joiciano Gomes** como demonstração de um site de restaurante moderno, funcional e totalmente estático.
