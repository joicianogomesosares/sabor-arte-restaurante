/* ============================================================
   data.js — Dados do cardápio, galeria e depoimentos
   Sem dependências. Exposto no escopo global para o app.js.
   ============================================================ */

/* Categorias do cardápio (a ordem define os filtros) */
const CATEGORIAS = ['Entradas', 'Massas', 'Pizzas', 'Sobremesas', 'Bebidas'];

/* Cada item pode ter:
   - foto:    caminho relativo a assets/img/ (fotografia real do prato)
   - fotoAlt: texto alternativo que descreve o que aparece NA FOTO
   - tom:     usado só quando não há foto adequada; pinta um bloco de cor
              sólida elegante com o nome do item (ver .menu-card-cor no CSS).
   O campo "tema" é mantido apenas como rótulo semântico da categoria. */
const CARDAPIO = [
  // ---------- ENTRADAS ----------
  {
    id: 'ent-bruschetta',
    nome: 'Bruschetta al Pomodoro',
    categoria: 'Entradas',
    preco: 28.0,
    tema: 'entrada',
    foto: 'pratos/bruschetta.jpg',
    fotoAlt: 'Fatias de pão italiano tostado cobertas com tomate picado, manjericão fresco e azeitonas pretas sobre tábua de madeira',
    desc: 'Pão italiano tostado no forno a lenha, tomate fresco, alho, manjericão e azeite extravirgem.'
  },
  {
    id: 'ent-carpaccio',
    nome: 'Carpaccio di Manzo',
    categoria: 'Entradas',
    preco: 42.0,
    tema: 'entrada',
    foto: 'pratos/carpaccio.jpg',
    fotoAlt: 'Finas fatias de carne curada com folhas verdes e tomate servidas sobre torradas crocantes em prato branco',
    desc: 'Finas fatias de filé mignon, rúcula, lascas de parmesão, alcaparras e molho de mostarda.'
  },
  {
    id: 'ent-antipasto',
    nome: 'Antipasto Misto',
    categoria: 'Entradas',
    preco: 55.0,
    tema: 'entrada',
    foto: 'pratos/antipasto.jpg',
    fotoAlt: 'Tábua de madeira com torradas cobertas de tomate, ervas e queijo ralado, servida ao lado de uma taça de vinho',
    desc: 'Tábua de frios italianos, queijos, azeitonas, tomate seco e berinjela marinada.'
  },
  {
    id: 'ent-arancini',
    nome: 'Arancini Siciliani',
    categoria: 'Entradas',
    preco: 34.0,
    tema: 'entrada',
    /* Sem foto de arancini na pasta: bloco de cor em vez de foto que não combina. */
    foto: null,
    tom: 'dourado',
    desc: 'Bolinhos de risoto empanados e fritos, recheados com muçarela e ragu de carne.'
  },

  // ---------- MASSAS ----------
  {
    id: 'mas-carbonara',
    nome: 'Spaghetti alla Carbonara',
    categoria: 'Massas',
    preco: 58.0,
    tema: 'massa',
    foto: 'pratos/massa.jpg',
    fotoAlt: 'Espaguete ao molho cremoso com cubos de guanciale, cogumelos e folhas verdes servido em prato fundo',
    desc: 'Espaguete artesanal, guanciale, gema caipira, pecorino romano e pimenta-do-reino.'
  },
  {
    id: 'mas-lasanha',
    nome: 'Lasagna alla Bolognese',
    categoria: 'Massas',
    preco: 62.0,
    tema: 'massa',
    /* Nenhuma foto da pasta mostra massa em camadas. */
    foto: null,
    tom: 'mocha',
    desc: 'Camadas de massa fresca, ragu bolonhesa de cozimento lento, molho bechamel e parmesão.'
  },
  {
    id: 'mas-alfredo',
    nome: 'Fettuccine Alfredo',
    categoria: 'Massas',
    preco: 54.0,
    tema: 'massa',
    foto: 'pasta.jpg',
    fotoAlt: 'Massa longa italiana ao molho cremoso servida em prato fundo branco na mesa do restaurante',
    desc: 'Fettuccine ao molho cremoso de manteiga e parmesão, finalizado com noz-moscada.'
  },
  {
    id: 'mas-ravioli',
    nome: 'Ravioli di Ricotta e Spinaci',
    categoria: 'Massas',
    preco: 59.0,
    tema: 'massa',
    /* Nenhuma foto da pasta mostra massa recheada. */
    foto: null,
    tom: 'oliva',
    desc: 'Ravióli recheado de ricota e espinafre ao molho de manteiga e sálvia.'
  },
  {
    id: 'mas-gnocchi',
    nome: 'Gnocchi al Pomodoro',
    categoria: 'Massas',
    preco: 52.0,
    tema: 'massa',
    /* Nenhuma foto da pasta mostra nhoque. */
    foto: null,
    tom: 'terracota',
    desc: 'Nhoque de batata feito à mão ao molho de tomate San Marzano e manjericão fresco.'
  },

  // ---------- PIZZAS ----------
  {
    id: 'piz-margherita',
    nome: 'Pizza Margherita',
    categoria: 'Pizzas',
    preco: 49.0,
    tema: 'pizza',
    foto: 'dish2.jpg',
    fotoAlt: 'Pizzas napolitanas recém-assadas no balcão da pizzaria, com destaque para a de queijo e molho de tomate',
    desc: 'Molho de tomate, muçarela de búfala, manjericão e azeite — a clássica de Nápoles.'
  },
  {
    id: 'piz-quattro',
    nome: 'Pizza Quattro Formaggi',
    categoria: 'Pizzas',
    preco: 58.0,
    tema: 'pizza',
    foto: 'dish3.jpg',
    fotoAlt: 'Pizza artesanal coberta de queijos derretidos, cogumelos e pesto, servida em tábua de madeira',
    desc: 'Muçarela, gorgonzola, provolone e parmesão sobre massa de fermentação natural.'
  },
  {
    id: 'piz-prosciutto',
    nome: 'Pizza Prosciutto e Funghi',
    categoria: 'Pizzas',
    preco: 62.0,
    tema: 'pizza',
    foto: 'dish1.jpg',
    fotoAlt: 'Duas pizzas com cogumelos, fatias de embutido e azeitonas pretas sobre mesa de madeira',
    desc: 'Presunto de Parma, cogumelos frescos, muçarela e um toque de orégano.'
  },
  {
    id: 'piz-diavola',
    nome: 'Pizza Diavola',
    categoria: 'Pizzas',
    preco: 60.0,
    tema: 'pizza',
    foto: 'pizza.jpg',
    fotoAlt: 'Pizza coberta com fatias de salame apimentado, azeitonas pretas e manjericão fresco',
    desc: 'Salame picante calabrês, muçarela, molho de tomate e pimenta — para os corajosos.'
  },

  // ---------- SOBREMESAS ----------
  {
    id: 'sob-tiramisu',
    nome: 'Tiramisù',
    categoria: 'Sobremesas',
    preco: 32.0,
    tema: 'sobremesa',
    foto: 'pratos/tiramisu.jpg',
    fotoAlt: 'Fatia de tiramisù em camadas de creme de mascarpone e biscoito, polvilhada com cacau em prato de porcelana',
    desc: 'Biscoito champagne embebido em café, creme de mascarpone e cacau — receita da nonna.'
  },
  {
    id: 'sob-pannacotta',
    nome: 'Panna Cotta ai Frutti',
    categoria: 'Sobremesas',
    preco: 28.0,
    tema: 'sobremesa',
    /* Nenhuma foto da pasta mostra calda de frutas vermelhas. */
    foto: null,
    tom: 'framboesa',
    desc: 'Creme de baunilha aveludado com calda de frutas vermelhas.'
  },
  {
    id: 'sob-cannoli',
    nome: 'Cannoli Siciliani',
    categoria: 'Sobremesas',
    preco: 30.0,
    tema: 'sobremesa',
    foto: 'pratos/sobremesa.jpg',
    fotoAlt: 'Sobremesa italiana cremosa polvilhada com cacau, servida em prato branco com colher ao lado',
    desc: 'Massa crocante recheada com creme de ricota doce e gotas de chocolate.'
  },
  {
    id: 'sob-gelato',
    nome: 'Gelato Artesanal',
    categoria: 'Sobremesas',
    preco: 24.0,
    tema: 'sobremesa',
    /* Nenhuma foto de sorvete na pasta. */
    foto: null,
    tom: 'pistache',
    desc: 'Duas bolas de sorvete artesanal do dia — pergunte os sabores ao garçom.'
  },

  // ---------- BEBIDAS ----------
  /* Não há fotografia de bebida na pasta: cada item recebe um bloco de cor
     sólida elegante com o nome, em vez de uma foto que não combina. */
  {
    id: 'beb-chianti',
    nome: 'Vinho Chianti (taça)',
    categoria: 'Bebidas',
    preco: 35.0,
    tema: 'bebida',
    foto: null,
    tom: 'vinho',
    desc: 'Tinto seco toscano, encorpado e frutado. Harmoniza com massas e carnes.'
  },
  {
    id: 'beb-limonata',
    nome: 'Limonata Italiana',
    categoria: 'Bebidas',
    preco: 14.0,
    tema: 'bebida',
    foto: null,
    tom: 'citrico',
    desc: 'Limão-siciliano espremido na hora com água com gás e hortelã.'
  },
  {
    id: 'beb-espresso',
    nome: 'Espresso',
    categoria: 'Bebidas',
    preco: 9.0,
    tema: 'bebida',
    foto: null,
    tom: 'cafe',
    desc: 'Café espresso italiano, encorpado e aromático, servido curto.'
  },
  {
    id: 'beb-agua',
    nome: 'Água com Gás',
    categoria: 'Bebidas',
    preco: 8.0,
    tema: 'bebida',
    foto: null,
    tom: 'agua',
    desc: 'Água mineral gaseificada 500ml, servida gelada com limão.'
  }
];

/* Depoimentos de clientes (retratos reais em assets/img/pessoas/) */
const DEPOIMENTOS = [
  {
    nome: 'Camila Ferreira',
    local: 'São Paulo, SP',
    nota: 5,
    foto: 'p2.jpg',
    fotoAlt: 'Retrato de Camila Ferreira, mulher de cabelo curto castanho, sorrindo',
    texto: 'A carbonara é simplesmente perfeita. Ambiente acolhedor e atendimento impecável. Virou nosso restaurante oficial de aniversários!'
  },
  {
    nome: 'Ricardo Almeida',
    local: 'Campinas, SP',
    nota: 5,
    foto: 'p1.jpg',
    fotoAlt: 'Retrato de Ricardo Almeida, homem de barba e blazer escuro, sorrindo',
    texto: 'Massa fresca de verdade, dá pra sentir a diferença. A pizza na lenha estava com a borda no ponto exato. Voltarei com certeza.'
  },
  {
    nome: 'Juliana Prado',
    local: 'São Paulo, SP',
    nota: 5,
    foto: 'p3.jpg',
    fotoAlt: 'Retrato de Juliana Prado, mulher de cabelo cacheado preso e camisa branca, sorrindo',
    texto: 'O tiramisù é o melhor que já comi fora da Itália. A reserva pelo site foi super prática e a mesa estava pronta na hora.'
  },
  {
    nome: 'Thiago Nunes',
    local: 'Santo André, SP',
    nota: 4,
    foto: 'p5.jpg',
    fotoAlt: 'Retrato de Thiago Nunes, homem jovem de óculos e cachecol cinza, sorrindo',
    texto: 'Excelente custo-benefício. Porções generosas e vinhos muito bem selecionados. Só faltou espaço no estômago para a sobremesa.'
  }
];

/* Galeria com fotos reais (arquivos locais em assets/img/).
   Cada item define a imagem, a legenda exibida no hover e o texto alternativo. */
const GALERIA = [
  { img: 'pizza.jpg',    legenda: 'Pizza na lenha',        alt: 'Pizza de calabresa com azeitonas e manjericão fresco, ao lado de uma taça de vinho' },
  { img: 'pasta.jpg',    legenda: 'Massa fresca do dia',   alt: 'Prato de massa fresca italiana servido à mesa' },
  { img: 'dish3.jpg',    legenda: 'Jantar à italiana',     alt: 'Duas pizzas na tábua acompanhadas de uma taça de vinho' },
  { img: 'dish2.jpg',    legenda: 'Variedade de sabores',  alt: 'Diversas pizzas expostas no balcão com ingredientes frescos' },
  { img: 'dish1.jpg',    legenda: 'Mesa da cantina',       alt: 'Pizzas servidas em mesa de madeira com bule de cobre' },
  { img: 'interior.jpg', legenda: 'Nosso ambiente',        alt: 'Cliente saboreando um espaguete com taça de vinho no salão' }
];
