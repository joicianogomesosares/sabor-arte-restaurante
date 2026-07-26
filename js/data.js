/* ============================================================
   data.js — Dados do cardápio, galeria e depoimentos
   Sem dependências. Exposto no escopo global para o app.js.
   ============================================================ */

/* Categorias do cardápio (a ordem define os filtros) */
const CATEGORIAS = ['Entradas', 'Massas', 'Pizzas', 'Sobremesas', 'Bebidas'];

/* Cada item usa um "tema" que gera a arte SVG/gradiente correspondente.
   Temas disponíveis: massa, pizza, sobremesa, bebida, entrada. */
const CARDAPIO = [
  // ---------- ENTRADAS ----------
  {
    id: 'ent-bruschetta',
    nome: 'Bruschetta al Pomodoro',
    categoria: 'Entradas',
    preco: 28.0,
    tema: 'entrada',
    desc: 'Pão italiano tostado no forno a lenha, tomate fresco, alho, manjericão e azeite extravirgem.'
  },
  {
    id: 'ent-carpaccio',
    nome: 'Carpaccio di Manzo',
    categoria: 'Entradas',
    preco: 42.0,
    tema: 'entrada',
    desc: 'Finas fatias de filé mignon, rúcula, lascas de parmesão, alcaparras e molho de mostarda.'
  },
  {
    id: 'ent-antipasto',
    nome: 'Antipasto Misto',
    categoria: 'Entradas',
    preco: 55.0,
    tema: 'entrada',
    desc: 'Tábua de frios italianos, queijos, azeitonas, tomate seco e berinjela marinada.'
  },
  {
    id: 'ent-arancini',
    nome: 'Arancini Siciliani',
    categoria: 'Entradas',
    preco: 34.0,
    tema: 'entrada',
    desc: 'Bolinhos de risoto empanados e fritos, recheados com muçarela e ragu de carne.'
  },

  // ---------- MASSAS ----------
  {
    id: 'mas-carbonara',
    nome: 'Spaghetti alla Carbonara',
    categoria: 'Massas',
    preco: 58.0,
    tema: 'massa',
    desc: 'Espaguete artesanal, guanciale, gema caipira, pecorino romano e pimenta-do-reino.'
  },
  {
    id: 'mas-lasanha',
    nome: 'Lasagna alla Bolognese',
    categoria: 'Massas',
    preco: 62.0,
    tema: 'massa',
    desc: 'Camadas de massa fresca, ragu bolonhesa de cozimento lento, molho bechamel e parmesão.'
  },
  {
    id: 'mas-alfredo',
    nome: 'Fettuccine Alfredo',
    categoria: 'Massas',
    preco: 54.0,
    tema: 'massa',
    desc: 'Fettuccine ao molho cremoso de manteiga e parmesão, finalizado com noz-moscada.'
  },
  {
    id: 'mas-ravioli',
    nome: 'Ravioli di Ricotta e Spinaci',
    categoria: 'Massas',
    preco: 59.0,
    tema: 'massa',
    desc: 'Ravióli recheado de ricota e espinafre ao molho de manteiga e sálvia.'
  },
  {
    id: 'mas-gnocchi',
    nome: 'Gnocchi al Pomodoro',
    categoria: 'Massas',
    preco: 52.0,
    tema: 'massa',
    desc: 'Nhoque de batata feito à mão ao molho de tomate San Marzano e manjericão fresco.'
  },

  // ---------- PIZZAS ----------
  {
    id: 'piz-margherita',
    nome: 'Pizza Margherita',
    categoria: 'Pizzas',
    preco: 49.0,
    tema: 'pizza',
    desc: 'Molho de tomate, muçarela de búfala, manjericão e azeite — a clássica de Nápoles.'
  },
  {
    id: 'piz-quattro',
    nome: 'Pizza Quattro Formaggi',
    categoria: 'Pizzas',
    preco: 58.0,
    tema: 'pizza',
    desc: 'Muçarela, gorgonzola, provolone e parmesão sobre massa de fermentação natural.'
  },
  {
    id: 'piz-prosciutto',
    nome: 'Pizza Prosciutto e Funghi',
    categoria: 'Pizzas',
    preco: 62.0,
    tema: 'pizza',
    desc: 'Presunto de Parma, cogumelos frescos, muçarela e um toque de orégano.'
  },
  {
    id: 'piz-diavola',
    nome: 'Pizza Diavola',
    categoria: 'Pizzas',
    preco: 60.0,
    tema: 'pizza',
    desc: 'Salame picante calabrês, muçarela, molho de tomate e pimenta — para os corajosos.'
  },

  // ---------- SOBREMESAS ----------
  {
    id: 'sob-tiramisu',
    nome: 'Tiramisù',
    categoria: 'Sobremesas',
    preco: 32.0,
    tema: 'sobremesa',
    desc: 'Biscoito champagne embebido em café, creme de mascarpone e cacau — receita da nonna.'
  },
  {
    id: 'sob-pannacotta',
    nome: 'Panna Cotta ai Frutti',
    categoria: 'Sobremesas',
    preco: 28.0,
    tema: 'sobremesa',
    desc: 'Creme de baunilha aveludado com calda de frutas vermelhas.'
  },
  {
    id: 'sob-cannoli',
    nome: 'Cannoli Siciliani',
    categoria: 'Sobremesas',
    preco: 30.0,
    tema: 'sobremesa',
    desc: 'Massa crocante recheada com creme de ricota doce e gotas de chocolate.'
  },
  {
    id: 'sob-gelato',
    nome: 'Gelato Artesanal',
    categoria: 'Sobremesas',
    preco: 24.0,
    tema: 'sobremesa',
    desc: 'Duas bolas de sorvete artesanal do dia — pergunte os sabores ao garçom.'
  },

  // ---------- BEBIDAS ----------
  {
    id: 'beb-chianti',
    nome: 'Vinho Chianti (taça)',
    categoria: 'Bebidas',
    preco: 35.0,
    tema: 'bebida',
    desc: 'Tinto seco toscano, encorpado e frutado. Harmoniza com massas e carnes.'
  },
  {
    id: 'beb-limonata',
    nome: 'Limonata Italiana',
    categoria: 'Bebidas',
    preco: 14.0,
    tema: 'bebida',
    desc: 'Limão-siciliano espremido na hora com água com gás e hortelã.'
  },
  {
    id: 'beb-espresso',
    nome: 'Espresso',
    categoria: 'Bebidas',
    preco: 9.0,
    tema: 'bebida',
    desc: 'Café espresso italiano, encorpado e aromático, servido curto.'
  },
  {
    id: 'beb-agua',
    nome: 'Água com Gás',
    categoria: 'Bebidas',
    preco: 8.0,
    tema: 'bebida',
    desc: 'Água mineral gaseificada 500ml, servida gelada com limão.'
  }
];

/* Depoimentos de clientes */
const DEPOIMENTOS = [
  {
    nome: 'Camila Ferreira',
    local: 'São Paulo, SP',
    nota: 5,
    texto: 'A carbonara é simplesmente perfeita. Ambiente acolhedor e atendimento impecável. Virou nosso restaurante oficial de aniversários!'
  },
  {
    nome: 'Ricardo Almeida',
    local: 'Campinas, SP',
    nota: 5,
    texto: 'Massa fresca de verdade, dá pra sentir a diferença. A pizza na lenha estava com a borda no ponto exato. Voltarei com certeza.'
  },
  {
    nome: 'Juliana Prado',
    local: 'São Paulo, SP',
    nota: 5,
    texto: 'O tiramisù é o melhor que já comi fora da Itália. A reserva pelo site foi super prática e a mesa estava pronta na hora.'
  },
  {
    nome: 'Thiago Nunes',
    local: 'Santo André, SP',
    nota: 4,
    texto: 'Excelente custo-benefício. Porções generosas e vinhos muito bem selecionados. Só faltou espaço no estômago para a sobremesa.'
  }
];

/* Descrições curtas usadas na galeria (subconjunto do cardápio) */
const GALERIA = [
  { id: 'mas-carbonara', legenda: 'Spaghetti alla Carbonara' },
  { id: 'piz-margherita', legenda: 'Pizza Margherita' },
  { id: 'mas-ravioli', legenda: 'Ravioli di Ricotta' },
  { id: 'sob-tiramisu', legenda: 'Tiramisù da casa' },
  { id: 'piz-diavola', legenda: 'Pizza Diavola' },
  { id: 'ent-antipasto', legenda: 'Antipasto Misto' }
];
